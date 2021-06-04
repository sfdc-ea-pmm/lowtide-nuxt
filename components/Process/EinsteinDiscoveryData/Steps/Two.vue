<template>
    <div>
        <div class="pb-8">
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Actions</h2>
            <button
                @click="addRow()"
                type="button"
                :class="'disabled:opacity-70 inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm text-sm leading-4 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add a Column
            </button>
        </div>
        <div>
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Columns</h2>
            <div class="space-y-6">
                <div class="border rounded-lg p-4" v-for="(v, i) in this.columnData" v-bind:key="v.id">
                    <div class="flex flex-row flex-wrap space-x-4 mb-4">
                        <div class="w-72">
                            <ProcessEinsteinDiscoveryDataFormInputWrapper
                                v-model="v.title"
                                componentName="ProcessEinsteinDiscoveryDataFormTextInput"
                                name="titleTwo"
                                label="Title"
                                placeholder="My Einstein Discovery Dataset"
                                note="Column name."
                                errorMessage="Don't leave blank spaces."
                            />
                        </div>
                        <div class="w-64">
                            <ProcessEinsteinDiscoveryDataFormInputWrapper
                                :options="['Categorical', 'Continuous']"
                                v-model="v.type"
                                componentName="ProcessEinsteinDiscoveryDataFormSelectList"
                                name="typeTwo"
                                label="Type"
                                placeholder="Select Output Type..."
                                note="Categorical or Continuous"
                                errorMessage="Oops!"
                            />
                        </div>
                        <div v-if="i>0" class="mt-6">
                            <button
                                @click="deleteRow(i)"
                                type="button"
                                class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-row flex-wrap">
                        <div v-show="v.type==='Continuous'" class="w-28 mr-4">
                            <ProcessEinsteinDiscoveryDataFormInputWrapper
                                v-model="v.mean"
                                componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                                name="cmeanTwo"
                                label="Mean"
                                placeholder="100"
                                note="Any number."
                                errorMessage="Enter a value."
                            />
                        </div>
                        <div v-show="v.type==='Continuous'" class="w-32 mr-4">
                            <ProcessEinsteinDiscoveryDataFormInputWrapper
                                v-model="v.cStdDev"
                                componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                                name="cstddevTwo"
                                label="Standard Deviation"
                                placeholder="15"
                                note="Greater than zero."
                                errorMessage="Oops!"
                            />
                        </div>
                        <div v-show="v.type==='Categorical'" class="w-32 mr-4">
                            <ProcessEinsteinDiscoveryDataFormInputWrapper
                                v-model="v.noise"
                                componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                                name="noiseTwo"
                                label="Noise Coefficient"
                                placeholder="25"
                                note="1-100"
                                errorMessage="Oops!"
                            />
                        </div>
                        <div class="mr-4 mt-6" v-show="v.type==='Categorical'">
                            <button
                                @click="addValue(i)"
                                type="button"
                                class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    New value
                            </button>
                        </div>
                    </div>
                    <h2 v-show="v.type==='Categorical'" class="text-gray-500 text-xs font-medium uppercase tracking-wide mt-4 mb-2">Values</h2>
                    <div v-show="v.type==='Categorical'" class="flex flex-col flex-wrap space-y-4">
                        <div v-if="v.values.length<=0" class="text-xs text-gray-700">Create a new value.</div>
                        <div class="flex flex-row flex-wrap" v-for="(va, ia) in v.values" v-bind:key="va.id">
                            <div class="w-72 mr-4">
                                <ProcessEinsteinDiscoveryDataFormInputWrapper
                                    v-model="va.label"
                                    componentName="ProcessEinsteinDiscoveryDataFormTextInput"
                                    name="titleTwo"
                                    label="Label"
                                    placeholder="My Einstein Discovery Dataset"
                                    note="Column name."
                                    errorMessage="Don't leave blank spaces."
                                />
                            </div>
                            <div class="w-40 mr-4">
                                <ProcessEinsteinDiscoveryDataFormInputWrapper
                                    v-model="va.proportion"
                                    componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                                    name="proportionTwo"
                                    label="Proportion"
                                    placeholder="n < 100"
                                    note="The SUM of proportions must be lower than 100."
                                    errorMessage="Oops!"
                                />
                            </div>
                            <div v-if="ia>0" class="mt-6">
                                <button
                                    @click="deleteValue(i, ia)"
                                    type="button"
                                    class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { nanoid } from 'nanoid'
export default {
    data() {
      return {
        columnData: [
            { id: nanoid(10), title: "", type: "", mean: 0, cStdDev: 0, noise: 0, values: [{id: nanoid(10), label: "", proportion: 0}] }
        ]
      }
    },
    computed:{
        toastStatus () {
            return this.$store.state.toastStatus;
        },
        notifications () {
            return this.$store.state.notifications;
        },
    },
    methods: {
        deleteRow(index){
            this.columnData = this.columnData.filter((v, i) => index!==i);
        },
        addRow(){
            this.columnData.push({ id: nanoid(10), title: "", type: "", mean: 0, cStdDev: 0, noise: 0, values: [] });
        },
        validateForm() {
            this.$store.commit(`showFormErrors`)
        },
        addValue(index) {
            this.columnData[index].values.push({id: nanoid(10), label: "", proportion: 0});
        },
        deleteValue(indexParent, index) {
            this.columnData[indexParent].values = this.columnData[indexParent].values.filter((v, i) => {console.log(v, i, index!==i);return index!==i});
        },
    },
    created() {
        this.$store.commit('resetForm')
    },
    mounted() {
        this.$store.commit('catchNext')
        $nuxt.$on('clickedNext', this.validateForm)
    }
}
</script>
