<template>
  <div class="relative rounded-lg border border-gray-300 bg-white px-4 py-4 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
    <div class="flex-shrink-0">
      <img class="h-10 w-10 rounded-full" :src="getImage(member.img)" alt="">
    </div>
    <div class="flex-1 min-w-0">
      <a :href="mailToLink(member.email)" class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true"></span>
        <p class="text-sm font-medium text-gray-900">{{ member.name }}</p>
        <p class="text-sm text-gray-500 truncate">{{ member.email }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member: Object
  },
  methods: {
    mailToLink(email) {
      return `mailto:${email}`
    },
    getImage(imgName) {
      return require(`~/assets/img/${imgName}`)
    }
  }
}
</script>
