<template>
    <div>
        <a @click.prevent="modalOpen()" href="#" class="text-blue-600 font-semibold hover:text-blue-900">View all activity <span aria-hidden="true">&rarr;</span></a>

        <div :class="(modalShow ? 'modal-open ' : 'modal-close -z-index ') + 'modal fixed z-10 inset-0 overflow-y-auto'" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div class="space-y-4">
                            <div class="text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Notifications
                                </h3>
                            </div>
                            <div class="flex flex-wrap justify-between space-x-2">
                                <Select v-bind:options="this.options" v-bind:label="'Select a field'" v-bind:mutation="'setNotificationFieldFilter'" class="flex-grow flex-shrink-0 select-basis" />
                                <input type="text" class="flex-grow flex-shrink shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md text-sm" placeholder="Filter value">
                            </div>
                            <div class="">
                                <ul class="divide-y divide-gray-200">
                                    <li v-for="(v, i) in this.notifications" v-bind:key="i" class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <div class="flex justify-between space-x-3">
                                            <div class="min-w-0 flex-1">
                                                <a href="#" class="block focus:outline-none">
                                                    <span class="absolute inset-0" aria-hidden="true"></span>
                                                    <p class="text-sm font-medium text-gray-900 truncate">{{v.title}}</p>
                                                    <p class="text-sm text-gray-500 truncate capitalize">{{v.type}}</p>
                                                </a>
                                            </div>
                                            <time datetime="2021-01-27T16:35" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{v.time}}</time>
                                        </div>
                                        <div class="mt-1">
                                            <p class="line-clamp-2 text-sm text-gray-600">
                                                {{v.message}}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 text-right">
                        <button @click="modalClose()" type="button" class="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
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

    },

    data() {
        return {
            modalShow: false,
            options: [
                {title: 'Type'},
                {title: 'Title'},
                {title: 'Time'},
                {title: 'Message'}
            ],
        }
    },
    methods: {
        modalOpen (){
            this.modalShow = true;
        },
        modalClose (){
            this.modalShow = false;
        }
    },
    created() {
        
    },
}
</script>

<style>
    .modal{
        transition: all 0.4s ease-in-out;
    }
    .modal-close{
        opacity: 0;
    }
    .modal-open{
        opacity: 1;
    }
    .select-basis{
        flex-basis: 75px;
    }
</style>