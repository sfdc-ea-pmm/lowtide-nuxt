<template>
    <div class="relative min-h-screen flex flex-col">
        <div class="flex-grow w-full mx-auto xl:pl-8 lg:flex">
            <div class="flex-1 min-w-0 bg-white lg:flex">
                <div class="xl:flex-shrink-0 xl:w-72 lg:w-80 lg:border-r lg:border-gray-200 bg-white">
                    <div :class="(nav.showButtons ? 'md:pb-2 ' : 'md:pb-6 ') + 'md:pl-6 pr-6 pt-6 xl:pb-4 xl:pl-0'">
                        <div class="flex items-center justify-between">
                            <div class="flex-1 xl:space-y-8 md:space-y-6">
                                <div class="xl:space-y-8 lg:space-y-4 md:space-y-0 sm:flex sm:justify-between sm:items-center xl:block lg:flex-col">
                                    <NavigationLoggedInUser />
                                    <div class="flex flex-row w-full p-2 space-x-2">
                                        <div class="flex-grow">
                                          <NavigationSelectProcess />
                                        </div>
                                        <NotificationsModalButton />
                                    </div>
                                </div>
                                <div v-show="nav.showButtons">
                                    <NavigationStepTimeline />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white lg:min-w-0 lg:flex-1">
                    <div class="pl-6 pr-6 pt-4 pb-4 border-b border-t border-gray-200 xl:pt-6 xl:border-t-0">
                      <NavigationProcessButtons />
                    </div>
                    <div class="p-6 main-section">
                      <NavigationStepContainer :prefix="nav.processToComponentFolderMap[nav.selected]" />
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 lg:flex-shrink-0 lg:border-l lg:border-gray-200 md:p-0">
                <NavigationNotificationCenter />
            </div>
        </div>
        <AlertsToast />
    </div>

</template>

<script>
export default {
    async asyncData({ $axios, redirect, store }) {
      try {
        const response = await $axios.get(`${process.env.API_URL}/auth/session`, { withCredentials: true })
        const session = response.data.data
        if ('salesforce' in session) {
          store.commit(`setSession` , session)
        } else {
          sessionStorage.removeItem('notifications')
          redirect('/login')
        }
        return { session }
      } catch (e) {
        sessionStorage.removeItem('notifications')
        redirect('/login')
      }
    },
    computed: {
      nav() {
        return this.$store.state.nav
      },
      globalNotifications () {
        return this.$store.state.notifications
      },
      toastStatus () {
        return this.$store.state.toastStatus
      },
    },

    data() {
      return {
        imgProfileHover: false,
        logoutLoading: false,
      }
    },
    methods: {
      getCurrentTime() {
        let date = new Date();
        let hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
        let currentTime = (hours < 10 ? '0' + hours : hours ) + ":" + (minutes < 10 ? '0' + minutes : minutes ) + ":" + (seconds < 10 ? '0' + seconds : seconds );
        return currentTime;
      }
    },
    validate ({ redirect }) {
      return (window.innerWidth <= 480) ? redirect('/compatibility') : true;
    },
    mounted() {

        const vm = this

        vm.socket = this.$nuxtSocket({
            name: "main"
        })

        vm.socket.emit('subscribeToJobUpdates', this.session.socketRoom)

        const activeEvents = [ 'jobStarted', 'jobInfo', 'jobProgress', 'jobSuccess', 'jobError', 'serverError' ]

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
                            , ...vm.globalNotifications]);
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
                            , ...vm.globalNotifications]);
                            vm.$store.commit(`setNotificationsViewed` , false);
                        }
                        break;
                    case 'jobStarted':
                        type = 'info';
                        text = `${message.event.job.context.template} has started to deploy.`;
                        if(message.event.producer==='lowtide.deployQueue'){
                            vm.$store.commit(`setNotifications` , [
                                {title: 'Deploy', time: currentTime, message: text, type: type}
                            , ...vm.globalNotifications]);
                            vm.$store.commit(`setNotificationsViewed` , false);
                        }
                        break;
                    case 'jobInfo':
                        type = 'info';
                        text = `${message.event.job.context.template}: ${message.event.message}`;
                        vm.$store.commit(`setNotifications` , [
                            {title: 'Deploy', time: currentTime, message: text, type: type}
                        , ...vm.globalNotifications]);
                        vm.$store.commit(`setNotificationsViewed` , false);
                        break;
                    default:

                        break;
                }
            });
        });

    }
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
