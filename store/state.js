export default () => ({
    action: 'Home',
    notificationFieldFilter: 'type',
    currentStep: 0,
    toastStatus: [],
    modalStatus: false,
    selectedDeploy: {},
    confirmDeploySelection: [],
    selectedTimeshift: {},
    confirmTimeshiftSelection: [],
    finishedProcess: false,
    session: {},
    notifications: (!sessionStorage.notifications ? [] : JSON.parse(sessionStorage.notifications))
})