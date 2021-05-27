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

    process: {
      options: [
        { value: 'Einstein Discovery Data', steps: 4 },
        { value: 'Deploy Templates', steps: 3 },
        { value: 'Timeshift Datasets', steps: 4 }
      ],
      selected: 'Home',
      validNext: false,
      stepIndex: 0,
      lastStepIndex: 0,
      showHome: false,
      showButtons: false,
      hasSteps: false,
      buttons: {
        previous: false,
        next: true
      }
    },

    processToComponentFolderMap: {
      'Home' : 'Home',
      'FAQ' : 'FAQ',
      'Einstein Discovery Data' : 'EinsteinDiscoveryData',
      'Deploy Templates' : 'DeployTemplates',
      'Timeshift Datasets' : 'TimeshiftDatasets'
    },

    stepIndexToText: {
      0: 'One',
      1: 'Two',
      2: 'Three',
      3: 'Four',
      4: 'Five',
      5: 'Six'
      /* etc. */
    },

    deployTemplates: {
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
      confirmedTemplates: [],
    },

    timeshiftDatasets: {
      datasetSelection: [],
      dateFieldSelection: [],
    },

    einsteinDiscoveryData: {
      meta: {
        formErrors: [],
        showErrors: false
      },
      columns: []
    },

    team: {
      developers: [
        {
          name: 'Luc Iyer',
          email: 'luciyer@salesforce.com',
          img: 'luc.jpeg',
          position: 'Backend & API Development',
          github: 'luciyer'
        },
        {
          name: 'Romario Sarmiento',
          email: 'rsarmiento@salesforce.com',
          img: 'romario.jpeg',
          position: 'Frontend Development',
          github: 'romariosc97'
        }
      ],
      members: [
        {
          name: 'Jayger McGough',
          email: 'jmcgough@salesforce.com',
          img: 'jayger.jpeg'
        },
        {
          name: 'Aditi Patel',
          email: 'aditi.patel@salesforce.com',
          img: 'aditi.jpeg'
        },
        {
          name: 'Rodrigo Mercader',
          email: 'rmercader@salesforce.com',
          img: 'rodrigo.png'
        },
        {
          name: 'Juan Ferreira',
          email: 'juan.ferreira@salesforce.com',
          img: 'juan.png'
        }
      ]
    }

})
