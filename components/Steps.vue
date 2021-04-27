<template>
    <nav aria-label="Progress">
        <ol class="overflow-hidden">
            <li v-for="(v, i) in this.steps" v-bind:key="i" class="relative pb-6">
                <div v-if="i+1<steps.length" class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-blue-600" aria-hidden="true"></div>
                <a href="#" class="relative flex items-start group">
                    <span v-show="/*v.type==='current'*/i===currentStep" class="h-9 flex items-center" aria-hidden="true">
                        <span class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full">
                            <span class="h-2.5 w-2.5 bg-blue-600 rounded-full"></span>
                        </span>
                    </span>
                    <span v-show="/*v.type==='complete'*/i<currentStep" class="h-9 flex items-center">
                        <span class="relative z-10 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
                            <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </span>
                    <span v-show="/*v.type==='upcoming'*/i>currentStep" class="h-9 flex items-center" aria-hidden="true">
                        <span class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                            <span class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"></span>
                        </span>
                    </span>
                    <span class="ml-4 min-w-0 flex flex-col mt-2">
                        <span class="text-sm font-semibold tracking-wide">{{v.title}}</span>
                        <span class="text-sm text-gray-500 mt-4">{{v.description}}</span>
                    </span>
                </a>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    props: {
        steps: {
            type: Array
        }
    },
    computed: {
        currentStep () {
            return this.$store.state.currentStep;
        }
    },

    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        
    },
}
</script>

<style>

</style>