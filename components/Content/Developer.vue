<template>
  <div>
    <div class="w-full flex items-center justify-between p-6 space-x-6 border-b">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="text-gray-900 text-sm font-medium truncate">{{dev.name}}</h3>
          <span class="flex-shrink-0 inline-block px-2 pt-0.5 pb-1 text-blue-800 text-xs font-medium bg-blue-100 rounded-full">Admin</span>
        </div>
        <p class="mt-1 text-gray-500 text-sm truncate">{{dev.position}}</p>
      </div>
      <img class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" :src="getImage(dev.img)" alt="">
    </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="w-0 flex-1 flex">
            <a :href="mailToLink(dev.email)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-xs text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
              <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span class="ml-3">Email</span>
            </a>
          </div>
          <div class="-ml-px w-0 flex-1 flex">
            <a target="_blank" :href="githubLink(dev.github)" class="relative w-0 flex-1 inline-flex items-center justify-center py-2 text-xs text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
              <img class="h-4 w-4" :src="getImage('github.png')" alt="">
              <span class="ml-3">Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    dev: Object
  },
  methods: {
    mailToLink(email) {
      return `mailto:${email}`
    },
    githubLink(username) {
      return `https://github.com/${username}`
    },
    getImage(imgName) {
      return require(`~/assets/img/${imgName}`)
    }
  }
}
</script>
