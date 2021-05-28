<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div>
      <Component
        :is="componentName"
        v-model="value"
        @input="update"
        :name="name"
        :placeholder="placeholder"
        :validation="validationFunctions[name]"
      />
      <p :class="(showError ? 'text-red-600 font-semibold' : '') + ' mt-2 ml-1 text-xs text-gray-500'">{{ note }}</p>
    </div>
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
          return String(this.value).match(validRegex) && this.value !== null
        },
        rows: () => (this.value >= 100 && this.value <= 10000),
        noise: () => (this.value >= 1 && this.value <= 100),
        type: () => (this.value !== null && this.value !== ''),
        cmean: () => (this.value !== null && this.value !== ''),
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
