<template>

    <div>
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Confirm selected templates</h2>
        <div class="mt-3">            
            <div class="bg-white shadow overflow-hidden sm:rounded-md">
                <ul class="divide-y divide-gray-200">
                    <transition-group name="deploy-card" tag="div">
                        <li v-for="(v, i) in this.confirmSelection" v-bind:key="i+v.api_name">
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
                                                <p class="text-sm font-medium text-indigo-600 truncate">{{v.label}}</p>
                                                <p class="mt-2 flex items-center text-sm text-gray-500">
                                                    <span class="truncate">Version: {{v.version}}</span>
                                                </p>
                                            </div>
                                            <div class="hidden md:block">
                                                <div>
                                                    <p class="text-sm text-gray-900">
                                                        <span class="font-medium mr-1">API Name:</span>{{v.api_name}}
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
                </ul>
            </div>
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
        }
    },

    data() {
        return {
            deployTemplates: [],
            selected: [],
        }
    },
    methods: {
        deleteTemplate(template){
            this.deployTemplates = this.confirmSelection;
            this.deployTemplates = this.deployTemplates.filter((v) => v.label !== template.label ? true : false);
            this.$store.commit(`setConfirmSelection` , this.deployTemplates);

            this.selected = this.selectedDeploy;
            this.selected[template.api_name] = !this.selected[template.api_name];
            this.$store.commit(`setSelectedDeploy` , this.selected);
        }
    },
    created() {
        
    },
}
</script>

<style>
    .deploy-card-enter-active, .deploy-card-leave-active{
        transition: all 0.5s;
    }
    .deploy-card-enter, .deploy-card-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>