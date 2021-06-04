<template>

    <div>
        <!--<h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Deploy</h2>-->
        <div class="rounded-md bg-blue-50 p-4" v-show="this.confirmDeploySelection.length <= 0">
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
        <div class="mt-6 flex justify-center">
            <ul class="-my-5 divide-y divide-gray-200 w-120">
                <li v-for="(v, i) in this.confirmDeploySelection" v-bind:key="v.api_name" class="py-5 flex text-sm">
                    <div class="mr-2 font-semibold text-gray-800">{{i+1}}.</div>
                    <div class="relative focus-within:ring-2 focus-within:ring-indigo-500">
                        <h3 class="font-semibold text-gray-800">
                            <p class="hover:underline focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                {{v.label}}
                            </p>
                        </h3>
                        <p class="mt-1 text-gray-600 line-clamp-2">
                            {{v.description==='' ? 'No description.' : v.description}}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="this.confirmDeploySelection.length > 0" class="mt-6 flex justify-center">
            <button :disabled="this.finishedProcess" @click="deploy()" :class="(this.finishedProcess ? 'cursor-not-allowed ' : '') + 'w-120 mx-auto disabled:opacity-50 flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                Confirm and deploy
            </button>
        </div>
        <div class="rounded-md bg-blue-50 p-4 mt-4 w-120 mx-auto" v-show="this.finishedProcess">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3 flex-1 md:flex md:justify-between">
                    <p class="text-sm text-blue-700">
                        Deploy is underway! Check the notification center for updates.
                    </p>
                    <!--
                    <p class="mt-3 text-sm md:mt-0 md:ml-6">
                        <a @click.prevent="finished()" href="#" class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-500">
                            Finish
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </a>
                    </p>
                    -->
                </div>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    computed: {
        confirmDeploySelection () {
            return this.$store.state.confirmDeploySelection;
        },
        toastStatus () {
            return this.$store.state.toastStatus;
        },
        currentStep () {
            return this.$store.state.currentStep;
        },
        finishedProcess () {
            return this.$store.state.finishedProcess;
        },
    },

    data() {
        return {

        }
    },
    methods: {
        async deploy(){
            let selectedTemplates = this.confirmDeploySelection;
            let body = [];
            selectedTemplates.forEach(v => {
                body.push(v.api_name);
            });
            this.$store.commit(`setFinishedProcess` , true);
            try {
                await this.$axios.post(`${process.env.API_URL}/services/template/deploy`, body, {withCredentials: true});
            } catch (error) {
                console.log(error)
                const response = error.response.data;
                if(response.message==="No Salesforce authentication found."){
                    this.$store.commit(`setToastStatus` , [{
                        status: true,
                        type: 'info',
                        message: 'Your session has expired. You will be redirected.',
                        time: ''
                    }, ...this.toastStatus]);
                    setTimeout(() => { window.location.replace("/login"); }, 3000);
                }
            }
        },
        previousStep() {
            this.$store.commit(`setCurrentStep` , this.currentStep-2);
        },
        cancel() {
            this.$store.commit(`setAction` , 'Home');
            this.$store.commit(`setCurrentStep` , 0);
            this.$store.commit(`setConfirmDeploySelection` , []);
            this.$store.commit(`setSelectedDeploy` , {});
        },
        finished() {
            this.cancel();
            this.$store.commit(`setFinishedProcess` , false);
        },
    },
    created() {

    },
}
</script>

<style>
    .w-120{
        width: 30rem;
    }
</style>
