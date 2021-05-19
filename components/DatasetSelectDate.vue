<template>
  <div class="flex flex-grow items-center">
    <div class="flex-none">
      <button @click="toggleSelect" type="button" class="group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4" role="switch" aria-checked="false">
        <span class="sr-only">Use setting</span>
        <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
        <span aria-hidden="true" :class="(fieldData.isSelected ? 'bg-blue-600 ' : 'bg-gray-200 ') + 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'"></span>
        <span aria-hidden="true" :class="(fieldData.isSelected ? 'translate-x-5 ' : 'translate-x-0 ') + 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'"></span>
      </button>
    </div>
    <div class="flex-grow" @click="toggleSelect">
        <div class="text-sm">{{ fieldData.label }}</div>
        <div class="text-xs text-gray-500">API Name: {{ fieldData.fieldApiName }}</div>
    </div>
    <div v-show="fieldData.isFetching" class="flex-none">
         <div class="loader sm animate-spin"></div>
     </div>
     <div v-show="fieldData.foundDate !== ''" class="flex-none">
          {{ fieldData.foundDate }}
      </div>
  </div>
</template>

<script>
export default {

  props: {
    fieldData: Object
  },

  methods: {
    toggleSelect() {
      this.isSelected = !this.isSelected
      this.$emit('toggledSelected', this.fieldData)
    }
  }

}
</script>
