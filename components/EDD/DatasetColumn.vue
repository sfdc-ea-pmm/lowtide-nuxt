<template>
  <div>
    <transition-group class="space-y-3" name="dataset-row" tag="div">
      <div 
        v-for="(v, i) in columnData" 
        v-bind:key="v.id" 
        class="flex flex-row"
      >
        <div class="flex-1 flex flex-row flex-wrap ">
          <!-- Inputs -->
          <div 
            :class="(va[0]==='id' ? 'hidden' : 'mr-4 mb-3 ') + (va[0]==='proportion' ? 'relative' : '')" 
            v-for="(va, ia) in Object.entries(v)" v-bind:key="ia"
            v-show="(va[0]==='name' || va[0]==='type') || ((va[0]==='mean' || va[0]==='standardDesviation' || va[0]==='coefficient') && v.type==='binary') || ((va[0]==='value' || va[0]==='proportion' || va[0]==='coefficient') && v.type==='continuous')"
          >
            <label 
              :for="va[0]" 
              class="block text-sm font-medium text-gray-700 capitalize mb-2"
            >
              {{va[0]}}
            </label>
            <!-- Text or Select -->
            <input v-if="va[0]!=='type'"
              :disabled="(btnAddDisabled && !popoverShow[i]) && (va[0]==='proportion')" 
              v-on:change="(va[0]==='proportion' ? handleProportion(i) : '')" 
              :name="va[0]" 
              v-model="v[va[0]]"
              :type="(va[0]==='proportion' ? 'number' : 'text')" 
              :class="(va[0]==='name' ? 'w-60 ' : '') + (va[0]==='proportion' ? 'w-20 ' : '') + (btnAddDisabled && va[0]==='proportion' ? 'border-red-300 text-red-900 placeholder-red-300 ' : '') + 'flex-grow flex-shrink shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md text-sm capitalize-placeholder'" 
              :placeholder="va[0]==='proportion' ? '00' : va[0]"
            >
            <select v-else
              class="w-56 mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              v-model="v[va[0]]"
            >
              <option value="">Choose an option</option>
              <option value="binary">Binary</option>
              <option value="continuous">Continuous</option>
            </select>
            <!-- END Text or Select -->
            <p v-if="va[0]==='proportion'" v-show="popoverShow[i]" class="mt-3 text-xxs text-gray-800 border-red-600 absolute w-48 border py-2 px-3 rounded-lg z-10 bg-white left-1/2 transform -translate-x-1/2 popover-arrow">Proportions have to SUM less than or equal 100.</p>
          </div>
          <!-- END Inputs -->
        </div>
        <!-- Actions -->
        <div class="self-start">
          <!-- Add row button -->
          <!-- Disable "Add row" button when the sum of proportions exceeds the amount of 100. -->
          <button v-if="i===0"
            :disabled="btnAddDisabled" @click="addRow()" 
            type="button" 
            :class="(btnAddDisabled ? 'cursor-not-allowed ' : '') + 'disabled:opacity-70 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-7'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <!-- END "Add row" button -->
          <!-- Delete row button -->
          <button v-if="i>0" 
            @click="deleteRowData(i)" 
            type="button" 
            class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-7"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <!--  END Delete row button -->
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
      this.columnData.push({id: Date.now(), name: "", type: "", mean: 0, standardDesviation: 0, value: 0, proportion: 0, coefficient: 0});
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
        this.$store.commit(`setBtnNextDisabled`, true)
      }
      else{
        this.btnAddDisabled = false;
        this.popoverShow[index] = false;
        this.$store.commit(`setBtnNextDisabled`, false)
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
  .text-xxs{
    font-size: 0.7rem;
  }
</style>