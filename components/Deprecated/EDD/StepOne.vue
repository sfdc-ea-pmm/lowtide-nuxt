<template>

    <div>

        <EDDDatasetRow 
            @deleteRow="deleteRow" 
            @addRow="addRow" 
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
        },
        addRow(){
            this.columnData.push({id: Date.now(), name: "", type: "", mean: 0, standardDesviation: 0, value: 0, proportion: 0, coefficient: 0});
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