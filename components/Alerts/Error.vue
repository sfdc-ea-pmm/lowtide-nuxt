<template>

  <div>
    <div class="flex rounded px-4 pt-3 pb-4 bg-red-100 shadow">
      <div class="flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          {{ this.title }}
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <p>
            {{ this.message }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

export default {
  props: {
    title: String,
    message: String
  }
}

</script>
