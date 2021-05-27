<template>
  <div class="flex justify-center p-2">
    <button @click="callDownload" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <div class="pr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      </div>
      {{ `Download ${templateApiName}.zip` }}
    </button>
  </div>
</template>

<script>
export default {

  props: {
    templateApiName: String
  },

  methods: {
    callDownload() {
        window.location.assign(`${process.env.HOSTNAME}/api/data/repository/download/${this.templateApiName}`)
    }
  }

}
</script>
