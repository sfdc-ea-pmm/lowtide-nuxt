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
    
}
