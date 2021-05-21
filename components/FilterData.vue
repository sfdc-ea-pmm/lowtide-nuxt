<template>
    <div class="flex flex-col">
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Filters</h2>
        <div class="pt-2 pb-4">
            <input v-model="filterValue" type="text" class="disabled:opacity-70 flex-grow flex-shrink shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md text-sm w-72" placeholder="Filter value">
        </div>
    </div>
        
</template>

<script>
export default {
    props: {
        data: {
            type: Array
        },
        fields: {
            type: Array
        },
        mutator: {
            type: String
        }
    },
    computed: {
        
    },

    data() {
        return {
            filterValue: ''
        }
    },
    methods: {

    },
    watch: {
        filterValue: function () {
            if(this.filterValue.length>0){
                const filtered = this.data.filter((v, i) => {
                    let status = false;
                    this.fields.forEach(va => {
                        if(va in v){
                            if(Array.isArray(v[va])){
                                v[va].forEach(vb => {
                                    if(vb.toLowerCase().includes(this.filterValue.toLowerCase()))
                                        status = true;
                                });
                            }else{
                                if(v[va].toLowerCase().includes(this.filterValue.toLowerCase()))
                                    status = true;
                            }
                        }
                    });
                    return status;
                });
                this.$store.commit(this.mutator , filtered);
            }else{
                if(this.filterValue.length<=0)
                    this.$store.commit(this.mutator , this.data);
            }
        }
    },
    created() {
        
    },
    beforeDestroy() {
        
    },
}
</script>

<style>
    
</style>