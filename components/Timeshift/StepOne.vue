<template>

    <div>
        <div class="flex justify-between items-center w-full">
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Select Datasets to Timeshift</h2>
            <div class="py-1 text-sm truncate flex items-center hidden">
                <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mr-2">Beta branch</h2>
                <button @click="changeBranch()" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
                    <span class="sr-only">Use setting</span>
                    <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
                    <span aria-hidden="true" :class="(this.branch==='beta' ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                    <span aria-hidden="true" :class="(this.branch==='beta' ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>
                </button>
            </div>
        </div>
        <ul class="mt-4">
            <li v-for="(v, i) in this.datasetsByFolder" v-bind:key="i" class="rounded-md mb-4 relative">

                <div class="rounded-full bg-blue-500 absolute w-6 h-6 -top-2 -left-2" v-if="i===-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 p-0.5 self-center text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div class="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md truncate py-1.5">
                    <div class="flex-1 px-4 py-2 text-sm truncate flex items-center">
                        <span @click="setAccordion(v[0].FolderId)" class="cursor-pointer text-gray-900 font-medium hover:text-gray-600">{{ i }}</span>
                    </div>
                    <div class="flex-shrink-0 pr-2">
                        <button @click="setAccordion(v[0].FolderId)" class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Open options</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path class="transition-all" v-show="accordion[v[0].FolderId] === false" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                <path class="transition-all" v-show="accordion[v[0].FolderId] === true" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div :class="(accordion[v[0].FolderId] === true ? 'accordion-body-open ' : 'accordion-body-close ') + 'accordion border-gray-200 p-4 border rounded-md mt-1 space-y-4'">
                    <h2 class="text-sm font-medium text-gray-500">Datasets</h2>
                    <div class="px-4 pt-2">
                      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Select
                        <span class="text-blue-600 font-bold cursor-pointer hover:text-blue-400" @click="setSelectAll(v[0].FolderId)" >All</span> |
                        <span class="text-blue-600 font-bold cursor-pointer hover:text-blue-400" @click="setSelectNone(v[0].FolderId)" >None</span>
                      </h2>
                    </div>
                    <div v-for="(d) in v" v-bind:key="d.Id">
                        <div class="flex-1 flex items-center justify-between bg-white rounded-md truncate">
                            <div class="flex-1 px-4 py-1.5 text-sm truncate flex items-center">
                                <button @click="setSelected(d)" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
                                    <span class="sr-only">Use setting</span>
                                    <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
                                    <span aria-hidden="true" :class="(selectedTimeshift[d.Id] ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                                    <span aria-hidden="true" :class="(selectedTimeshift[d.Id] ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>
                                </button>
                                <a href="#" @click="setSelected(d)" class="text-gray-900 font-medium hover:text-gray-600">{{d.DeveloperName}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!-- Loading cards -->
            <LoadingCards v-show="this.isLoading" v-bind:cards="10" />
        </ul>
    </div>

</template>

<script>

export default {

    data() {
      return {
        datasetsByFolder: {},
        accordion: {},
        timeshiftDatasets: [],
        branch: 'master',
        isLoading: true,
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

        /* Replace key of "Id" with folder "Name" */
        for (const k of Object.keys(datasetsGroupedByFolderId)) {
          const fName = foldersGroupedById[k][0].Name
          datasetHashByFolder[fName] = datasetsGroupedByFolderId[k]
        }

        Object.entries(datasetHashByFolder).forEach(([k, v]) => {
          accordionByFolderId[v[0].FolderId] = false
        })

        this.datasetsByFolder = datasetHashByFolder
        this.accordion = accordionByFolderId
        this.isLoading = false

      } catch (e) {
        console.error(e.message)
      }

    },

    computed: {
        confirmTimeshiftSelection () {
            return this.$store.state.confirmTimeshiftSelection;
        },
        selectedTimeshift () {
            return this.$store.state.selectedTimeshift;
        }
    },

    methods: {
      setAccordion(id) {
          this.accordion[id] = !this.accordion[id]
      },
      setSelectAll(folderId) {

        let selectedTmp = { ...this.selectedTimeshift }

        Object.entries(this.datasetsByFolder).forEach(([k, v]) => {
          v.forEach(d => {
              const { Id, CurrentId } = d
              if (folderId === d.FolderId)
                selectedTmp[d.Id] = { Id, CurrentId }
          })
        })

        this.$store.commit(`setSelectedTimeshift` , selectedTmp)

      },
      setSelectNone(folderId) {

        let selectedTmp = { ...this.selectedTimeshift }

        Object.entries(this.datasetsByFolder).forEach(([k, v]) => {
          v.forEach(d => {
              const { Id, CurrentId } = d
              if (folderId === d.FolderId)
                delete selectedTmp[d.Id]
          })
        })

        this.$store.commit(`setSelectedTimeshift` , selectedTmp)

      },
      setSelected(dataset) {

        const { Id, CurrentId } = dataset

        let selectedTmp = { ...this.selectedTimeshift }

        if (selectedTmp[dataset.Id])
          delete selectedTmp[dataset.Id]
        else
          selectedTmp[dataset.Id] = { Id, CurrentId }

        this.$store.commit(`setSelectedTimeshift` , selectedTmp)

      }
    }

}
</script>

<style>
    .margin-0{
        margin-top: 0px!important;
    }
</style>
