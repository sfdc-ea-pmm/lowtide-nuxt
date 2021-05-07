<template>

    <div>
        <TimeshiftStepOne v-show="this.currentStep===0 && this.action==='Timeshift'"/>
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