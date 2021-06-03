<template>
  <div class="rounded-md bg-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm text-blue-700 font-semibold">
          {{ message }}
        </p>
        <p class="mt-3 text-sm md:mt-0 md:ml-6">
          <span @click.prevent="stepBack" class="cursor-pointer whitespace-nowrap font-medium text-blue-700 hover:text-blue-500">
            Previous
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  methods: {
    stepBack() {
      this.$store.commit(`stepPrev`)
    }
  }
}
</script>
