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
    nav() {
      return this.$store.state.nav
    }
  },
  methods: {
    getComponentText() {
      let path;
      if (!this.nav.showButtons)
        path = `Process${this.prefix}`
      else
        path = `Process${this.prefix}Steps`
      return `${path}${this.nav.stepIndexToText[this.nav.stepIndex]}`
    }
  }
}
</script>
