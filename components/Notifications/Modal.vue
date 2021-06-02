<template>

        <div :class="(visible ? 'modal-open ' : 'modal-close -z-index ') + 'modal fixed z-10 inset-0'" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div class="space-y-5">
                            <div class="text-left flex justify-between flex-row">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Notifications
                                </h3>
                                <svg @click="toggleModal" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="flex flex-wrap justify-between space-x-2">
                              <NotificationsFieldSelect />
                              <input :disabled="notifications.length < 1" v-model="searchTerm" type="text" class="disabled:opacity-70 flex-grow flex-shrink shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md text-sm" placeholder="Search...">
                            </div>
                            <div class="modal-scroll">
                                <div v-if="notifications.length < 1" class="text-center text-sm py-6 text-gray-800">No notifications.</div>
                                <div v-else>
                                  <ul class="divide-y divide-gray-200">
                                      <li v-for="(v, i) in filteredNotifications" :key="i" class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                          <div class="flex flex-row space-x-3">
                                              <svg v-if="v.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 self-center text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                              </svg>
                                              <svg v-if="v.type === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 self-center text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                              </svg>
                                              <svg  v-if="v.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 self-center text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                              </svg>
                                              <div class="flex-1">
                                                  <div class="flex justify-between space-x-3">
                                                      <div class="min-w-0 flex-1">
                                                          <a href="#" class="block focus:outline-none">
                                                              <span class="absolute inset-0" aria-hidden="true"></span>
                                                              <p class="text-sm font-medium text-gray-900 truncate">{{ v.title }}</p>
                                                              <p class="text-sm text-gray-500 truncate capitalize">{{ v.type }}</p>
                                                          </a>
                                                      </div>
                                                      <time :datetime="v.time" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ v.time }}</time>
                                                  </div>
                                                  <div class="mt-1">
                                                      <p class="line-clamp-2 text-sm text-gray-600">
                                                          {{ v.message }}
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 text-right">
                        <button @click="toggleModal()" type="button" class="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
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

  data() {
    return {
      searchTerm: '',
      filteredNotifications: '',
    }
  },

  computed: {
    visible() {
      return this.$store.state.modal.visible
    },
    fieldFilter() {
      return this.$store.state.modal.fieldFilter
    },
    fieldOptions() {
      return this.$store.state.modal.fieldOptions
    },
    notifications() {
      return this.$store.state.notifications
    }
  },

  methods: {
    toggleModal() {
      this.$store.commit(`toggleModal`)
    }
  },

  watch: {
    searchTerm() {
      const lcSearchTerm = this.searchTerm.toLowerCase()
      this.filteredNotifications = this.notifications.filter((d => d[this.fieldFilter].toLowerCase().includes(lcSearchTerm)))
    }
  },

  created() {
    this.filteredNotifications = this.notifications;
  }

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
.modal-scroll{
  height: 400px;
  overflow-y: auto;
}
</style>
