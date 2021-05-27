<template>

  <div class="flex items-center">
    <h1 class="flex-1 text-xl font-medium py-0.5">{{ process.selected }}</h1>
    <div class="relative">
      <div v-if="process.showHome">
        <button @click="moveTo('Home')" type="button" :class="'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
            Home
        </button>
      </div>

      <div v-if="process.showButtons">
        <button @click="moveTo('Home')" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
        </button>
         <button @click="stepPrev" type="button" :disabled="!process.buttons.previous" :class="(!process.buttons.previous ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
            Previous
        </button>
        <button @click="stepNext" type="button" :disabled="!process.buttons.next" :class="(!process.buttons.next ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
            <span v-if="process.stepIndex === process.lastStepIndex">Finish</span>
            <span v-else>Next</span>
        </button>
      </div>
    </div>
  </div>


</template>

<script>
export default {

  computed: {
    process() {
      return this.$store.state.process
    }
  },

  methods: {
    moveTo(value) {
      this.$store.commit(`setProcess`, value)
    },
    stepPrev() {
      this.$store.commit('stepPrev')
    },
    stepNext() {
      $nuxt.$emit('clickedNext')
      if (this.process.validNext) {
        if (this.process.stepIndex === this.process.lastStepIndex)
            this.$store.commit(`setProcess`, 'Home')
        else
          this.$store.commit('stepNext')
      }
    },
    disableNext() {
      this.$store.commit('disableNext')
    },
    disablePrevious() {
      this.$store.commit('disablePrevious')
    }
  },

  watch: {
    process() {
      this.moveTo(this.process)
    }
  }

}
</script>
