<template>
  <div>
    <div v-show="false">
      <div class="flex justify-between items-center w-full">
          <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Coming Soon!
          </h2>
      </div>
      <div class="my-4">
        <p>Please check back later, as this tool is being built right now!</p>
      </div>
    </div>

    <div v-show="true">
        <TimeshiftStepOne v-show="this.currentStep===0 && this.action==='Timeshift'"/>
        <TimeshiftStepTwo v-show="this.currentStep===1 && this.action==='Timeshift'"/>
        <TimeshiftStepThree v-show="this.currentStep===2 && this.action==='Timeshift'"/>
    </div>
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

    data() {
        return {

        }
    },
    methods: {

    },
    created() {

    },
}
</script>

<style>

</style>
