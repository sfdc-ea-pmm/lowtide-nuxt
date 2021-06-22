<template>
    <div>
        <div class="pb-8">
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">Actions</h2>
            <button
                @click="addColumn"
                type="button"
                class="disabled:opacity-70 inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm text-sm leading-4 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                <div class="border rounded-lg p-4" v-for="(column, colIndex) in columns" :key="column.id">
                    <div class="flex flex-row flex-wrap space-x-4 mb-4">
                        <div class="w-72">
                          <ProcessEinsteinDiscoveryDataFormInputWrapper
                              v-model="column.title"
                              componentName="ProcessEinsteinDiscoveryDataFormTextInput"
                              name="titleTwo"
                              label="Title"
                              placeholder="MyColumnName"
                              note="Column name, no spaces."
                              errorMessage="No blank spaces!"
                          />
                        </div>
                        <div class="w-64">
                            <ProcessEinsteinDiscoveryDataFormInputWrapper
                                :options="colTypes"
                                v-model="column.type"
                                componentName="ProcessEinsteinDiscoveryDataFormSelectList"
                                name="typeTwo"
                                label="Type"
                                placeholder="Select Column Type..."
                                note="Categorical or Continuous"
                                errorMessage="Oops!"
                            />
                        </div>
                        <div v-if="colIndex > 0" class="mt-6">
                            <button
                                @click="removeColumn(column.id)"
                                type="button"
                                class="disabled:opacity-70 inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm text-sm leading-4 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </button>
                        </div>
                    </div>

                    <div v-show="column.type === 'Continuous'" class="flex flex-row flex-wrap">
                      <div class="w-28 mr-4">
                        <ProcessEinsteinDiscoveryDataFormInputWrapper
                            v-model="column.mean"
                            componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                            name="cmeanTwo"
                            label="Mean"
                            placeholder="100"
                            note="Any number."
                            errorMessage="Enter a value."
                        />
                      </div>
                      <div class="w-32 mr-4">
                        <ProcessEinsteinDiscoveryDataFormInputWrapper
                            v-model="column.cStdDev"
                            componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                            name="cstddevTwo"
                            label="Standard Deviation"
                            placeholder="15"
                            note="Greater than zero."
                            errorMessage="Oops!"
                        />
                      </div>
                    </div>

                    <h2 v-show="column.type === 'Categorical'" class="text-gray-500 text-xs font-medium uppercase tracking-wide mt-4 mb-2">Categories</h2>
                    <div v-show="column.type === 'Categorical'" class="flex flex-col flex-wrap space-y-4">
                        <AlertsInformation message="Proportions are summed and then values are distributed according to the contribution to that sum, ie. if all proportions are the same, you can expect a flat distribution of values (with some noise, defined in the previous step)." />
                        <ProcessEinsteinDiscoveryDataDistribution :categories="column.categories" />
                        <div v-if="column.categories.length < 1" class="text-xs text-gray-700">Create a new Category!</div>
                        <div class="flex flex-row flex-wrap" v-for="(category, catIndex) in column.categories" :key="category.id">
                            <div class="w-72 mr-4">
                                <ProcessEinsteinDiscoveryDataFormInputWrapper
                                    v-model="category.label"
                                    componentName="ProcessEinsteinDiscoveryDataFormTextInput"
                                    name="titleTwo"
                                    label="Label"
                                    placeholder="Some Value"
                                    note="Category Value"
                                    errorMessage="Don't leave blank spaces."
                                />
                            </div>
                            <div class="w-40 mr-4">
                                <ProcessEinsteinDiscoveryDataFormInputWrapper
                                    v-model="category.proportion"
                                    componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                                    name="proportionTwo"
                                    :label="'Proportion ' + getPct(column, category)"
                                    placeholder="10"
                                    note="Positive Number"
                                    errorMessage="Oops!"
                                />
                            </div>
                            <div class="w-32 mr-4">
                                <ProcessEinsteinDiscoveryDataFormInputWrapper
                                    v-model="category.coefficient"
                                    componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                                    name="coefficientTwo"
                                    label="Coefficient"
                                    placeholder="25"
                                    note="1-100"
                                    errorMessage="Oops!"
                                />
                            </div>
                            <div v-if="catIndex !== 0" class="mt-6">
                                <button
                                    @click="removeCategory(column.id, category.id)"
                                    type="button"
                                    class="disabled:opacity-70 inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm text-sm leading-4 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
                            </div>
                        </div>
                        <div class="mr-4" v-show="column.type === 'Categorical'">
                            <button
                                @click="addCategory(column.id)"
                                type="button"
                                class="disabled:opacity-70 inline-flex items-center px-2.5 py-2 border border-gray-300 shadow-sm text-sm leading-4 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                                Add a Category
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
      colTypes: ['Categorical', 'Continuous'],
      columns: []
    }
  },

  methods: {

    addColumn() {
      this.columns.push({
        id: nanoid(10),
        title: '',
        type: '',
        mean: 0,
        cStdDev: 0,
        categories: []
      })
    },

    removeColumn(columnId) {
      const columnIndex = this.columns.findIndex(d => d.id === columnId)
      if (columnIndex !== -1)
        this.columns.splice(columnIndex, 1)
    },

    addCategory(columnId) {

      const columnIndex = this.columns.findIndex(d => d.id === columnId)

      if (columnIndex !== -1) {

        const col = this.columns[columnIndex]

        col.categories.push({
          id: nanoid(10),
          label: '',
          proportion: 0,
          coefficient: 0
        })

      }

    },

    removeCategory(columnId, categoryId) {
      const columnIndex = this.columns.findIndex(d => d.id === columnId)
      if (columnIndex !== -1) {
        const col = this.columns[columnIndex]
        const categoryIndex = col.categories.findIndex(d => d.id === categoryId)
        if (categoryIndex !== -1)
          col.categories.splice(categoryIndex, 1)
      }
    },

    getPct(column, category) {

      if (!category.proportion)
        return ''

      const total = column.categories.reduce((a, b) => {
        return a + Number(b.proportion)
      }, 0)

      return `(~${(100 * (category.proportion / total)).toFixed(2)}%)`

    },

    validateForm() {

      // Leave for Luc

    }


  },
  created() {
    this.$store.commit(`resetForm`)
  },
  mounted() {
    this.addColumn()
    this.$store.commit(`catchNext`)
    $nuxt.$on(`clickedNext`, this.validateForm)
  }
}
</script>
