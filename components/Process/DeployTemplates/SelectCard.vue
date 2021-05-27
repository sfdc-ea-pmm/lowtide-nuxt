<template>
  <div>

    <!-- Implementing versions -->
    <div v-show="false" class="rounded-full bg-blue-500 absolute w-6 h-6 -top-2 -left-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 p-0.5 self-center text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <!-- End -->

    <div class="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md truncate py-1.5">
      <div class="flex-1 px-4 py-2 text-sm truncate flex items-center">
        <button @click="toggleSelected" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
          <span class="sr-only">Select Template</span>
          <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
          <span aria-hidden="true" :class="(isSelected ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
          <span aria-hidden="true" :class="(isSelected ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>
        </button>
        <span @click="toggleOpen" class="cursor-pointer text-gray-900 font-medium hover:text-gray-600">{{template.label}}</span>
      </div>
      <div class="flex-shrink-0 pr-2">
          <button @click="toggleOpen" class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">Open Template</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path class="transition-all" v-show="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              <path class="transition-all" v-show="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
      </div>
    </div>

    <div :class="(isOpen ? 'accordion-body-open ' : 'accordion-body-close ') + 'accordion border-gray-200 p-4 border rounded-md mt-1 space-y-4'">
      <div v-if="hasDescription">
          <h2 class="text-sm font-medium text-gray-500">Description</h2>
          <p class="text-sm mt-2">{{ template.description }}</p>
      </div>
      <div v-if="template.dashboards" :class="(template.dashboards.length > 0 ? '' : 'margin-0')">
        <h2 v-show="template.dashboards.length > 0" class="text-sm font-medium text-gray-500">Dashboards</h2>
        <ul :class="(template.dashboards.length > 0 ? 'mt-2 ' : '') + 'leading-8'">
          <li v-for="(dashboard, i) in template.dashboards" v-bind:key="dashboard + i" class="inline-block mr-2">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span class="ml-1 text-sm text-gray-900">{{ dashboard }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="template.datasets" :class="(template.datasets.length > 0 ? '' : 'margin-0')">
        <h2 v-show="template.datasets.length > 0" class="text-sm font-medium text-gray-500">Datasets</h2>
        <ul :class="(template.datasets.length > 0 ? 'mt-2 ' : '') + 'leading-8'">
          <li v-for="(dataset, i) in template.datasets" v-bind:key="dataset + i" class="inline-block mr-2">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              <span class="ml-1 text-sm text-gray-900">{{ dataset }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="template.tags" :class="(template.tags.length > 0 ? '' : 'margin-0')">
        <h2 v-show="template.tags.length > 0" class="text-sm font-medium text-gray-500">Tags</h2>
        <ul :class="(template.tags.length > 0 ? 'mt-2 ' : '') + 'leading-8'">
          <li v-for="(tag, i) in template.tags" v-bind:key="tag + i" class="inline mr-2">
            <span @click="setSearchTerm(tag)" class="cursor-pointer relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
              <div class="absolute flex-shrink-0 flex items-center justify-center">
                <span class="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true"></span>
              </div>
              <div class="ml-3.5 text-sm font-medium text-gray-900">{{ tag }}</div>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <ProcessDeployTemplatesDownloadTemplate :templateApiName="template.api_name" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    template: Object
  },
  data() {
    return {
      isOpen: false,
      isSelected: false
    }
  },
  computed: {
    hasDescription() {
      return this.template.description !== ''
    }
  },
  methods: {
    toggleSelected() {
      this.isSelected = !this.isSelected
      if (this.isSelected)
        this.$store.commit(`selectTemplate`, this.template)
      else
        this.$store.commit(`deselectTemplate`, this.template)
    },
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    setSearchTerm(tag) {
      this.$store.commit(`setSearchTerm`, tag)
    }
  }
}
</script>
