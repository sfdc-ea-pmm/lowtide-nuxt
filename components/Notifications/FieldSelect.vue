<template>
  <div>
    <select v-model="selected" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
      <option v-for="option in options" :value="option.value" >{{ option.title }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: this.$store.state.modal.fieldFilter
    }
  },
  computed: {
    options() {
      return this.$store.state.modal.fieldOptions
    }
  },
  watch: {
    selected() {
      this.$store.commit(`setFieldFilter`, this.selected)
    }
  }
}
</script>
