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
      <!-- Notice if deploy error -->
      <AlertsError v-show="deployError !== ''" title="Deploy Error" :message="deployError" />
    </div>
    <div class="flex flex-col space-y-2">
      <div v-for="(template, i) in selectedTemplates" :key="template.api_name" class="deploy-card">
        <ProcessDeployTemplatesConfirmCard :template="template" :editable="!deployStarted" />
      </div>
    </div>
    <div class="p-4">
      <ProcessDeployTemplatesConfirmButton @deployQueued="disableModification" />
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      deployStarted: false
    }
  },
  computed: {
    selectedTemplates() {
      return this.$store.state.deploy.selectedTemplates
    },
    deployError() {
      return this.$store.state.deploy.deployError
    }
  },
  methods: {
    disableModification() {
      this.deployStarted = true
    }
  },
  mounted() {
    this.$store.commit(`deploy/clearDeployError`)
    this.$store.commit(`nav/disableNext`)
  }
}
</script>
