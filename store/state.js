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
        {
          value: 'Einstein Discovery Data',
          steps: 4,
          timeline: [
            {
              title: 'Set Dataset Parameters',
              description: 'Fill out some basic information about the dataset to be generated.'
            },
            {
              title: 'Define Columns',
              description: 'Set the parameters of the data to be generated for each column of the dataset.'
            },
            {
              title: 'Create Relations',
              description: 'Create basic relationships between columns.'
            },
            {
              title: 'Insert Data',
              description: 'Put that data in your org!'
            }
          ]
        },
        {
          value: 'Deploy Templates',
          steps: 2,
          timeline: [
            {
              title: 'Select Templates',
              description: 'In this step, select the application templates you want to deploy into your Salesforce org. You can uncollapse each card for more information about dashboards, datasets, etc.'
            },
            {
              title: 'Confirm Selection',
              description: 'Make sure you have selected all the assets you want. Feel free to step backwards and add or remove more templates!'
            },
            /*
            {
              title: 'Deploy to Org',
              description: 'Off we go! Deploy the templates to your Salesforce org and view the notifications panel for updates.'
            }
            */
          ]
        },
        {
          value: 'Timeshift Datasets',
          steps: 4,
          timeline: [
            {
              title: 'Select Datasets',
              description: 'Choose which datasets to include in your timeshifting dataflow. Remember, only datasets with date columns will be timeshifted properly.'
            },
            {
              title: 'Select Date Fields',
              description: 'Choose which fields to include from each dataset, and fetch the latest dates from that dataset.'
            },
            {
              title: 'Generate Dataflows',
              description: 'Two dataflows will be generated and inserted in your org, and a "primer" dataflow will be run.'
            },
            {
              title: 'Schedule Main Dataflow',
              description: 'Last but not least, to keep things perpetually up to date, we can schedule our timeshift dataflow to run regularly.'
            }
          ]
         }
      ],
      selected: 'Home',
      validNext: true,
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
