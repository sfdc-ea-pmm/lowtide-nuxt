<template>
  <div class="flex flex-col">
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Select Templates</h2>
    <div class="pt-2 pb-4">
        <input v-model="searchTerm" type="text" class="disabled:opacity-70 flex-grow flex-shrink shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md text-sm w-72" placeholder="Search...">
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      timeout: null,
      searchTerm: ''
    }
  },
  computed: {
    templates() {
      return this.$store.state.deploy.visibleTemplates
    },
    storeSearchTerm() {
      return this.$store.state.deploy.searchTerm
    },
    hasSearchTerm() {
      return this.searchTerm !== ''
    }
  },
  methods: {
    clearSearchTerm() {
      this.searchTerm = ''
    }
  },
  watch: {
    searchTerm() {
      let hst = this.hasSearchTerm, st = this.searchTerm;
      // Debounce input, only apply after 250ms timeout
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (hst) this.$store.commit(`deploy/setVisibleTemplates`, st);
        else this.$store.commit(`deploy/setAllTemplatesVisible`);
      }, 250)
    }
  }
}
</script>
