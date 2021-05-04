<template>
    <div class="relative min-h-screen flex flex-col">
        <div class="flex-grow w-full mx-auto xl:pl-8 lg:flex">
            <div class="flex-1 min-w-0 bg-white lg:flex">
                <div class="xl:flex-shrink-0 xl:w-72 lg:w-80 lg:border-r lg:border-gray-200 bg-white">
                    <div :class="(this.action!=='Home' ? 'md:pb-2 ' : 'md:pb-6 ') + 'md:pl-6 pr-6 pt-6 xl:pb-4 xl:pl-0'">
                        <div class="flex items-center justify-between">
                            <div class="flex-1 xl:space-y-8 md:space-y-6">
                                <div class="xl:space-y-8 lg:space-y-4 md:space-y-0 sm:flex sm:justify-between sm:items-center xl:block lg:flex-col">
                                    <div class="flex items-center space-x-3 lg:w-full">
                                        <div class="flex-shrink-0 h-12 w-12 relative">
                                            <img @mouseenter="imgProfileHover=true" :class="(imgProfileHover ? '-z-index opacity-0 ' : '') + 'img-profile h-12 w-12 rounded-full'" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=Tt6LMluVtn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="">
                                            <div @mouseleave="imgProfileHover=false" :class="(imgProfileHover ? 'cursor-pointer ' : '-z-index ') + 'flex justify-center items-center h-12 w-12 absolute top-0 left-0 rounded-full text-white' + (logoutLoading ? ' bg-blue-300' : ' bg-blue-500')">
                                                <div v-if="logoutLoading" class="loader animate-spin"></div>
                                                <svg v-else @click="logout()" xmlns="http://www.w3.org/2000/svg" :class="'logout h-6 w-6'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="space-y-0.5">
                                            <div class="text-sm font-medium text-gray-900">{{ session.salesforce.user.name }}</div>
                                            <a :href="session.salesforce.auth.instanceUrl" class="group flex items-center space-x-1.5">
                                                <span class="text-sm text-gray-500 group-hover:text-gray-900 font-medium">{{ session.salesforce.user.username }}</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="flex sm:flex-row xl:flex-col space-x-2 select-basis w-full justify-between">
                                        <Select v-bind:options="this.options" v-bind:mutation="'setAction'" v-bind:label="'Select an action'" v-bind:step="this.currentStep" />
                                        <button @click="openModal()" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:hidden h-fit">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div v-show="this.action!=='Home'">
                                    <Steps v-bind:steps="this.steps" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white lg:min-w-0 lg:flex-1">
                    <div class="pl-6 pr-6 pt-4 pb-4 border-b border-t border-gray-200 xl:pt-6 xl:border-t-0">
                        <div class="flex items-center">
                            <h1 class="flex-1 text-xl font-medium py-0.5">
                                {{this.action}}
                            </h1>
                            <div class="relative">
                                <button @click="cancel()" v-show="this.action!=='Home'" type="button" :class="'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                                    Cancel
                                </button>
                                <button :disabled="this.currentStep===0" @click="previousStep()" v-show="this.action!=='Home'" type="button" :class="(this.currentStep===0 ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                                    Previous
                                </button>
                                <button @click="nextStep()" v-show="this.action!=='Home'" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 main-section">
                        <Home v-show="this.action==='Home'" />
                        <Deploy v-show="this.action==='Deploy'" />
                        <Timeshift v-show="this.action==='Timeshift'" />
                        <DiscoveryData v-show="this.action==='Einstein Discovery Data'" />
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 lg:flex-shrink-0 lg:border-l lg:border-gray-200 md:p-0">
                <NotificationCenter v-bind:notifications="this.notifications" />
            </div>
        </div>
    </div>
        
</template>

