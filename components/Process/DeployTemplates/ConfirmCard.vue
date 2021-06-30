<template>
    <div>

      <div class="mt-4 shadow rounded-md">
        <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div class="min-w-0 flex-1 px-6 md:grid md:grid-cols-2 md:gap-6">
                <div class="flex flex-col pb-3 md:pb-0">
                  <span class="text-gray-400 text-xs font-semibold uppercase tracking-wide">Template</span>
                  <span class="text-gray-700 text-sm font-bold">{{ template.label }}</span>
                  <span class="text-gray-700 text-sm">{{ dbCount }}, {{ dsCount }}</span>
                  <span class="text-gray-500 text-xs font-normal">Version {{ template.version }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-400 text-xs font-semibold uppercase tracking-wide">API</span>
                  <span class="text-gray-700 text-sm font-bold">{{ template.api_name }}</span>
                  <span class="text-gray-500 text-xs font-normal">API {{ template.api_version}}</span>
                </div>
              </div>
            </div>
            <div v-show="editable" class="cursor-pointer">
              <svg @click="removeTemplate" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
        </div>
      </div>

    </div>

</template>

<script>
export default {
  props: {
    template: Object,
    editable: Boolean
  },
  computed: {
    dbCount() {
      const name = ` Dashboard${ this.template.dashboards.length > 1 ? 's' : ''}`
      return this.template.dashboards.length + name
    },
    dsCount() {
      const name = ` Dataset${ this.template.datasets.length > 1 ? 's' : ''}`
      return this.template.datasets.length + name
    }
  },
  methods: {
    removeTemplate() {
      this.$store.commit(`deploy/deselectTemplate`, this.template)
    }
  }
}
</script>
