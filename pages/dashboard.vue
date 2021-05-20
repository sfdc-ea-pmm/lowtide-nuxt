<template>
    <div class="relative min-h-screen flex flex-col">
        <div class="flex-grow w-full mx-auto xl:pl-8 lg:flex">
            <div class="flex-1 min-w-0 bg-white lg:flex">
                <div class="xl:flex-shrink-0 xl:w-72 lg:w-80 lg:border-r lg:border-gray-200 bg-white">
                    <div :class="(this.action!=='Home' && this.action!=='FAQ' ? 'md:pb-2 ' : 'md:pb-6 ') + 'md:pl-6 pr-6 pt-6 xl:pb-4 xl:pl-0'">
                        <div class="flex items-center justify-between">
                            <div class="flex-1 xl:space-y-8 md:space-y-6">
                                <div class="xl:space-y-8 lg:space-y-4 md:space-y-0 sm:flex sm:justify-between sm:items-center xl:block lg:flex-col">
                                    <div class="flex items-center space-x-3 lg:w-full">
                                        <div class="flex-shrink-0 h-12 w-12 relative">
                                            <img @mouseenter="imgProfileHover=true" :class="(imgProfileHover ? '-z-index opacity-0 ' : '') + 'img-profile h-12 w-12 rounded-full'" src="~/assets/img/generic.png" alt="">
                                            <div @mouseleave="imgProfileHover=false" :class="(imgProfileHover ? 'cursor-pointer ' : '-z-index ') + 'flex justify-center items-center h-12 w-12 absolute top-0 left-0 rounded-full text-white' + (logoutLoading ? ' bg-blue-300' : ' bg-blue-500')">
                                                <div v-if="logoutLoading" class="loader animate-spin"></div>
                                                <svg v-else @click="logout()" xmlns="http://www.w3.org/2000/svg" :class="'logout h-6 w-6'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="space-y-0.5">
                                            <div class="text-sm font-medium text-gray-900">{{ session.salesforce.user.name }}</div>
                                            <a :href="session.salesforce.auth.instanceUrl" target="_blank" class="group flex items-center space-x-1.5">
                                                <span class="text-sm text-gray-500 group-hover:text-gray-900 font-medium">{{ session.salesforce.user.username.substring(0, 23)+(session.salesforce.user.username.length>23 ? "..." : "") }}</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="flex sm:flex-row xl:flex-col space-x-2 select-basis w-full justify-between">
                                        <Select v-bind:options="this.options" v-bind:mutation="'setAction'" v-bind:label="'Select an action'" v-bind:step="this.currentStep" />
                                        <button @click="openModal()" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:hidden h-fit relative">
                                            <div class="rounded-full bg-blue-500 absolute w-4 h-4 -top-1.5 -right-1.5" v-show="!this.notificationsViewed">

                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div v-show="this.action!=='Home' && this.action!=='FAQ'">
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
                                <button @click="goHome()" v-show="this.action==='FAQ'" type="button" :class="'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                                    Home
                                </button>
                                <button @click="cancel()" v-show="(this.action!=='Home' && this.action!=='FAQ') && !this.finishedProcess" type="button" :class="'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                                    Cancel
                                </button>
                                <button :disabled="this.currentStep===0" @click="previousStep()" v-show="(this.action!=='Home' && this.action!=='FAQ') && !this.finishedProcess" type="button" :class="(this.currentStep===0 ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                                    Previous
                                </button>
                                <button :disabled="(this.currentStep===(this.steps.length-1) || this.btnNextDisabled)" @click="nextStep()" v-show="(this.action!=='Home' && this.action!=='FAQ') && !this.finishedProcess" type="button" :class="((this.currentStep===(this.steps.length-1) || this.btnNextDisabled) ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
                                    Next
                                </button>
                                <button @click="finished()" v-show="this.finishedProcess" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Finish
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 main-section">
                        <Home v-show="this.action==='Home'" />
                        <Deploy v-show="this.action==='Deploy'" />
                        <Timeshift v-show="this.action==='Timeshift'" />
                        <DiscoveryData v-show="this.action==='Einstein Discovery Data'" />
                        <FAQ v-show="this.action==='FAQ'" />
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 lg:flex-shrink-0 lg:border-l lg:border-gray-200 md:p-0">
                <NotificationCenter />
            </div>
        </div>
        <Toast />
    </div>

