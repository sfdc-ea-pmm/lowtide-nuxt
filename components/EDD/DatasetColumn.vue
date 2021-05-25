<template>
  <div>
    <transition-group class="space-y-6" name="dataset-row" tag="div">
      <div v-for="(v, i) in columnData" v-bind:key="v.id" class="grid grid-cols-7 gap-4">
        <!-- Inputs -->
        <div :class="(va[0]==='id' ? 'hidden' : '') + (va[0]==='name' ? 'col-span-3' : '') + (va[0]==='type' ? 'col-span-2' : '') + (va[0]==='proportion' ? 'relative' : '')" v-for="(va, ia) in Object.entries(v)" v-bind:key="ia">
          <label :for="va[0]" class="block text-sm font-medium text-gray-700 capitalize mb-2">{{va[0]}}</label>
          <input :disabled="(btnAddDisabled && !popoverShow[i]) && (va[0]==='proportion')" v-on:change="va[0]==='proportion' ? handleProportion(i) : ''" :name="va[0]" v-model="v[va[0]]" :type="(va[0]==='proportion' ? 'number' : 'text')" :class="(btnAddDisabled && va[0]==='proportion' ? 'border-red-300 text-red-900 placeholder-red-300 ' : '') + 'flex-grow flex-shrink shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md text-sm w-full capitalize-placeholder'" :placeholder="va[0]==='proportion' ? '00' : va[0]">
          <p v-if="va[0]==='proportion'" v-show="popoverShow[i]" class="mt-3 text-xs text-gray-800 border-red-600 absolute w-48 border py-2 px-3 rounded-lg z-10 bg-white left-1/2 transform -translate-x-1/2 popover-arrow">Proportions have to SUM less than or equal 100.</p>
        </div>
        <!-- END Inputs -->
        <!-- Actions -->
        <div class="mt-auto">
          <button :disabled="btnAddDisabled" v-if="i===0" @click="addRow()" type="button" :class="(btnAddDisabled ? 'cursor-not-allowed ' : '') + 'disabled:opacity-70 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button v-if="i>0" @click="deleteRowData(i)" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
        </div>
        <!-- END Actions -->
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    columnData: Array
  },
  methods: {
    addRow(){
      this.columnData.push({id: Date.now(), name: "", type: "", proportion: 0});
      this.popoverShow.push(false);
    },
    deleteRowData(index){
      this.popoverShow = this.popoverShow.filter((v, i) => index!==i);;
      this.$emit('deleteRow', index);
      this.totalProportion = this.totalProportion - Number(this.columnData[index].proportion);
      this.verifyLimit(index);
    },
    handleProportion(index){
      this.totalProportion = 0;
      this.calculateTotalProportion();
      this.verifyLimit(index);
    },
    verifyLimit(index){
      if(this.totalProportion>100){
        this.btnAddDisabled = true;
        this.popoverShow[index] = true;
      }
      else{
        this.btnAddDisabled = false;
        this.popoverShow[index] = false;
      }
    },
    calculateTotalProportion(){
      this.columnData.forEach((v)=>{
        this.totalProportion += Number(v.proportion);
      })
    },
  },
  data(){
    return {
      totalProportion: 0,
      btnAddDisabled: false,
      popoverShow: [false],
    }
  },
  created() {
    
  }
}
</script>

<style>
  .dataset-row-enter-active, .dataset-row-leave-active{
      transition: all 0.4s;
  }
  .dataset-row-enter, .dataset-row-leave-to {
      opacity: 0;
      transform: translateX(100px);
  }
</style>