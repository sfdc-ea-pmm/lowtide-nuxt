<template>
    <div class="fixed top-4 right-0 min-w-full">
        <transition-group name="toast" tag="div">
            <div v-for="(v, i) in this.toastStatus" v-bind:key="v.time" aria-live="assertive" :class="'flex items-end justify-end px-4 py-2 sticky top-0'">
                <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 self-center">
                                <svg v-show="v.type==='success'" class="h-7 w-7 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <svg v-show="v.type==='info'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <svg v-show="v.type==='error'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-3 w-0 flex-1">
                                <p class="text-sm text-gray-900 flex justify-between">
                                    <span class="font-medium capitalize">{{v.type}}</span>
                                    <span class=" text-gray-500">{{v.time}}</span>
                                </p>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{v.message}}
                                </p>
                            </div>
                            <div class="ml-4 flex-shrink-0 flex">
                                <button @click="toastClose(i)" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span class="sr-only">Close</span>
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
  computed: {
    toastStatus () {
      return this.$store.state.toastStatus;
    }
  },
  methods: {
    toastClose(index){
      this.$store.commit(`setToastStatus` , this.toastStatus.filter((v, i) => i===index ? false : true));
    },
  }
}
</script>

<style>
.toast-enter-active, .toast-leave-active{
  transition: all 0.5s;
}
.toast-enter, .toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
