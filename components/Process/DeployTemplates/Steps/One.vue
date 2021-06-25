<template>
  <div>
    <div class="flex flex-row">
        <ProcessDeployTemplatesSearchInput ref="search" />
      <div class="flex justify-end items-center w-full">
        <ProcessDeployTemplatesBranchSwitch @changedBranch="setTemplates" />
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <div v-show="!isLoading" v-for="(template, i) in visibleTemplates" :key="template.api_name">
        <ProcessDeployTemplatesSelectCard :template="template" />
      </div>
      <AlertsLoadingCards v-show="isLoading" :cards="10" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  async fetch() {
    await this.setTemplates()
  },
  computed: {
    currentBranch() {
      return this.$store.state.session.deployBranch
    },
    betaTemplates() {
      return this.$store.state.deploy.betaTemplates
    },
    masterTemplates() {
      return this.$store.state.deploy.masterTemplates
    },
    visibleTemplates() {
      return this.$store.state.deploy.visibleTemplates
    },
    selectedTemplates() {
      return this.$store.state.deploy.selectedTemplates
    }
  },
  methods: {
    async setTemplates() {

      // if (this.selectedTemplates.length > 0)
      //   When user clicks "Previous," selections don't appear. Fix this.

      const requestOptions = { withCredentials: true }

      const emptyData = (
        (this.currentBranch === 'beta' && this.betaTemplates.length === 0) ||
        (this.currentBranch === 'master' && this.masterTemplates.length === 0)
      )

      if (emptyData) {
        try {
          this.isLoading = true
          const response = await this.$axios.get(`${process.env.API_URL}/data/repository`, requestOptions)
          const commitBody = { branch: this.currentBranch, data: response.data.data }
          this.$store.commit(`deploy/setTemplates`, commitBody)
        } catch (e) {
          console.error(e)
          // Notify
        } finally {
          this.isLoading = false
        }
      } else {
        this.$store.commit(`deploy/swapTemplates`, this.currentBranch)
      }

    }
  },
  watch: {
    selectedTemplates() {
      if (this.selectedTemplates.length)
        this.$store.commit(`nav/enableNext`)
      else
        this.$store.commit(`nav/disableNext`)
    }
  },
  mounted() {
    this.$store.commit(`nav/releaseNext`)
    this.$store.commit(`nav/disablePrevious`)
    this.$store.commit(`nav/disableNext`)
  }
}
</script>
