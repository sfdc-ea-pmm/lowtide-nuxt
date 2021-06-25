<template>
  <div class="mt-1 relative rounded-md shadow-sm">
    <input v-model="value" @input="update" type="number" :name="name" :class="(valid.status ? 'font-semibold text-blue-700' : '') + ' focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    placeholder: String,
    validation: Function
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    valid() {
      const status = this.validation()
      return { status, action: status ? 'removeFormError' : 'addFormError' }
    }
  },
  methods: {
    update() {
      this.$emit('input', this.value)
      this.$store.commit(`edd/${this.valid.action}`, this.name)
    }
  },
  mounted() {
    this.$store.commit(`edd/addFormError`, this.name)
  }
}
</script>
