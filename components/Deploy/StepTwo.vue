<template>

    <div>
        <h5 v-for="(v, i) in this.selectedDeployTemplates" v-bind:key="i">{{v}}</h5>
    </div>
        
</template>

<script>
export default {
    computed: {
        selectedDeployTemplates () {
            return this.$store.state.selectedDeployTemplates;
        }
    },

    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        console.log(this.selectedDeployTemplates);
    },
}
</script>

<style>

</style>