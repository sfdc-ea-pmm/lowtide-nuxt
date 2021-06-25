<template>
  <div class="text-sm truncate flex items-center pl-2">
      <h2 class="text-gray-500 pr-1 text-xs font-medium uppercase tracking-wide mr-2">
        Beta Templates
      </h2>
      <button @click="setDeployBranch" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none" role="switch" aria-checked="false">
          <span class="sr-only">Use setting</span>
          <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
          <span aria-hidden="true" :class="(isBeta ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
          <span aria-hidden="true" :class="(isBeta ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>
      </button>
  </div>
</template>

<script>
export default {
  computed: {
    isBeta() {
      return this.$store.state.session.deployBranch === 'beta'
    }
  },
  methods: {
    async setDeployBranch() {
      const value = this.isBeta ? 'master' : 'beta'
      try {
        const requestOptions = { withCredentials: true }
        await this.$axios.get(`${process.env.API_URL}/auth/session/${value}`, requestOptions)
        this.$store.commit(`setDeployBranch`, value)
        this.$emit(`changedBranch`)
      } catch (e) {
        console.error(e)
        this.$store.commit(`setDeployBranch`, 'master')
      }
    }
  }
}
</script>