<script>
export default {
    async asyncData({ $axios, redirect }) {
        try {
            const response = await $axios.get('http://localhost:3000/api/auth/session', {withCredentials: true});
            const session = response.data;
            if('salesforce' in session){
                
            }else{
                redirect('/login');
            }
            return { session }
        } catch (e) {
            redirect('/login');
        }
    },
    computed: {
        action () {
            return this.$store.state.action;
        },
        currentStep () {
            return this.$store.state.currentStep;
        }
    },

    data() {
        return {
            notifications: [
                {title: 'Timeshift', time: '13:05:12', message: 'Your job has finished successfully.', type: 'success'},
                {title: 'Deploy', time: '13:21:51', message: 'Your job has started.', type: 'info'},
                {title: 'Deploy', time: '13:26:44', message: 'Your job has finished but an error has occurred.', type: 'error'},
                {title: 'Timeshift', time: '13:35:51', message: 'Your job has started.', type: 'info'},
                {title: 'Session', time: '13:36:39', message: 'Your session will expire soon.', type: 'info'},
                {title: 'Timeshit', time: '13:46:22', message: 'Your job has finished successfully.', type: 'success'},
                {title: 'Einstein Data Discovery', time: '13:52:49', message: 'Your job has started.', type: 'info'},
                {title: 'Einstein Data Discovery', time: '13:53:09', message: 'Your job has finished but an error has occurred.', type: 'error'},
            ],
            options: [
                {title: 'Einstein Discovery Data', value: 'Einstein Discovery Data'},
                {title: 'Deploy', value: 'Deploy'},
                {title: 'Timeshift', value: 'Timeshift'}
            ],
            steps: [
                {title: 'Select dataset parameters', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'current'},
                {title: 'Define columns', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'},
                {title: 'Set relations', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'},
                {title: 'Generate data', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'}
                
            ],
            imgProfileHover: false,
            logoutLoading: false,
        }
    },
    methods: {
        async logout() {
            try {
                this.logoutLoading = true;
                await this.$axios.get('http://localhost:3000/api/auth/revoke', {withCredentials: true});            
                this.$router.push('/login');
            } catch (error) {
                console.error(error);   
            }
        },
        async cancel() {
            this.$store.commit(`setAction` , 'Home');
            this.$store.commit(`setCurrentStep` , 0);
        },
        async nextStep() {
            this.$store.commit(`setCurrentStep` , this.currentStep+1);
        },
        async previousStep() {
            this.$store.commit(`setCurrentStep` , this.currentStep-1);
        },
        openModal(){
            this.$store.commit(`setModalStatus` , true);
        }
    },
    validate({redirect}) {
        if(window.innerWidth <= 480){
            return redirect('/compatibility');
        }else{
            return true;
        }
    },
    mounted() {

    },
    watch: {
        action: function () {
            switch (this.action) {
                case 'Einstein Discovery Data':
                    this.steps = [
                        {title: 'Select dataset parameters', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'current', type: 'current'},
                        {title: 'Define columns', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'},
                        {title: 'Set relations', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'},
                        {title: 'Generate data', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'}
                        
                    ];
                    break;
                case 'Deploy':
                    this.steps = [
                        {title: 'Select templates', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'current'},
                        {title: 'Confirm selection', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'},
                        {title: 'Results', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'}
                        
                    ];
                    break;
                case 'Timeshift':
                    this.steps = [
                        {title: 'Select datasets', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'current'},
                        {title: 'Timeshifting', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'},
                        {title: 'Results', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'}
                    ];
                    break;
            }
        }
    },
}
</script>

<style>
    .main-section{
        min-height: 300px;
    }
    .select-basis{
        flex-basis: 300px;
    }
    @media (min-width: 1024px) {
        .select-basis{
            flex-basis: 0px;
        }
    }
    @media (min-width: 1280px) {
        .select-basis{
            flex-basis: 300px;
        }
    }
    .img-profile{
        transition: opacity 0.4s;
    }
    .img-profile:hover{
        z-index: -1;
    }
    .logout{
        flex-grow: 1;
    }
    .h-fit{
        height: fit-content;
    }
</style>