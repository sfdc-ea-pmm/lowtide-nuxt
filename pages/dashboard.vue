<template>
    <div class="relative min-h-screen flex flex-col">
        <div class="flex-grow w-full mx-auto xl:pl-8 lg:flex">
            <div class="flex-1 min-w-0 bg-white xl:flex">
                <div class="xl:flex-shrink-0 xl:w-72 xl:border-r xl:border-gray-200 bg-white">
                    <div class="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                        <div class="flex items-center justify-between">
                            <div class="flex-1 space-y-12">
                                <div class="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                                    <div class="flex items-center space-x-3">
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
                                    <div class="flex flex-col sm:flex-row xl:flex-col">
                                        <Select v-bind:options="this.options" />
                                    </div>
                                </div>
                                <div>
                                    <Steps v-bind:steps="this.steps" v-show="this.action!=='Welcome!'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white lg:min-w-0 lg:flex-1">
                    <div class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                        <div class="flex items-center">
                            <h1 class="flex-1 text-lg font-medium">
                                {{this.action}}
                            </h1>
                            <div class="relative">
                                
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div v-show="this.action==='Welcome!'">
                            Welcome!
                        </div>
                        <Deploy v-show="this.action==='Deploy'" />
                        <Timeshift v-show="this.action==='Timeshift'" />
                        <DiscoveryData v-show="this.action==='Einstein Discovery Data'" />
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 pr-4 pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200">
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
        }
    },

    data() {
        return {
            notifications: [
                {title: 'Timeshift', time: '13:05:12', message: 'Your job has finished successfully.', type: 'success'},
                {title: 'Deploy', time: '13:21:51', message: 'Your job has started.', type: 'info'},
                {title: 'Deploy', time: '13:26:44', message: 'Your job has finished but an error has occurred.', type: 'error'}
            ],
            options: [
                {title: 'Einstein Discovery Data'},
                {title: 'Deploy'},
                {title: 'Timeshift'}
            ],
            steps: [
                {title: 'Select dataset parameters', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'current'},
                {title: 'Define columns', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'},
                {title: 'Set relations', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'},
                {title: 'Generate data', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'}
                
            ],
            imgProfileHover: false,
            logoutLoading: false
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
    },
    mounted() {

    },
    watch: {
        action: function () {
            switch (this.action) {
                case 'Einstein Discovery Data':
                    this.steps = [
                        {title: 'Select dataset parameters', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'current'},
                        {title: 'Define columns', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'},
                        {title: 'Set relations', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'},
                        {title: 'Generate data', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'}
                        
                    ];
                    break;
                case 'Deploy':
                    this.steps = [
                        {title: 'Select templates', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'current'},
                        {title: 'Deploying', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', type: 'upcoming'},
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
    .img-profile{
        transition: opacity 0.4s;
    }
    .img-profile:hover{
        z-index: -1;
    }
    .logout{
        flex-grow: 1;
    }
</style>