<template>

    <div>
        <TimeshiftStepOne v-show="this.currentStep===0 && this.action==='Timeshift'"/>
        <TimeshiftStepTwo v-show="this.currentStep===1 && this.action==='Timeshift'"/>
        <TimeshiftStepThree v-show="this.currentStep===2 && this.action==='Timeshift'"/>
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
