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
            <!--
            <div v-show="this.fields<=0" class="flex flex-col justify-center items-center xl:h-96">
                <div class="loader xl animate-spin"></div>
                <div class="text-xl text-gray-500 mt-2">Loading</div>
            </div>
            -->
            <LoadingCards v-show="this.fields<=0" v-bind:cards="10" />
            <transition-group class="space-y-4" name="deploy-card" tag="ul">
                <li class="bg-white shadow overflow-hidden sm:rounded-md" v-for="(v, i) in this.fields" v-bind:key="v.id">
                    <a @click.prevent href="#" class="block hover:bg-gray-50">
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
                                <div class="pt-2 pr-2">
                                    <span class="text-lg font-medium text-gray-900"  v-if="fields.length <=0 ">?</span>
                                    <span class="text-lg font-medium text-gray-900" v-else>{{ v.rows }}</span>
                                    <p class="text-center text-xs text-gray-500">
                                        rows
                                    </p>
                                </div>
                            </div>

                            <div v-if="v.dates.length">
                              <div class="border-b border-gray-200">
                                  <h2 class="text-gray-500 text-sm font-medium uppercase tracking-wide pb-2 pt-4">Date fields</h2>
                              </div>
                              <div class="mt-4 space-y-4">
                                  <div v-if="fields.length<=0" class="mt-6">
                                      <div class="snippet" data-title=".dot-typing">
                                          <div class="stage">
                                              <div class="dot-typing mx-auto"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="flex items-center" v-for="(va) in ((fields.length<=0) ? [] : fields[i].dates)" v-bind:key="va.id">
                                      <button @click="setSelected(v.id, va.alias)" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
                                          <span class="sr-only">Use setting</span>
                                          <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>

                                          <span aria-hidden="true" :class="(selectedTimeshiftFields[fields[i].id+'_'+va.alias] ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                                          <span aria-hidden="true" :class="(selectedTimeshiftFields[fields[i].id+'_'+va.alias] ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>

                                      </button>
                                      <div>
                                          <div class="text-sm">{{ va.label }}</div>
                                          <div class="text-xs text-gray-500">API Name: {{ va.fields.fullField }}</div>
                                      </div>
                                  </div>
                              </div>
                            </div>
                            <div v-else>
                              <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">No Date Fields Found</h2>
                            </div>

                        </div>
                    </a>
                </li>
            </transition-group>

        </div>
    </div>

</template>

<script>
export default {
    computed: {
        currentStep () {
            return this.$store.state.currentStep;
        },
        action () {
            return this.$store.state.action;
        },
        confirmTimeshiftSelection () {
            return this.$store.state.confirmTimeshiftSelection;
        },
        selectedTimeshift () {
            return this.$store.state.selectedTimeshift;
        }
    },
    data() {
        return {
            fields: [],
            isLoading: true,
            selectedTimeshiftFields: {}
        }
    },
    watch: {
        confirmTimeshiftSelection: function(){
            this.fields = [];
            this.selectedTimeshiftFields = {};
        },
        currentStep: async function () {
            if(this.currentStep===1 && this.action==='Timeshift'){

                const xmdBody = Object.values(this.selectedTimeshift)
                const datasetXmds = await this.$axios.post(`${process.env.API_URL}/data/dataset/xmd`, xmdBody, { withCredentials: true });

                this.fields = datasetXmds.data.data
                this.isLoading = false

                //Some rows have a null value
                this.fields = this.fields.filter((v)=>v)

                this.fields.forEach(v => {
                    v.dates.forEach(va => {
                        this.selectedTimeshiftFields = {...this.selectedTimeshiftFields, [v.id+'_'+va.alias]: true};
                    });
                });


                // this.fields = response.data.data;
                // this.isLoading = false;
                // this.fields.forEach(v => {
                //     v.dates.forEach(va => {
                //         this.selectedTimeshiftFields = {...this.selectedTimeshiftFields, [v.id+'_'+va.alias]: true};
                //     });
                // });


            }
        }
    },
    methods: {
        setSelected(fieldId, alias){
            this.selectedTimeshiftFields[fieldId+'_'+alias] = !this.selectedTimeshiftFields[fieldId+'_'+alias];
        }
    },
    created() {

    },
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
