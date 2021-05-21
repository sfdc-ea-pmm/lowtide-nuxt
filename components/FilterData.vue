<template>

    <div class="py-4">
        <input @keydown="filterTemplates()" v-model="filterValue" type="text" class="disabled:opacity-70 flex-grow flex-shrink shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md text-sm" placeholder="Filter value">
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
        }
    },
    computed: {
        filteredDeployTemplates () {
            return this.$store.state.filteredDeployTemplates;
        }
    },

    data() {
        return {
            filterValue: ''
        }
    },
    methods: {
        filterTemplates(){
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
                this.$store.commit(`setFilteredDeployTemplates` , filtered);
            }else{
                if(this.filterValue.length<=0)
                    this.$store.commit(`setFilteredDeployTemplates` , this.data);
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