<template>

    <div>
        <div class="flex justify-between items-center w-full">
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Select datasets</h2>
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
            <li v-for="(v, i) in this.folders" v-bind:key="v.Id" class="rounded-md mb-4 relative">

                <div class="rounded-full bg-blue-500 absolute w-6 h-6 -top-2 -left-2" v-if="i===-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 p-0.5 self-center text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div class="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md truncate py-1.5">
                    <div class="flex-1 px-4 py-2 text-sm truncate flex items-center">
                        <button @click="setSelected(v)" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
                            <span class="sr-only">Use setting</span>
                            <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>

                            <span aria-hidden="true" :class="(selectedTimeshift[v.Id] ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                            <span aria-hidden="true" :class="(selectedTimeshift[v.Id] ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>

                        </button>
                        <a href="#" class="text-gray-900 font-medium hover:text-gray-600">{{v.Name}}</a>
                    </div>
                    <div class="flex-shrink-0 pr-2">
                        <button class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Open options</span>
                            <svg @click="setAccordion(v.Id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path class="transition-all" v-show="accordion[v.Id]===false" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                <path class="transition-all" v-show="accordion[v.Id]===true" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div :class="(accordion[v.Id] ? 'accordion-body-open ' : 'accordion-body-close ') + 'accordion border-gray-200 p-4 border rounded-md mt-1 space-y-4'">
                    <h2 class="text-sm font-medium text-gray-500">Datasets</h2>
                    <div v-for="(va) in family[v.Id]" v-bind:key="va.Id">
                        <div class="flex-1 flex items-center justify-between bg-white rounded-md truncate">
                            <div class="flex-1 px-4 py-1.5 text-sm truncate flex items-center">
                                <button @click="setSelected(va)" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
                                    <span class="sr-only">Use setting</span>
                                    <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>

                                    <span aria-hidden="true" :class="(selectedTimeshift[va.Id] ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                                    <span aria-hidden="true" :class="(selectedTimeshift[va.Id] ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>

                                </button>
                                <a href="#" @click="setSelected(va)" class="text-gray-900 font-medium hover:text-gray-600">{{va.DeveloperName}}</a>
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
    computed: {
        confirmTimeshiftSelection () {
            return this.$store.state.confirmTimeshiftSelection;
        },
        selectedTimeshift () {
            return this.$store.state.selectedTimeshift;
        }
    },

    data() {
        return {
            datasets: [],
            folders: [],
            accordion: {

            },
            selected: {

            },
            timeshiftDatasets: [

            ],
            family: {

            },
            branch: 'master',
            isLoading: false
        }
    },
    methods: {
        async getFolders(){
            this.isLoading = true;
            this.folders = [];
            this.timeshiftDatasets = [];
            this.$store.commit(`setConfirmTimeshiftSelection` , this.timeshiftDatasets);
            try {
                const response = await this.$axios.get(`http://localhost:3000/api/data/folder`, {withCredentials: true});
                /*
                function timeout(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                await timeout(3000);
                console.log('folders')
                */
                this.folders = response.data.data;
                this.getDatasets();
                //this.isLoading = false;
            } catch (e) {
                this.folders = [];
                //this.isLoading = false;
            }
            let selectedTmp = {};
            this.folders.forEach((v, i) => {
                this.accordion = {...this.accordion, [''+v.Id]: false};
                selectedTmp = {...selectedTmp, [''+v.Id]: false};
                this.family = {...this.family, [''+v.Id]: []};
            });
            this.$store.commit(`setSelectedTimeshift` , selectedTmp);
        },
        async getDatasets(){
            this.datasets = [];
            this.$store.commit(`setConfirmTimeshiftSelection` , this.timeshiftDatasets);
            try {
                const response = await this.$axios.get(`http://localhost:3000/api/data/dataset`, {withCredentials: true});
                //console.log('datasets')
                this.datasets = response.data.data;
                this.datasets.forEach((v, i) => {
                    this.family[v.FolderId].push(v);
                    this.accordion = {...this.accordion, [''+v.Id]: false};
                });
                this.isLoading = false;
            } catch (e) {
                this.datasets = [];
                this.isLoading = false;
            }
        },
        setAccordion(id){
            this.accordion[id] = !this.accordion[id];
        },
        setSelected(dataset){
            let selectedTmp = {...this.selectedTimeshift};
            selectedTmp[dataset.Id] = !selectedTmp[dataset.Id];
            if('FolderId' in dataset){
            }else{
                this.family[dataset.Id].forEach((v, i) => {
                    selectedTmp[v.Id] = selectedTmp[dataset.Id];
                });
            }
            this.$store.commit(`setSelectedTimeshift` , selectedTmp);

            this.timeshiftDatasets = this.confirmTimeshiftSelection;
            if(selectedTmp[dataset.Id]){
                this.timeshiftDatasets = [...this.timeshiftDatasets, dataset];
            }else{
                this.timeshiftDatasets = this.timeshiftDatasets.filter((v) => v.Id !== dataset.Id ? true : false);

            }
            this.$store.commit(`setConfirmTimeshiftSelection` , this.timeshiftDatasets);
        }
    },
    created() {
        this.getFolders();
        //this.getDatasets();
    },
}
</script>

<style>
    .margin-0{
        margin-top: 0px!important;
    }
</style>
