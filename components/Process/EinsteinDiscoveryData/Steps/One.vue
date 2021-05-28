<template>

  <div class="mt-8 flex justify-center">
    <div class="max-w-lg">

      <form class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200">

          <div>

            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Dataset Information
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Please fill out the following fields to set the parameters of the data to be generated.
              </p>
            </div>

            <div class="mt-8 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-6">

              <div class="sm:col-span-6">
                <ProcessEinsteinDiscoveryDataFormInputWrapper
                  v-model="title"
                  componentName="ProcessEinsteinDiscoveryDataFormTextInput"
                  name="title"
                  label="Title"
                  placeholder="My Einstein Discovery Dataset"
                  note="Letters, numbers, and spaces only."
                  errorMessage="Please only enter letters, numbers and spaces, up to 65 characters!"
                />
              </div>

              <div class="sm:col-span-6">
                <div class="flex flex-row space-x-6">
                  <div>
                    <ProcessEinsteinDiscoveryDataFormInputWrapper
                      v-model="rows"
                      componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                      name="rows"
                      label="Row Count"
                      placeholder="1000"
                      note="100-10,000"
                      errorMessage="Oops!"
                    />
                  </div>
                  <div>
                    <ProcessEinsteinDiscoveryDataFormInputWrapper
                      v-model="noise"
                      componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                      name="noise"
                      label="Noise Coefficient"
                      placeholder="25"
                      note="1-100"
                      errorMessage="Oops!"
                    />
                  </div>
                </div>
              </div>

              <div class="sm:col-span-6">
                <ProcessEinsteinDiscoveryDataFormInputWrapper
                  v-model="outputType"
                  componentName="ProcessEinsteinDiscoveryDataFormSelectList"
                  name="type"
                  label="Output Type"
                  placeholder="Select Output Type..."
                  note="Binary or Continuous (Mean + Std. Dev.)"
                  errorMessage="Oops!"
                />
              </div>

              <div v-if="isContinuous" class="sm:col-span-6">
                <div class="flex flex-row space-x-6">
                  <div>
                    <ProcessEinsteinDiscoveryDataFormInputWrapper
                      v-model="cMean"
                      componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                      name="cmean"
                      label="Distribution Mean"
                      placeholder="100"
                      note="Any number you like!"
                      errorMessage="Oops!"
                    />
                  </div>
                  <div>
                    <ProcessEinsteinDiscoveryDataFormInputWrapper
                      v-model="cStdDev"
                      componentName="ProcessEinsteinDiscoveryDataFormNumberInput"
                      name="cstddev"
                      label="Standard Deviation"
                      placeholder="15"
                      note="Greater than zero."
                      errorMessage="Oops!"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </form>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      title: '',
      rows: 0,
      noise: 0,
      outputType: '',
      cMean: 0,
      cStdDev: 0
    }
  },
  computed: {
    isContinuous() {
      return this.outputType === 'Continuous'
    },
    einsteinDiscoveryData () {
      return this.$store.state.einsteinDiscoveryData;
    },
  },
  methods: {
    validateForm() {

      this.$store.commit(`showFormErrors`)

      // if none, commit stepNext
      if(this.einsteinDiscoveryData.meta.formErrors.length<=0)
        this.$store.commit('stepNext')
      // this.$store.commit('stepNext')


    }
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
