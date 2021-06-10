import { nanoid } from 'nanoid'

export default {
    setAction(state, action) {
        state.action = action;
    },
    setNotificationFieldFilter(state, field) {
        state.notificationFieldFilter = field;
    },
    setCurrentStep(state, step) {
        state.currentStep = step;
    },
    setToastStatus(state, status) {
        state.toastStatus = status;
    },
    setModalStatus(state, status) {
        state.modalStatus = status;
    },
    setSelectedDeploy(state, object) {
        state.selectedDeploy = object;
    },
    setConfirmDeploySelection(state, array) {
        state.confirmDeploySelection = array;
    },
    setSelectedTimeshift(state, object) {
        state.selectedTimeshift = object;
    },

    setConfirmTimeshiftSelection(state, array) {
        state.confirmTimeshiftSelection = array;
    },
    setIsFetching(state) {
      state.confirmTimeshiftSelection.forEach(d => {
        d.dateFields.forEach(dd => {
          if (dd.isSelected)
            dd.isFetching = true
        })
      })
    },
    toggleSelected(state, params) {
      state.confirmTimeshiftSelection.forEach(d => {
        d.dateFields.forEach(dd => {
          if (dd.fieldApiName === params.fieldApiName && d.id === params.datasetId)
            dd.isSelected = !dd.isSelected
        })
      })
    },
    applyDates(state, dateArray) {
      state.confirmTimeshiftSelection.forEach(d => {
        d.dateFields.forEach(dd => {
          dateArray.forEach(result => {
            if (result.datasetId === d.id && result.fieldApiName === dd.fieldApiName) {
              dd.foundDate = result.latestDate
              dd.isFetching = false
            }
          })
        })
      })
    },

    setFinishedProcess(state, status) {
        state.finishedProcess = status;
    },
    setSession(state, status) {
        state.session = status;
    },
    setNotifications(state, notifications) {
      sessionStorage.notifications = JSON.stringify(notifications);
      state.notifications = notifications;
    },
    clearNotifications(state) {
      sessionStorage.notifications = null;
      state.notifications = [];
    },
    setNotificationsViewed(state, status) {
        sessionStorage.notificationsViewed = status;
        state.notificationsViewed = status;
    },
    setBtnNextDisabled(state, status) {
      state.btnNextDisabled = status;
    },
    setFilteredDeployTemplates(state, array) {
      state.filteredDeployTemplates = array;
    },



    /* Session */

    setDeployBranch(state, value) {
      state.session.deployBranch = value
    },

    /* Process Component */

    setProcess(state, value) {

      const isFaq = value === 'FAQ',
            isHome = value === 'Home';

      state.process.stepIndex = 0
      state.process.showHome = isFaq ? true : false;
      state.process.showButtons = (!isHome && !isFaq) ? true : false;
      state.process.selected = value

      if (isFaq || isHome) return;

      const relatedProcess = state.process.options.filter(d => d.value === value).pop()
      state.process.lastStepIndex = relatedProcess.steps - 1

    },

    stepPrev(state) {
      state.process.stepIndex -= 1
      if (state.process.stepIndex === 0)
        state.process.buttons.previous = false
    },

    stepNext(state) {
      state.process.stepIndex += 1
    },

    disablePrevious(state) {
      state.process.buttons.previous = false
    },

    enablePrevious(state) {
      state.process.buttons.previous = true
    },

    catchNext(state) {
      state.process.validNext = false
    },

    releaseNext(state) {
      state.process.validNext = true
    },

    disableNext(state) {
      state.process.buttons.next = false
    },

    enableNext(state) {
      state.process.buttons.next = true
    },

    /* Modal & Notifications */

    toggleModal(state) {
      state.modal.visible = !state.modal.visible
      state.modal.unread = false
    },

    setFieldFilter(state, value) {
      state.modal.fieldFilter = value
    },


    /* Deploy Templates */

    setSearchTerm(state, term) {
      state.deployTemplates.searchTerm = term
    },

    setTemplates(state, { branch, data }) {
      if (branch === 'beta')
        state.deployTemplates.betaTemplates = data
      else
        state.deployTemplates.masterTemplates = data

      state.deployTemplates.allTemplates = data
      state.deployTemplates.visibleTemplates = data
      state.deployTemplates.selectedTemplates = []
      state.deployTemplates.searchTerm = ''
    },

    swapTemplates(state, branch) {

      let data;

      if (branch === 'beta')
        data = state.deployTemplates.betaTemplates
      else
        data = state.deployTemplates.masterTemplates

      state.deployTemplates.allTemplates = data
      state.deployTemplates.visibleTemplates = data
      state.deployTemplates.selectedTemplates = []
      state.deployTemplates.searchTerm = ''

    },

    setVisibleTemplates(state, searchTerm) {

      const lcTerm = searchTerm.toLowerCase()

      const filteredTemplates = state.deployTemplates.allTemplates
        .filter(template => {
          let found = false
          for (const field of state.deployTemplates.filterFields) {
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

      state.deployTemplates.visibleTemplates = filteredTemplates

    },

    setAllTemplatesVisible(state) {
      state.deployTemplates.visibleTemplates = state.deployTemplates.allTemplates
    },

    selectTemplate(state, template) {
      state.deployTemplates.selectedTemplates.push(template)
    },

    deselectTemplate(state, template) {
      const ti = state.deployTemplates.selectedTemplates.indexOf(template)
      if (ti !== -1)
        state.deployTemplates.selectedTemplates.splice(ti, 1)
    },

    setDeployError(state, message) {
      state.deployTemplates.deployError = message
    },

    clearDeployError(state) {
      state.deployTemplates.deployError = ''
    },

    /* Einstein Discovery Data */

    setDatasetMetadata(state, data) {
      console.log(data)
    },

    addFormError(state, value) {
      const { formErrors } = state.einsteinDiscoveryData.meta
      if (!formErrors.includes(value)) formErrors.push(value)
    },

    removeFormError(state, value) {
      const { formErrors } = state.einsteinDiscoveryData.meta
      const removeIndex = formErrors.indexOf(value)
      if (removeIndex > -1) formErrors.splice(removeIndex, 1)
    },

    showFormErrors(state) {
      state.einsteinDiscoveryData.meta.showErrors = true
    },

    resetForm(state) {
      state.einsteinDiscoveryData.meta = {
        formErrors: [],
        showErrors: false
      }
    },

    addColumn(state) {
      state.einsteinDiscoveryData.columns.push({
        id: nanoid(10),
        title: '',
        type: '',
        mean: 0,
        cStdDev: 0,
        noise: 0,
        values: [
          {
            id: nanoid(10),
            label: '',
            proportion: 0
          }
        ]
      })
    },

    addCategoryValue(state, columnId) {

    }


}
