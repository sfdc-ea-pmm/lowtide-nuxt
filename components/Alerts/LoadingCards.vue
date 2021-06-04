<template>
    <div>
        <div v-for="index in this.cards" v-bind:key="index" class="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md truncate py-1.5 mb-4 loading-card">
            <div class="flex-1 px-4 py-2 text-sm truncate flex items-center">
                <span class="w-10 h-5 rounded-md mr-4"></span>
                <span class="w-64 h-5 rounded-md"></span>
                <span class="w-6 h-5 rounded-md ml-auto"></span>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  props: {
    cards: Number
  }
}
</script>

<style>

</style>
