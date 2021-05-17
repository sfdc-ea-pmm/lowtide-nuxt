<template>

    <div>

        <div class="flex justify-between items-center w-full">
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Select Datasets to Timeshift</h2>
            <div class="py-1 text-sm truncate flex items-center hidden">
                <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mr-2">Beta branch</h2>
                <button @click="changeBranch()" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
                    <span class="sr-only">Use setting</span>
                    <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
                    <span aria-hidden="true" :class="(this.branch === 'beta' ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                    <span aria-hidden="true" :class="(this.branch === 'beta' ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>
                </button>
            </div>
        </div>

        <div v-if="this.loadingError" class="rounded-md bg-yellow-50 p-4 mt-4">
          <ErrorAlert title="Oops!" message="Could not load the requested assets." />
        </div>

        <LoadingCards v-show="this.isLoading" :cards="10" class="pt-4" />

        <ul class="mt-4">

          <li v-for="(c, i) in this.cardList" :key="i" class="rounded-md mb-3 relative">
            <StepOneCard
              v-show="c.showMe"
              :title="c.Name"
              :folderId="c.FolderId"
              :datasets="c.datasets"
              @openedCard="hideOtherCards"
              @closedCard="showOtherCards"
            />
          </li>
        </ul>

    </div>

</template>

<script>

export default {

    data() {
      return {
        cardList: {},
        branch: 'master',
        isLoading: true,
        loadingError: false
      }
    },

    async fetch() {

      let groupBy = (objectArray, property) => {
        return objectArray.reduce((i, obj) => {
          const key = obj[property];
          if (!i[key]) i[key] = [];
          i[key].push(obj)
          return i
         }, {})
       }

      const axiosOptions = { withCredentials: true }
      let datasetHashByFolder = {}, accordionByFolderId = {};

      try {

        /* Gather Folders and Datasets */
        const folderReq = await this.$axios.get(`${process.env.API_URL}/data/folder`, axiosOptions)
        const datasetReq = await this.$axios.get(`${process.env.API_URL}/data/dataset`, axiosOptions)

        /* Group both by shared key */
        const datasetsGroupedByFolderId = groupBy(datasetReq.data.data, 'FolderId')
        const foldersGroupedById = groupBy(folderReq.data.data, 'Id')

        const augmentedHash = {}

        folderReq.data.data.forEach(f => {
          if (datasetsGroupedByFolderId[f.Id])
            augmentedHash[f.Id] = {
              FolderId: f.Id, Name: f.Name, showMe: true,
              datasets: datasetsGroupedByFolderId[f.Id]
            }
        })

        this.cardList = augmentedHash
        this.isLoading = false

      } catch (e) {
        console.error(e.message)
        this.loadingError = true
        this.isLoading = false
      }

    },

    methods: {

      hideOtherCards(id) {
        for (const [k, v] of Object.entries(this.cardList)) {
          if (this.cardList[k].FolderId !== id)
            this.cardList[k].showMe = false
        }
      },

      showOtherCards(id) {
        for(const k of Object.keys(this.cardList)) {
          this.cardList[k].showMe = true
        }
      }

    }

}
</script>

<style>
    .margin-0{
        margin-top: 0px!important;
    }
</style>
