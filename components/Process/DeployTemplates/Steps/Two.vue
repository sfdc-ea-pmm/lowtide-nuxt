<template>

  <div>
    <div class="flex flex-col space-y-4">
      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide py-1">
        Confirm Template Selection
      </h2>
      <!-- Notice about size -->
      <AlertsWarning v-show="selectedTemplates.length > 1" title="Deploy Size Limitations" message="If many templates are selected at once, there's a possibility that the deploy package size will exceed the limit allowed my Salesforce. If deploying more than 5 templates at a time, please do so in batches." />
      <!-- Notice if all deleted -->
      <AlertsNoSelection v-show="selectedTemplates.length < 1" message="No templates selected!" />
    </div>
    <div class="flex flex-col space-y-2">
      <div v-for="(template, i) in selectedTemplates" :key="template.api_name" class="deploy-card">
        <ProcessDeployTemplatesConfirmCard :template="template" />
      </div>
    </div>
    <div class="p-4">
      <ProcessDeployTemplatesConfirmButton />
    </div>
  </div>

</template>

<script>
export default {
  computed: {
    selectedTemplates() {
      return this.$store.state.deployTemplates.selectedTemplates
    }
  },
  mounted() {
    this.$store.commit(`disableNext`)
  }
}
</script>
