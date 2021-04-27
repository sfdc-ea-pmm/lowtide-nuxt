<template>
    <div  :style="{ backgroundImage: `url(${backgroundUrl})` }" class="compatibility h-screen bg-center bg-no-repeat bg-cover flex justify-center items-center flex-col">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="text-justify text-3xl md:text-4xl px-10 py-2 text-white font-bold">Sorry!</div>
        <div class="text-justify text-xl md:text-2xl px-10 py-2 mt-2 text-white font-normal">This application is not available on your device.</div>
    </div>
</template>

<script>
import backgroundUrl from '~/assets/img/compatibility-background.png';
export default {

    computed: {
        
    },

    data() {
        return {
            backgroundUrl,

        }
    },
    methods: {
        
    },
    beforeCreate: function() {
        
    },
    mounted: function () {
        
    },
}
</script>

<style>
    .compatibility{
        
    }
</style>