</template>

<script>
export default {
    async asyncData({ $axios, redirect, store }) {
        try {
            const response = await $axios.get(`${process.env.API_URL}/auth/session`, { withCredentials: true });
            const session = response.data.data;
            if('salesforce' in session){
              store.commit(`setSession` , session);
            } else {
              sessionStorage.removeItem('notifications');;
              redirect('/login');
            }
            return { session }
        } catch (e) {
            sessionStorage.removeItem('notifications');;
            redirect('/login');
        }
    },
    computed: {
        action () {
            return this.$store.state.action;
        },
        currentStep () {
            return this.$store.state.currentStep;
        },
        finishedProcess () {
            return this.$store.state.finishedProcess;
        },
        toastStatus () {
            return this.$store.state.toastStatus;
        },
        notifications () {
            return this.$store.state.notifications;
        },
        notificationsViewed () {
            return this.$store.state.notificationsViewed;
        },
        btnNextDisabled () {
            return this.$store.state.btnNextDisabled;
        },
    },

    data() {
        return {
            options: [
                {title: 'Einstein Discovery Data', value: 'Einstein Discovery Data'},
                {title: 'Deploy', value: 'Deploy'},
                {title: 'Timeshift', value: 'Timeshift'}
            ],
            steps: [
                {
                  title: 'Select Dataset Parameters',
                  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'current'
                },
                {
                  title: 'Define Columns',
                  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'
                },
                {
                  title: 'Set Relations',
                  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'
                },
                {
                  title: 'Generate Data',
                  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.', type: 'upcoming'
                }
            ],
            imgProfileHover: false,
            logoutLoading: false,
        }
    },
    methods: {
        async logout() {
            try {
                this.logoutLoading = true;
                await this.$axios.get(`/auth/revoke`, {withCredentials: true});
                this.$store.commit(`setNotifications` , []);
                sessionStorage.removeItem('notifications');
                this.finished();
                this.$router.push('/login');
            } catch (error) {
                console.error(error);
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
        goHome() {
            this.$store.commit(`setAction` , 'Home');
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
        nextStep() {
            this.$store.commit(`setCurrentStep` , this.currentStep + 1);
        },
        previousStep() {
            this.$store.commit(`setCurrentStep` , this.currentStep - 1);
        },
        openModal(){
            this.$store.commit(`setModalStatus` , true);
            if(!this.notificationsViewed){
                this.$store.commit(`setNotificationsViewed` , true);
            }
        },
        getCurrentTime(){
            let date = new Date();
            let hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds();
            let currentTime = (hours < 10 ? '0' + hours : hours ) + ":" + (minutes < 10 ? '0' + minutes : minutes ) + ":" + (seconds < 10 ? '0' + seconds : seconds );
            return currentTime;
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
        const vm = this;
        vm.socket = this.$nuxtSocket({
            name: "main"
        });
        vm.socket.emit('subscribeToJobUpdates', this.session.socketRoom);

        const activeEvents = [ 'jobStarted', 'jobInfo', 'jobProgress', 'jobSuccess', 'jobError', 'serverError' ];

        activeEvents.forEach(event => {
            vm.socket.on(event, (message) => {

                // console.log('Socket:', message, event);

                let currentTime = this.getCurrentTime();
                let type, text;

                switch (event) {
                    case 'jobError' || 'serverError':
                        type = 'error';
                        text = `${message.event.job.context.template} had a error.`;
                        if(message.event.producer==='lowtide.deployQueue'){
                            vm.$store.commit(`setToastStatus` , [{
                                status: true,
                                type: type,
                                message: text,
                                time: currentTime
                            }, ...vm.toastStatus]);
                            setTimeout(() => { this.$store.commit(`setToastStatus` , this.toastStatus.filter((v) => v.time===currentTime ? false : true)); }, 5000);
                            vm.$store.commit(`setNotifications` , [
                                {title: 'Deploy', time: currentTime, message: text, type: type}
                            , ...this.notifications]);
                            vm.$store.commit(`setNotificationsViewed` , false);
                        }
                        break;
                    case 'jobSuccess':
                        type = 'success';
                        text = `${message.event.job.context.template} has been successfully deployed.`;
                        if(message.event.producer==='lowtide.deployQueue'){
                            vm.$store.commit(`setToastStatus` , [{
                                status: true,
                                type: type,
                                message: text,
                                time: currentTime
                            }, ...vm.toastStatus]);
                            setTimeout(() => { this.$store.commit(`setToastStatus` , this.toastStatus.filter((v) => v.time===currentTime ? false : true)); }, 5000);
                            vm.$store.commit(`setNotifications` , [
                                {title: 'Deploy', time: currentTime, message: text, type: type}
                            , ...this.notifications]);
                            vm.$store.commit(`setNotificationsViewed` , false);
                        }
                        break;
                    case 'jobStarted':
                        type = 'info';
                        text = `${message.event.job.context.template} has started to deploy.`;
                        if(message.event.producer==='lowtide.deployQueue'){
                            vm.$store.commit(`setNotifications` , [
                                {title: 'Deploy', time: currentTime, message: text, type: type}
                            , ...this.notifications]);
                            vm.$store.commit(`setNotificationsViewed` , false);
                        }
                        break;
                    case 'jobInfo':
                        type = 'info';
                        text = `${message.event.job.context.template}: ${message.event.message}`;
                        vm.$store.commit(`setNotifications` , [
                            {title: 'Deploy', time: currentTime, message: text, type: type}
                        , ...this.notifications]);
                        vm.$store.commit(`setNotificationsViewed` , false);
                        break;
                    default:

                        break;
                }
            });
        });

    },
    watch: {
        action: function () {
            switch (this.action) {
                case 'Einstein Discovery Data':
                    this.steps = [
                        {
                          title: 'Coming Soon',
                          description: 'We are as excited as you are, we promise!',
                          type: 'current'
                        }
                        /*
                        {
                          title: 'Define Columns',
                          description: 'TBD',
                          type: 'upcoming'
                        },
                        {
                          title: 'Set Relations',
                          description: 'TBD',
                          type: 'upcoming'
                        },
                        {
                          title: 'Generate Data',
                          description: 'TBD',
                          type: 'upcoming'
                        },
                        */
                    ];
                    break;
                case 'Deploy':
                    this.steps = [
                        {
                          title: 'Select Templates',
                          description: 'In this step, select the application templates you want to deploy into your Salesforce org. You can uncollapse each card for more information about dashboards, datasets, etc.',
                          type: 'current'
                        },
                        {
                          title: 'Confirm Selections',
                          description: 'Make sure you have selected all the assets you want. Feel free to step backwards and add or remove more templates!',
                          type: 'upcoming'
                        },
                        {
                          title: 'Deploy Templates',
                          description: 'Off we go! Deploy the templates to your Salesforce org and view the notifications panel for updates.',
                          type: 'upcoming'
                        }
                    ];
                    break;
                case 'Timeshift':
                    this.steps = [
                        {
                          title: 'Select Datasets',
                          description: 'Choose which datasets to include in your timeshifting dataflow. Remember, only datasets with date columns will be timeshifted properly.',
                          type: 'current'
                        },
                        {
                          title: 'Select Date Fields',
                          description: 'Choose which fields to include from each dataset, and fetch the latest dates from that dataset.',
                          type: 'upcoming'
                        },
                        {
                          title: 'Generate Dataflows',
                          description: 'Two dataflows will be generated and inserted in your org, and a "primer" dataflow will be run.',
                          type: 'upcoming'
                        },
                        {
                          title: 'Schedule Dataflow',
                          description: 'Last but not least, to keep things perpetually up to date, we can schedule our timeshift dataflow to run regularly.',
                          type: 'upcoming'
                        },
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
