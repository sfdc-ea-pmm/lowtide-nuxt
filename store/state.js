export default () => ({
    action: 'Home',
    notificationFieldFilter: 'type',
    currentStep: 0,
    toastStatus: [],
    modalStatus: false,
    selectedDeploy: {},
    confirmSelection: [],
    finishedProcess: false,
    session: {},
    notifications: (!sessionStorage.notifications ? [] : JSON.parse(sessionStorage.notifications))
})