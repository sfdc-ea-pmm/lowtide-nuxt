<template>

  <div>

    <div class="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md truncate py-1.5">
      <div class="flex-1 px-4 py-2 text-sm truncate flex items-center">
          <span @click="toggleOpen()" class="cursor-pointer text-gray-900 font-medium hover:text-gray-600">{{ this.title }}</span>
      </div>
      <div class="flex-shrink-0 pr-2">
          <button @click="toggleOpen()" class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Open options</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path class="transition-all" v-show="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  <path class="transition-all" v-show="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
          </button>
      </div>
    </div>

    <div :class="(isOpen ? 'accordion-body-open ' : 'accordion-body-close ') + 'accordion border-gray-200 p-4 border rounded-md mt-1 space-y-4'">
        <h2 class="text-sm font-medium text-gray-500">Datasets</h2>
        <div class="px-4 pt-2">
          <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Select
            <span class="text-blue-600 font-bold cursor-pointer hover:text-blue-400" @click="setSelectAll()" >All</span> |
            <span class="text-blue-600 font-bold cursor-pointer hover:text-blue-400" @click="setSelectNone()" >None</span>
          </h2>
        </div>
        <div v-for="(d) in this.datasets" v-bind:key="d.Id">
            <div class="flex-1 flex items-center justify-between bg-white rounded-md truncate">
                <div class="flex-1 px-4 py-1.5 text-sm truncate flex items-center">
                    <button @click="setSelected(d)" type="button" class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
                        <span class="sr-only">Use setting</span>
                        <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
                        <span aria-hidden="true" :class="(selectedTimeshift[d.Id] ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
                        <span aria-hidden="true" :class="(selectedTimeshift[d.Id] ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>
                    </button>
                    <a href="#" @click="setSelected(d)" class="text-gray-900 font-medium hover:text-gray-600">{{ d.DeveloperName }}</a>
                </div>
            </div>
        </div>
    </div>

  </div>

</template>

<script>
export default {

  props: {
    title: String,
    folderId: String,
    datasets: Array
  },

  data() {
    return {
      isOpen: false,
    }
  },

  computed: {
    selectedTimeshift () {
      return this.$store.state.selectedTimeshift
    }
  },

  methods: {

    toggleOpen() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.setSelectAll()
        this.$emit('openedCard', this.folderId)
      } else {
        this.setSelectNone()
        this.$emit('closedCard', this.folderId)
      }
    },

    setSelected(dataset) {

      const { Id, CurrentId } = dataset

      const tmp = { ...this.selectedTimeshift }

      if (tmp[dataset.Id])
        delete tmp[dataset.Id]
      else
        tmp[dataset.Id] = { Id, CurrentId }

      this.$store.commit(`setSelectedTimeshift` , tmp)

    },

    setSelectAll() {

      const tmp = {}

      this.datasets.forEach(d => {
        tmp[d.Id] = {
          Id: d.Id,
          CurrentId: d.CurrentId }
       })

       this.$store.commit(`setSelectedTimeshift` , tmp)

    },

    setSelectNone() {
      this.$store.commit(`setSelectedTimeshift` , {})
    }

  }

}
</script>
