<template>

    <div>
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide py-1">Generate dataflows</h2>
        <div class="my-4">
            <div class="rounded-md bg-blue-50 p-4" v-show="this.selectedTimeshift.length <= 0">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3 flex-1 md:flex md:justify-between">
                        <p class="text-sm text-blue-700">
                            No selected datasets.
                        </p>
                        <p class="mt-3 text-sm md:mt-0 md:ml-6">
                            <a @click.prevent="previousStep()" href="#" class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-500">
                                Previous
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                </svg>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="rounded-md bg-blue-50 p-4 mb-6" v-show="this.confirmTimeshiftSelection.length > 0">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3 flex-1 md:flex md:justify-between">
                        <p class="text-sm text-blue-700">
                            Note: It's recommended to timeshift all date fields within a dataset, but not absolutely required.
                        </p>
                    </div>
                </div>
            </div>

            <span class="p-5" @click="testRunBatchQuery()" >test request</span>

            <LoadingCards v-show="this.isLoading" v-bind:cards="10" />

            <transition-group class="space-y-4" name="deploy-card" tag="ul">
                <li class="bg-white shadow overflow-hidden sm:rounded-md" v-for="(v, i) in fields" v-bind:key="v.id">
                    <div class="block">
                        <div class="px-8 py-6">
                            <div class="flex">
                                <div class="flex-1">
                                    <p class="text-sm text-gray-500">
                                        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
                                          <span v-if="fields.length <= 0">Connector</span>
                                          <span v-else>{{ v.connector }}</span>
                                        </h2>
                                    </p>
                                    <p class="text-lg font-medium text-gray-900">
                                        {{ v.name }}
                                    </p>
                                </div>
                                <div class="flex flex-col justify-center pt-2 pr-2">
                                    <span class="text-lg font-medium text-gray-900 text-center"  v-if="fields.length <=0 ">?</span>
                                    <span class="text-lg font-medium text-gray-900 text-center" v-else>{{ v.rows }}</span>
                                    <p class="text-center text-xs text-gray-500">
                                        rows
                                    </p>
                                </div>
                            </div>

                            <div v-if="v.dates.length">
                              <div class="border-b border-gray-200">
                                  <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide pb-2 pt-4">Date Fields</h2>
                              </div>
                              <div class="mt-4 space-y-4">
                                  <div v-if="fields.length<=0" class="mt-6">
                                      <div class="snippet" data-title=".dot-typing">
                                          <div class="stage">
                                              <div class="dot-typing mx-auto"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="flex w-full items-center" v-for="(f, i) in v.dates" :key="f.id">
                                    <DatasetSelectDate :dataset="v" :dateField="f" :isFetching="true" @toggledSelected="addOrRemove" />
                                  </div>
                              </div>
                            </div>
                            <div v-else>
                              <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">No Date Fields Found</h2>
                            </div>

                        </div>
                    </div>
                </li>
            </transition-group>

        </div>
    </div>

</template>

<script>
export default {

    data() {
        return {
            fields: [],
            isLoading: true
        }
    },

    async fetch() {

      const xmdBody = Object.values(this.selectedTimeshift)

      let datasetXmds;

      this.isLoading = true
      this.fields = []

      if (xmdBody.length) {
        datasetXmds = await this.$axios.post(`/data/dataset/xmd`, xmdBody, { withCredentials: true })
        this.fields = datasetXmds.data.data
      }

      const selectionArray = []

      for (const [k, v] of Object.entries(this.selectedTimeshift)) {

        const augmentedObject = {}
        const relatedFields = this.fields.filter(f => f.id === v.Id).length > 0
          ? this.fields.filter(f => f.id === v.Id).pop()
          : null;

        augmentedObject.id = v.Id
        augmentedObject.versionId = v.CurrentId

        if (relatedFields) {
          augmentedObject.dateFields = []
          relatedFields.dates.forEach(d => {
            augmentedObject.dateFields.push(d.fields.fullField)
          })
          selectionArray.push(augmentedObject)
        }

      }

      this.$store.commit('setConfirmTimeshiftSelection', selectionArray)
      this.isLoading = false

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
        addOrRemove(params){

          // Ugh... Embarrassing.
          let selectCopy = JSON.parse(JSON.stringify(this.confirmTimeshiftSelection))

          selectCopy.forEach((dataset) => {
            if (params.datasetId === dataset.id) {

              if (params.include && !dataset.dateFields.includes(params.apiName)) {
                dataset.dateFields.push(params.apiName)
              }

              if (!params.include && dataset.dateFields.includes(params.apiName)) {
                const i = dataset.dateFields.indexOf(params.apiName)
                if (i > -1) dataset.dateFields.splice(i, 1)
              }

            }

          })

          const shiftArray = selectCopy.filter(d => d.dateFields.length > 0)

          if (shiftArray.length > 0)
            this.$store.commit('setConfirmTimeshiftSelection', shiftArray)
          else
            this.$store.commit('setConfirmTimeshiftSelection', [])

        },

        testRunBatchQuery() {

          const payload = {
            dataflowLabel: "My Test Dataflow",
            datasetArray: this.confirmTimeshiftSelection
          }

          console.log(payload)

        }

    },

    watch: {
      'selectedTimeshift': '$fetch'
    }
}
</script>

<style>
    .deploy-card-enter-active, .deploy-card-leave-active{
        transition: all 0.3s;
    }
    .deploy-card-enter, .deploy-card-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }
</style>
