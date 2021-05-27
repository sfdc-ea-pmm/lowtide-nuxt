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
      searchTerm: ''
    }
  },
  computed: {
    templates() {
      return this.$store.state.deployTemplates.visibleTemplates
    },
    storeSearchTerm() {
      return this.$store.state.deployTemplates.searchTerm
    },
    hasSearchTerm() {
      return this.searchTerm !== ''
    }
  },
  watch: {
    searchTerm() {
      if (this.hasSearchTerm)
        this.$store.commit(`setVisibleTemplates`, this.searchTerm)
      else
        this.$store.commit(`setAllTemplatesVisible`)
    },
    storeSearchTerm() {
      this.searchTerm = this.storeSearchTerm
    }
  }
}
</script>
