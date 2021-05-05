<template>

    <div>
        <DeployStepOne v-show="this.currentStep===0 && this.action==='Deploy'"/>
        <DeployStepTwo v-show="this.currentStep===1 && this.action==='Deploy'"/>
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