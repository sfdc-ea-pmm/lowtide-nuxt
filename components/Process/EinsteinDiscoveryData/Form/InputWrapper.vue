<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div>
      <Component :is="componentName" v-model="value" @input="update" :name="name" :placeholder="placeholder" :validation="validationFunctions[name]" />
      <p class="mt-2 ml-1 text-xs text-gray-500">{{ note }}</p>
    </div>
    <p v-show="showError" class="mt-1 ml-1 text-sm text-red-600" id="input-error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    componentName: String,
    name: String,
    label: String,
    placeholder: String,
    note: String,
    errorMessage: String,
    validation: Function
  },
  data() {
    return {
      value: null,
      validationFunctions: {
        title: () => {
          const validRegex = /^[ a-zA-Z0-9]{3,65}$/
          return String(this.value).match(validRegex)
        },
        rows: () => (this.value >= 100 && this.value <= 10000),
        noise: () => (this.value >= 1 && this.value <= 100),
        type: () => (this.value !== null || this.value !== ''),
        cmean: () => (this.value !== null),
        cstddev: () => (this.value !== null && this.value >= 1)
      }
    }
  },
  computed: {
    showError() {
      const { showErrors, formErrors } = this.$store.state.einsteinDiscoveryData.meta
      return (showErrors && formErrors.includes(this.name))
    }
  },
  methods: {
    update() {
      this.$emit('input', this.value)
    },
  }
}
</script>
