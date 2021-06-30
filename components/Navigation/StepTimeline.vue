<template>
  <nav aria-label="Progress">
    <ol class="overflow-hidden">
      <li v-for="(v, i) in steps" :key="i" class="relative pb-6">
        <div v-if="i < steps.length - 1" :class="(i < stepIndex ? 'bg-blue-600' : 'bg-gray-300') + ' -ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full'" aria-hidden="true"></div>
        <NavigationTimelineItem :itemIndex="i" :title="v.title" :description="v.description" />
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
    computed: {
      steps() {
        const { selected, options } = this.$store.state.nav
        const process = options.filter(o => o.value === selected).pop()
        if (process)
          return process.timeline
        return null
      },
      stepIndex() {
        return this.$store.state.nav.stepIndex
      }
    },
}
</script>

<style>

</style>
