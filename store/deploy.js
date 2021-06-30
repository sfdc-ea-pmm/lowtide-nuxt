export const state = () => ({
  searchTerm: '',
  filterFields: [
    'label',
    'description',
    'dashboards',
    'datasets',
    'tags'
  ],
  betaTemplates: [],
  masterTemplates: [],
  allTemplates: [],
  visibleTemplates: [],
  selectedTemplates: [],
  deployError: ''
})

export const mutations = {
  setSearchTerm(state, term) {
    state.searchTerm = term
  },

  setTemplates(state, { branch, data }) {
    if (branch === 'beta')
      state.betaTemplates = data
    else
      state.masterTemplates = data

    state.allTemplates = data
    state.visibleTemplates = data
    state.selectedTemplates = []
    state.searchTerm = ''
  },

  swapTemplates(state, branch) {

    let data;

    if (branch === 'beta')
      data = state.betaTemplates
    else
      data = state.masterTemplates

    state.allTemplates = data
    state.visibleTemplates = data
    state.selectedTemplates = []
    state.searchTerm = ''

  },

  setVisibleTemplates(state, searchTerm) {

    const lcTerm = searchTerm.toLowerCase()

    const filteredTemplates = state.allTemplates
      .filter(template => {
        let found = false
        for (const field of state.filterFields) {
          if (field in template) {
            if (Array.isArray(template[field])) {
              const lcArray = template[field].map(d => d.toLowerCase())
              for (const item of lcArray) {
                if (item.includes(lcTerm)) {
                  found = true
                  break
                }
              }
              if (found === true)
                break
            } else {
              if (template[field].toLowerCase().includes(lcTerm)) {
                found = true
                break
              }
            }
          }
        } return found
      })

    state.visibleTemplates = filteredTemplates

  },

  setAllTemplatesVisible(state) {
    state.visibleTemplates = state.allTemplates
  },

  selectTemplate(state, template) {
    state.selectedTemplates.push(template)
  },

  deselectTemplate(state, template) {
    const ti = state.selectedTemplates.indexOf(template)
    if (ti !== -1)
      state.selectedTemplates.splice(ti, 1)
  },

  setDeployError(state, message) {
    state.deployError = message
  },

  clearDeployError(state) {
    state.deployError = ''
  },
  
}
