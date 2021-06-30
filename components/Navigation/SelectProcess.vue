<template>
  <div>
    <select v-model="selected" :disabled="disabled" class="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
      <option v-show="selected === ''" value="">Get Started...</option>
      <option v-for="option in options" :value="option.value" >{{ option.value }}</option>
    </select>
  </div>
</template>

<script>
export default {

  data() {
    return {
      selected: '',
      disabled: false
    }
  },

  computed: {
    options() {
      return this.$store.state.nav.options
    },
    processState() {
      return this.$store.state.nav.selected
    }
  },

  watch: {
    selected() {
      if (this.selected !== '') {
        this.disabled = true
        this.$store.commit(`nav/setProcess`, this.selected)
      } else {
        this.disabled = false
      }
    },
    processState() {
      const process = this.processState
      const isNone = process === '', isFaq = process === 'FAQ', isHome = process === 'Home';
      if (isNone || isFaq || isHome)
        this.selected = ''
    }
  }

  // add disabled cursor-not-allowed


}
</script>
