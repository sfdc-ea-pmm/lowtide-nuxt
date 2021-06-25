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


    notificationsViewed: (sessionStorage.notificationsViewed ? sessionStorage.notificationsViewed : true),
    btnNextDisabled: true,
    filteredDeployTemplates: [],




    session: {},


    notifications: (!sessionStorage.notifications ? [] : JSON.parse(sessionStorage.notifications)),

    modal: {
      visible: false,
      unread: false,
      fieldFilter: 'type',
      fieldOptions: [
        { title: 'Type', value: 'type' },
        { title: 'Title', value: 'title' },
        { title: 'Time', value: 'time' },
        { title: 'Message', value: 'message' }
      ]
    },

    toast: {
      visible: false,
      data: {
        type: 'info',
        time: null,
        message: ''
      },
    },

    timeshiftDatasets: {
      datasetSelection: [],
      dateFieldSelection: [],
    },

})
