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
    setSelectedDeployTemplates(state, array) {
        state.selectedDeployTemplates = array;
    },
    
}