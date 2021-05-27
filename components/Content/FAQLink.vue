<template>
  <a class="font-bold text-blue-600 cursor-pointer hover:text-blue-500" @click.prevent="renderFaq()">
    read the FAQ
  </a>
</template>

<script>
export default {
  methods: {
    renderFaq() {
      this.$store.commit(`setProcess`, 'FAQ')
    }
  }
}

</script>
