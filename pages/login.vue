<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="login()" class="space-y-6" action="#" method="POST">
                    <div class="sm:mx-auto sm:w-full sm:max-w-md">
                        <img class="mx-auto h-12 w-auto" src="~/assets/img/lt-logo.svg" alt="Lowtide" />
                        <h2 class="mt-2 text-center text-3xl font-semibold text-gray-900">

                        </h2>
                    </div>
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700"></label>
                        <div class="mt-1">
                            <input v-model="username" id="username" name="username" placeholder="user@demo.org" type="text" autocomplete="username" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700"></label>
                        <div class="mt-1">
                            <input v-model="password" id="password" name="password" type="password" placeholder="password" autocomplete="current-password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <button :disabled="btnCredentialsLoading" type="submit" :class="(btnCredentialsLoading ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'">
                            <div v-if="btnCredentialsLoading" class="loader animate-spin"></div>
                            <span class="flex justify-center flex-row flex-grow" v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span class="flex-grow">Login with Credentials</span>
                            </span>
                        </button>
                    </div>
                    <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300" />
                    </div>
                    <div class="relative flex justify-center">
                      <span class="px-2 bg-white text-sm text-gray-500">
                        or
                      </span>
                    </div>
                  </div>
                    <div>
                        <button @click="loginSalesforce()" :disabled="btnOauthLoading || btnCredentialsLoading" type="button" :class="(btnOauthLoading || btnCredentialsLoading ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'">
                            <div v-if="btnOauthLoading" class="loader animate-spin"></div>
                            <div class="flex justify-center flex-row flex-grow" v-else>
                                <SvgSalesforce />
                                <span class="flex-grow">Login with Salesforce</span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script>
export default {

    computed: {
        toastStatus () {
            return this.$store.state.toastStatus;
        },
    },

    data() {
        return {
            username: '',
            password: '',
            btnCredentialsLoading: false,
            btnOauthLoading: false,
        }
    },
    methods: {
        async login() {
            this.btnCredentialsLoading = true;
            try {
                const res = await this.$axios.post(`/auth/login`, {
                    username: this.username,
                    password: this.password
                }, {withCredentials: true});
                this.btnCredentialsLoading = false;
                this.$router.push('/dashboard');
            } catch (error) {
                let currentTime = this.getCurrentTime();
                this.$store.commit(`setToastStatus` , [{
                    status: true,
                    type: 'error',
                    message: 'Invalid credentials.',
                    time: currentTime
                }, ...this.toastStatus]);
                setTimeout(() => { this.$store.commit(`setToastStatus` , this.toastStatus.filter((v) => v.time===currentTime ? false : true)); }, 5000);
                this.btnCredentialsLoading = false;
            }
        },
        async loginSalesforce() {
            this.btnOauthLoading = true;
            window.location.href = process.env.API_URL + "/auth/oauth";
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
    mounted: function () {

    },
}
</script>

<style>

</style>
