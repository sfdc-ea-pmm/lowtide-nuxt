<template>

  <div>
    <!--
    <div class="flex justify-between items-center w-full">
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Coming Soon!
        </h2>
    </div>
    <div class="my-4">
      <p>Please check back later, as this tool is being built right now!</p>
    </div>
    -->
    <EDDStepOne v-show="this.currentStep===0 && this.action==='Einstein Discovery Data'"/>
  </div>

</template>

<script>
export default {
  computed: {
    action () {
        return this.$store.state.action;
    },
    currentStep () {
        return this.$store.state.currentStep;
    },
  },
}
</script>
