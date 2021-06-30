<template>
  <div>
    <div class="pb-8">
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Actions</h2>
        <button
            @click="addInteraction"
            type="button"
            class="disabled:opacity-70 inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm text-sm leading-4 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add an Interaction
        </button>
    </div>
    <div>
        <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Interactions</h2>
        <div class="space-y-6">
            <div class="border rounded-lg p-4" v-for="(interaction, index) in interactions" :key="interaction.id">

                <div class="flex flex-row flex-wrap space-x-4 mb-4">

                    <div class="flex-grow">
                      <ProcessEinsteinDiscoveryDataFormInputWrapper
                          :options="columns"
                          v-model="interaction.lhs.column"
                          componentName="ProcessEinsteinDiscoveryDataFormSelectObject"
                          name="typeTwo"
                          label="Column 1"
                          placeholder="Select Column..."
                          note=""
                          errorMessage="Oops!"
                      />
                      <div v-if="interaction.lhs.column.type === 'Categorical'">
                        <ProcessEinsteinDiscoveryDataFormInputWrapper
                            :options="interaction.lhs.column.categories"
                            v-model="interaction.lhs.category"
                            componentName="ProcessEinsteinDiscoveryDataFormSelectObject"
                            name="typeTwo"
                            label="Category"
                            placeholder="Select Category..."
                            note=""
                            errorMessage="Oops!"
                        />
                      </div>
                    </div>

                    <div class="flex items-center px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    <div class="flex-grow">
                        <ProcessEinsteinDiscoveryDataFormInputWrapper
                            :options="columns"
                            v-model="interaction.rhs.column"
                            componentName="ProcessEinsteinDiscoveryDataFormSelectObject"
                            name="typeTwo"
                            label="Column 2"
                            placeholder="Select Column..."
                            note=""
                            errorMessage="Oops!"
                        />
                        <div v-if="interaction.rhs.column.type === 'Categorical'">
                          <ProcessEinsteinDiscoveryDataFormInputWrapper
                              :options="interaction.rhs.column.categories"
                              v-model="interaction.rhs.category"
                              componentName="ProcessEinsteinDiscoveryDataFormSelectObject"
                              name="typeTwo"
                              label="Category"
                              placeholder="Select Category..."
                              note=""
                              errorMessage="Oops!"
                          />
                        </div>
                    </div>

                    <div class="w-32">
                      <ProcessEinsteinDiscoveryDataFormInputWrapper
                          v-model="interaction.coefficient"
                          componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                          name="coefficientTwo"
                          label="Coefficient"
                          placeholder="25"
                          note="1-100"
                          errorMessage="Oops!"
                      />
                    </div>

                    <div class="mt-6">
                        <button
                            @click="removeInteraction(interaction.id)"
                            type="button"
                            class="disabled:opacity-70 inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm text-sm leading-4 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
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
      interactions: []
    }
  },
  computed: {
    columns() {
      return this.$store.state.edd.columns
    }
  },
  methods: {

    addInteraction() {
      this.interactions.push({
        id: nanoid(10),
        lhs: {
          column: '',
          category: ''
        },
        rhs: {
          column: '',
          category: ''
        },
        coefficient: 0
      })
    },

    removeInteraction(interactionId) {
      const interactionIndex = this.interactions.findIndex(d => d.id === interactionId)
      if (interactionIndex !== -1)
        this.interactions.splice(interactionIndex, 1)
    },

    validateForm() {
      this.$store.commit(`edd/setInteractions`, this.interactions)
      this.$store.commit(`nav/stepNext`)
    }

  },
  created() {
    this.$store.commit(`edd/resetErrors`)
  },
  mounted() {
    this.$store.commit(`nav/catchNext`)
    $nuxt.$on(`clickedNext`, this.validateForm)
  }

}
</script>
