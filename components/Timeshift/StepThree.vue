<template>

    <div>
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide py-1">Generate Dataflows</h2>
        <div class="my-4">

        </div>
    </div>

</template>

<script>
export default {
  computed: {
    confirmTimeshiftSelection () {
      return this.$store.state.confirmTimeshiftSelection
    }
  }
}
</script>
