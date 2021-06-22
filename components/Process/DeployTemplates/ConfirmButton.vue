<template>
  <div class="flex items-center p-4">
    <button
      v-show="selectedTemplates.length > 0"
      :disabled="selectedTemplates.length === 0 || isQueued"
      @click="queueDeploy"
      type="button" class="mx-auto disabled:opacity-50 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <svg v-show="!isQueued" xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <svg v-show="isQueued" xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="font-semibold cursor-pointer">{{ isQueued ? 'Deploy Queued!' : buttonText }}</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isQueued: false,
    }
  },
  computed: {
    selectedTemplates() {
      return this.$store.state.deployTemplates.selectedTemplates
    },
    buttonText() {
      return `Queue Deploy of ${this.selectedTemplates.length} Template${ this.selectedTemplates.length > 1 ? 's' : '' }`
    }
  },
  methods: {
    async queueDeploy() {

      const requestOptions = { withCredentials: true }
      const payload = this.selectedTemplates.map(d => d.api_name)

      try {

        const postReq = await this.$axios.post(`${process.env.API_URL}/services/template/deploy`, payload, requestOptions)

        if (postReq.status !== 200) {
          this.$store.commit(`setDeployError`, postReq.statusText)
          throw new Error(postReq.statusText)
        }

        this.isQueued = true
        this.$emit(`deployQueued`)


      } catch (e) {
        // commit deployError to store
        this.$store.commit(`setDeployError`, e.message)
      } finally {
        this.$store.commit(`enableNext`)
      }

    }
  }
}
</script>
