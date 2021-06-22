<template>
    <div class="space-y-6">
      <ProcessUploadCsv />
      <ContentAbout />
      <div>
        <h2 class="text-sm font-medium text-gray-500 mb-4">Developers</h2>
        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <div v-for="d in developers" :key="d.email" class="bg-white rounded-lg shadow divide-y divide-gray-200 border-t">
            <ContentDeveloper :dev="d" />
          </div>
        </ul>
      </div>
      <div class="">
          <h2 class="text-sm font-medium text-gray-500 mb-4">Team Members</h2>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div v-for="m in members" :key="m.email">
                <ContentMember :member="m" />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    developers() {
      return this.$store.state.team.developers
    },
    members() {
      return this.$store.state.team.members
    }
  },
  methods: {
    renderFaq() {
      this.$store.commit(`setProcess` , 'FAQ')
    }
  }
}
</script>
