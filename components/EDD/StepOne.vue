<template>

    <div>

        <EDDDatasetColumn 
            @deleteRow="deleteRow" 
            v-bind:columnData="columnData" 
        />

    </div>

</template>

<script>

export default {
    data() {
      return {
        columnData: [
            {id: Date.now(), name: "", type: "", mean: 0, standardDesviation: 0, value: 0, proportion: 0, coefficient: 0}
        ]
      }
    },
    methods: {
        deleteRow(index){
            this.columnData = this.columnData.filter((v, i) => index!==i);
        }
    },
    watch: {
        columnData: function () {
            console.log(this.columnData)
        }
    }
}
</script>

<style>
</style>