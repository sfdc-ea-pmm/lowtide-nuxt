<template>

    <div class="space-y-6">
        <div class="">
            <dt class="text-sm font-medium text-gray-500 mb-4">
                About
            </dt>
            <dd class="text-sm text-gray-900 space-y-3 text-justify">
                <p>
                Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.
                </p>
                <p>
                Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.
                </p>
            </dd>
        </div>
        <div class="">
            <h2 class="text-sm font-medium text-gray-500 mb-4">Developers</h2>
            <!--
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                <div v-for="(v) in this.developers" v-bind:key="v.email" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="v.img" alt="">
                    </div>
                    <div class="flex-1 min-w-0">
                        <a href="#" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            <p class="text-sm font-medium text-gray-900">
                                {{v.name}}
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                                {{v.email}}
                            </p>
                        </a>
                    </div>
                </div>

            </div>
            -->
            <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                <li v-for="(v) in this.developers" v-bind:key="v.email" class="bg-white rounded-lg shadow divide-y divide-gray-200 border-t">
                    <div class="w-full flex items-center justify-between p-6 space-x-6">
                        <div class="flex-1 truncate">
                            <div class="flex items-center space-x-3">
                                <h3 class="text-gray-900 text-sm font-medium truncate">{{v.name}}</h3>
                                <span class="flex-shrink-0 inline-block px-2 pt-0.5 pb-1 text-blue-800 text-xs font-medium bg-blue-100 rounded-full">Admin</span>
                            </div>
                            <p class="mt-1 text-gray-500 text-sm truncate">{{v.position}}</p>
                        </div>
                        <img class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" :src="v.img" alt="">
                    </div>
                    <div>
                        <div class="-mt-px flex divide-x divide-gray-200">
                            <div class="w-0 flex-1 flex">
                                <a :href="'mailto:'+v.email" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-xs text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                                    <!-- Heroicon name: solid/mail -->
                                    <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span class="ml-3">Email</span>
                                </a>
                            </div>
                            <div class="-ml-px w-0 flex-1 flex">
                                <a target="_blank" :href="v.github" class="relative w-0 flex-1 inline-flex items-center justify-center py-2 text-xs text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                                    <!-- Heroicon name: solid/phone -->
                                    <img class="h-4 w-4" src="~/assets/img/github.png" alt="">
                                    <span class="ml-3">Github</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>

            <!-- More people... -->
            </ul>
        </div>
        <div class="">
            <h2 class="text-sm font-medium text-gray-500 mb-4">Team members</h2>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                <div v-for="(v) in this.teamMembers" v-bind:key="v.email" class="relative rounded-lg border border-gray-300 bg-white px-4 py-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="v.img" alt="">
                    </div>
                    <div class="flex-1 min-w-0">
                        <a href="#" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            <p class="text-sm font-medium text-gray-900">
                                {{v.name}}
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                                {{v.email}}
                            </p>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
        
</template>

<script>
export default {
    computed: {

    },

    data() {
        return {
            developers: [
                {name: 'Romario Sarmiento', email: 'rsarmiento@salesforce.com', img: 'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixqx=Tt6LMluVtn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', position: 'Demo Engineer', github: 'http://github.com/romariosc97'},
                {name: 'Luc Iyer', email: 'luciyer@salesforce.com', img: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixqx=Tt6LMluVtn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', position: 'Demo Engineer', github: 'http://github.com/luciyer'}
            ],
            teamMembers: [
                {name: 'Jayger McGough', email: 'jmcgough@salesforce.com', img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixqx=Tt6LMluVtn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'},
                {name: 'Aditi Patel', email: 'aditi.patel@salesforce.com', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=Tt6LMluVtn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'},
                {name: 'Rodrigo Mercader', email: 'rmercader@salesforce.com', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=Tt6LMluVtn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'},
                {name: 'Juan Ferreira', email: 'juan.ferreira@salesforce.com', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixqx=Tt6LMluVtn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            ],
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