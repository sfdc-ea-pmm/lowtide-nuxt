export const state = () => ({
  meta: {
    formErrors: [],
    showErrors: false
  },
  dataset: {},
  columns: [],
  interactions: []
})

export const mutations = {
  setDataset(state, data) {
    state.dataset = data
  },

  setColumns(state, data) {
    state.columns = data
  },

  setInteractions(state, data) {
    state.interactions = data
  },

  addFormError(state, value) {
    const { formErrors } = state.meta
    if (!formErrors.includes(value)) formErrors.push(value)
  },

  removeFormError(state, value) {
    const { formErrors } = state.meta
    const removeIndex = formErrors.indexOf(value)
    if (removeIndex > -1) formErrors.splice(removeIndex, 1)
  },

  showFormErrors(state) {
    state.meta.showErrors = true
  },

  resetErrors(state) {
    state.meta = {
      formErrors: [],
      showErrors: false
    }
  },
}
