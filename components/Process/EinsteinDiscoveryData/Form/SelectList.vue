<template>
  <div class="mt-1">
    <select v-model="value" @change="update" :name="name" :class="(valid.status ? 'font-semibold text-blue-700' : '') + ' focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md'">
      <option :value="null">{{ placeholder }}</option>
      <option v-for="v in options" v-bind:key="v" :value="v">{{v}}</option>
      <option v-if="!options" value="Binary">Binary</option>
      <option v-if="!options" value="Continuous">Continuous</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    placeholder: String,
    validation: Function,
    options: Array
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
      this.$store.commit(this.valid.action, this.name)
    }
  },
  mounted() {
    this.$store.commit(`addFormError`, this.name)
  }
}
</script>
