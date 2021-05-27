<template>
  <button @click="toggleModal" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:hidden h-fit relative">
      <div class="rounded-full bg-blue-500 absolute w-4 h-4 -top-1.5 -right-1.5" v-show="unread"></div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
  </button>
</template>

<script>
export default {

  computed: {
    unread() {
      return this.$store.state.modal.unread
    }
  },

  methods: {
    toggleModal() {
      this.$store.commit(`toggleModal`)
    }
  }

}
</script>
