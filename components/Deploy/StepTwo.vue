<template>

    <div>
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide py-1">Confirm selected templates</h2>
        <div class="mt-4">            
            <div class="rounded-md bg-blue-50 p-4" v-show="this.confirmSelection.length <= 0">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3 flex-1 md:flex md:justify-between">
                        <p class="text-sm text-blue-700">
                            No selected templates.
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
            <transition-group class="space-y-4" name="deploy-card" tag="ul">
                <li class="bg-white shadow overflow-hidden sm:rounded-md" v-for="(v) in this.confirmSelection" v-bind:key="v.api_name">
                    <a href="#" class="block hover:bg-gray-50">
                        <div class="flex items-center px-4 py-4 sm:px-6">
                            <div class="min-w-0 flex-1 flex items-center">
                                <div class="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                    </svg>
                                </div>
                                <div class="min-w-0 flex-1 px-6 md:grid md:grid-cols-2 md:gap-6">
                                    <div>
                                        <p class="text-sm text-gray-900 truncate">
                                            <span class="font-medium mr-1">Name</span><br>
                                            <span class="break-words">{{v.label}}</span>
                                        </p>
                                        <p class="mt-2 flex items-center text-sm text-gray-500">
                                            <span class="truncate">Version: {{v.version}}</span>
                                        </p>
                                    </div>
                                    <div class="hidden md:block">
                                        <div>
                                            <p class="text-sm text-gray-900">
                                                <span class="font-medium mr-1">API name</span><br>
                                                <span class="break-words">{{v.api_name}}</span>
                                            </p>
                                            <p class="mt-2 flex items-center text-sm text-gray-500">
                                                <span class="font-medium mr-1">API Version: </span>{{v.api_version}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <svg @click="deleteTemplate(v)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
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
        selectedDeploy () {
            return this.$store.state.selectedDeploy;
        },
        confirmSelection () {
            return this.$store.state.confirmSelection;
        },
        currentStep () {
            return this.$store.state.currentStep;
        }
    },

    data() {
        return {
            deployTemplates: [],
            selected: {},
        }
    },
    methods: {
        deleteTemplate(template){
            this.deployTemplates = this.confirmSelection;
            this.deployTemplates = this.deployTemplates.filter((v) => v.label !== template.label ? true : false);
            this.$store.commit(`setConfirmSelection` , this.deployTemplates);

            this.selected = {...this.selectedDeploy};
            this.selected[template.api_name] = !this.selected[template.api_name];
            this.$store.commit(`setSelectedDeploy` , this.selected);
        },
        previousStep() {
            this.$store.commit(`setCurrentStep` , this.currentStep-1);
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