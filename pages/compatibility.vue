<template>
    <div  :style="{ backgroundImage: `url(${backgroundUrl})` }" class="compatibility h-screen bg-center bg-no-repeat bg-cover flex justify-center items-center flex-col">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="text-justify text-3xl md:text-4xl px-10 py-2 text-white font-bold">Sorry!</div>
        <div class="text-justify text-xl md:text-2xl px-10 py-2 md:mt-2 text-white font-normal">This application was optimized for use on a tablet, laptop, or desktop computer.</div>
        <div class="flex flex-row mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 h-10 w-10 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 h-10 w-10 md:h-16 md:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </div>
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
