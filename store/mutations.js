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
    setConfirmSelection(state, array) {
        state.confirmSelection = array;
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
}