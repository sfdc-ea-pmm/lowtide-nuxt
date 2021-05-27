<template>
  <div class="flex items-center space-x-3 lg:w-full px-2 pb-2 lg:px-0 lg:pb-0">
    <div class="flex-shrink-0 h-12 w-12 relative">
      <img @mouseenter="isHover = true" :class="(isHover ? '-z-index opacity-0 ' : '') + 'img-profile h-12 w-12 rounded-full'" src="~/assets/img/generic.png" alt="">
      <div @mouseleave="isHover = false" :class="(isHover ? 'cursor-pointer ' : '-z-index ') + 'flex justify-center items-center h-12 w-12 absolute top-0 left-0 rounded-full text-white' + (isLogout ? ' bg-blue-300' : ' bg-blue-500')">
        <div v-if="isLogout" class="loader animate-spin"></div>
        <svg v-else @click="logout" xmlns="http://www.w3.org/2000/svg" :class="'logout h-6 w-6'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
    </div>
    <div class="space-y-0.5">
      <div class="cursor-default text-sm font-semibold text-gray-900">{{ session.salesforce.user.name }}</div>
      <a :href="session.salesforce.auth.instanceUrl" target="_blank" class="group flex items-center space-x-1.5">
        <p class="lg:w-48 w-full truncate text-xs text-gray-500 group-hover:text-gray-900 font-base">{{ session.salesforce.user.username }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      isHover: false,
      isLogout: false
    }
  },

  computed: {
    session() {
      return this.$store.state.session
    }
  },

  methods: {
    async logout() {
      try {
        this.isLogout = true
        await this.$axios.get(`/auth/revoke`, { withCredentials: true })
        this.$store.commit('clearNotifications')
        sessionStorage.removeItem('notifications')
        this.$router.push('/')
      } catch (e) {
        console.error(e)
        if (e.response.data.message === "No Salesforce authentication found."){
            this.$store.commit(`setToastStatus` , [{
                status: true,
                type: 'info',
                message: 'Your session has expired. You will be redirected.',
                time: ''
            }, ...this.toastStatus]);
            setTimeout(() => {
              window.location.replace('/')
            }, 1500);
        }
      }
    }
  }

}
</script>
