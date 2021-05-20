<template>
    <div class="flex-grow">
        <label id="listbox-label" class="block text-sm font-medium text-gray-700">
        </label>
        <div class="relative">
            <button :disabled="this.step>0" @click="changeStatus()" type="button" :class="(this.step>0 ? 'cursor-not-allowed ' : '' ) + 'disabled:opacity-50 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="block truncate">
                    {{ action==='Home' && currentStep===0 ? this.label : selected}}
                </span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>

            <ul :class="(open ? '' : 'select-menu-transition ')+'select-menu absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <li v-for="(v, i) in this.options" v-bind:key="i" @click="changeSelected(v.title, v.value)" class="cursor-pointer hover:text-white hover:bg-blue-600 text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                    <span :class="(selected===v.title && action!=='Home' ? 'font-bold ' : 'font-normal ') + 'block truncate'">
                        {{v.title}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    mutation: {
      type: String
    },
    label: {
      type: String
    },
    step: {
      type: Number
    }
  },
  computed: {
    action () {
      return this.$store.state.action;
    },
    currentStep () {
      return this.$store.state.currentStep;
    }
  },

  data() {
    return {
      open: false,
      selected: this.label
    }
  },
  methods: {
    changeStatus() {
      this.open = !this.open;
    },
    close(e) {
      if (! this.$el.contains(e.target)) {
        this.open = false;
      }
    },
    changeSelected(label, value) {
      this.selected = label;
      this.open = false;
      this.$store.commit(`${this.mutation}` , value);
    },
  },
  created() {
    window.addEventListener('click', this.close);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close);
  },
}
</script>

<style>
.select-menu {
    transition: opacity 0.3s;
    z-index: 11;
}
.select-menu-transition {
    opacity: 0;
    z-index: -1;
}
</style>
