<template>
    <div>
        <div class="pt-6 pb-5 pl-6 pr-8 border-b md:hidden lg:block">
            <h2 class="text-lg font-semibold">Notifications</h2>
        </div>
        <div class="pl-6 lg:w-80 md:hidden lg:block lg:pr-8">
            <div>
                <ul class="divide-y divide-gray-200">
                    <li :class="'py-4'" v-for="(v, i) in this.dashboardNotifications" v-bind:key="i">
                        <div class="flex space-x-3">
                            <svg v-if="v.type==='success'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 self-center text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg v-if="v.type==='info'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 self-center text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg  v-if="v.type==='error'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 self-center text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div class="flex-1 space-y-1">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-medium">{{v.title}}</h3>
                                    <p class="text-xs text-gray-500">{{v.time}}</p>
                                </div>
                                <p class="text-sm text-gray-500">{{v.message}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="lg:py-4 lg:px-6 text-sm lg:border-t border-gray-200 md:p-0 ">
            <Modal v-bind:notifications="this.notifications" v-bind:scroll="true" />      
        </div>
    </div>
</template>

<script>
export default {
    props: {
        notifications: {
            type: Array
        }
    },
    computed: {
        dashboardNotifications(){
            return this.notifications.filter((v, i) => i < 6 );
        }
    },

    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {

    },
}
</script>

<style>

</style>