<template>

  <div class="flex items-center">
    <h1 class="flex-1 text-xl font-medium py-0.5">{{ nav.selected }}</h1>
    <div class="relative">
      <div v-if="nav.showHome">
        <button @click="moveTo('Home')" type="button" :class="'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
            Home
        </button>
      </div>

      <div v-if="nav.showButtons">
        <button @click="moveTo('Home')" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
        </button>
         <button @click="stepPrev" type="button" :disabled="!nav.buttons.previous" :class="(!nav.buttons.previous ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
            Previous
        </button>
        <button @click="stepNext" type="button" :disabled="!nav.buttons.next" :class="(!nav.buttons.next ? 'cursor-not-allowed ' : '') + 'disabled:opacity-50 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'">
            <span v-if="nav.stepIndex === nav.lastStepIndex">Finish</span>
            <span v-else>Next</span>
        </button>
      </div>
    </div>
  </div>


</template>

<script>
export default {

  computed: {
    nav() {
      return this.$store.state.nav
    }
  },

  methods: {
    moveTo(value) {
      this.$store.commit(`nav/setProcess`, value)
      this.$store.commit(`nav/releaseNext`)
    },
    stepPrev() {
      this.$store.commit('nav/stepPrev')
    },
    stepNext() {
      $nuxt.$emit('clickedNext')
      if (this.nav.buttons.next && this.nav.validNext) {
        if (this.nav.stepIndex === this.nav.lastStepIndex)
            this.$store.commit(`nav/setProcess`, 'Home')
        else
          this.$store.commit('nav/stepNext')
      }
    }
  },

  watch: {
    nav() {
      this.moveTo(this.nav)
    }
  }

}
</script>
