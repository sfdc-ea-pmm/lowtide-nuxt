<template>
    <div>
      <component :is="getComponentText()" />
    </div>
</template>

<script>
export default {
  props: {
    prefix: String
  },
  computed: {
    process() {
      return this.$store.state.process
    },
    stepIndexToText() {
      return this.$store.state.stepIndexToText
    }
  },
  methods: {
    getComponentText() {
      let path;
      if (!this.process.showButtons)
        path = `Process${this.prefix}`
      else
        path = `Process${this.prefix}Steps`
      return `${path}${this.stepIndexToText[this.process.stepIndex]}`
    }
  }
}
</script>
