<template>

    <div>
        <div class="flex justify-between items-center w-full">
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Templates</h2>
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
            <li v-for="(v, i) in this.templates" v-bind:key="v.api_name" class="rounded-md mb-4 relative">

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

                            <span aria-hidden="true" :class="(selectedDeploy[v.api_name] ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                            <span aria-hidden="true" :class="(selectedDeploy[v.api_name] ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>

                        </button>
                        <a href="#" class="text-gray-900 font-medium hover:text-gray-600">{{v.label}}</a>
                    </div>
                    <div class="flex-shrink-0 pr-2">
                        <button class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Open options</span>
                            <svg @click="setAccordion(v.api_name)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path class="transition-all" v-show="accordion[v.api_name]===false" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                <path class="transition-all" v-show="accordion[v.api_name]===true" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div :class="(accordion[v.api_name] ? 'accordion-body-open ' : 'accordion-body-close ') + 'accordion border-gray-200 p-4 border rounded-md mt-1 space-y-4'">
                    <div v-if="v.description !== ''">
                        <h2 class="text-sm font-medium text-gray-500">Description</h2>
                        <p class="text-sm mt-2">{{v.description}}</p>
                    </div>
                    <div v-if="v.dashboards" :class="(v.dashboards.length > 0 ? '' : 'margin-0')">
                        <h2 v-show="v.dashboards.length > 0" class="text-sm font-medium text-gray-500">Dashboards</h2>
                        <ul :class="(v.dashboards.length > 0 ? 'mt-2 ' : '') + 'leading-8'">
                            <li v-for="(va, ib) in v.dashboards" v-bind:key="va+ib" class="inline-block mr-2">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <span class="ml-1 text-sm text-gray-900">{{va}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-if="v.datasets" :class="(v.datasets.length > 0 ? '' : 'margin-0')">
                        <h2 v-show="v.datasets.length > 0" class="text-sm font-medium text-gray-500">Datasets</h2>
                        <ul :class="(v.datasets.length > 0 ? 'mt-2 ' : '') + 'leading-8'">
                            <li v-for="(va, ib) in v.datasets" v-bind:key="va+ib" class="inline-block mr-2">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                    <span class="ml-1 text-sm text-gray-900">{{va}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-if="v.tags" :class="(v.tags.length > 0 ? '' : 'margin-0')">
                        <h2 v-show="v.tags.length > 0" class="text-sm font-medium text-gray-500">Tags</h2>
                        <ul :class="(v.tags.length > 0 ? 'mt-2 ' : '') + 'leading-8'">
                            <li v-for="(va, ib) in v.tags" v-bind:key="va+ib" class="inline mr-2">
                                <a href="#" class="relative inline-flex items-center rounded-full border border-gray-300 px-3 pt-0.5 pb-1">
                                    <div class="absolute flex-shrink-0 flex items-center justify-center">
                                        <span class="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true"></span>
                                    </div>
                                    <div class="ml-3.5 text-sm font-medium text-gray-900">{{va}}</div>
                                </a>
                            </li>
                        </ul>
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
        confirmSelection () {
            return this.$store.state.confirmSelection;
        },
        selectedDeploy () {
            return this.$store.state.selectedDeploy;
        }
    },

    data() {
        return {
            templates: [],
            accordion: {

            },
            selected: {

            },
            deployTemplates: [

            ],
            branch: 'master',
            isLoading: false
        }
    },
    methods: {
        async getTemplates(){
            this.isLoading = true;
            this.templates = [];
            this.deployTemplates = [];
            this.$store.commit(`setConfirmSelection` , this.deployTemplates);
            try {
                const response = await this.$axios.get(`http://localhost:3000/api/data/repository`, {withCredentials: true});
                this.templates = response.data.data;
                this.isLoading = false;
            } catch (e) {
                this.templates = [];
                this.isLoading = false;
            }
            let selectedTmp = {};
            this.templates.forEach((v, i) => {
                this.accordion = {...this.accordion, [''+v.api_name]: false}
                selectedTmp = {...selectedTmp, [''+v.api_name]: false}
            });
            this.$store.commit(`setSelectedDeploy` , selectedTmp);
        },
        setAccordion(id){
            this.accordion[id] = !this.accordion[id];
        },
        setSelected(template){
            let selectedTmp = {...this.selectedDeploy};
            selectedTmp[template.api_name] = !selectedTmp[template.api_name];
            this.$store.commit(`setSelectedDeploy` , selectedTmp);

            this.deployTemplates = this.confirmSelection;
            if(selectedTmp[template.api_name]){
                this.deployTemplates = [...this.deployTemplates, template];
            }else{
                this.deployTemplates = this.deployTemplates.filter((v) => v.label !== template.label ? true : false);

            }
            this.$store.commit(`setConfirmSelection` , this.deployTemplates);
        },
        changeBranch(){
            if(this.branch==='master'){
                this.branch = 'beta';
            }else{
                this.branch = 'master';
            }
            this.getTemplates();
        }
    },
    created() {
        this.getTemplates();
    },
}
</script>

<style>
    .margin-0{
        margin-top: 0px!important;
    }
</style>
