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
    setSelectedDeploy(state, array) {
        state.selectedDeploy = array;
    },
    setConfirmSelection(state, array) {
        state.confirmSelection = array;
    },
    
}