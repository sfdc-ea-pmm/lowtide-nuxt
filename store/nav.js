export const state = () => ({

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
          title: 'Set up Interactions',
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
          description: 'Make sure you have selected all the assets you want, and queue them for deploy to your org!'
        }
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
  }
})

export const mutations = {
  setProcess(state, value) {

    const isFaq = value === 'FAQ',
          isHome = value === 'Home';

    state.stepIndex = 0
    state.showHome = isFaq ? true : false;
    state.showButtons = (!isHome && !isFaq) ? true : false;
    state.selected = value

    if (isFaq || isHome) return;

    const rpIndex = state.options.findIndex(d => d.value === value)
    if (rpIndex !== -1)
      state.lastStepIndex = state.options[rpIndex].steps - 1

  },

  stepPrev(state) {
    state.stepIndex -= 1
    if (state.stepIndex === 0)
      state.buttons.previous = false
  },

  stepNext(state) {
    state.stepIndex += 1
    if (state.stepIndex > 0)
      state.buttons.previous = true
  },

  disablePrevious(state) {
    state.buttons.previous = false
  },

  enablePrevious(state) {
    state.buttons.previous = true
  },

  catchNext(state) {
    state.validNext = false
  },

  releaseNext(state) {
    state.validNext = true
  },

  disableNext(state) {
    state.buttons.next = false
  },

  enableNext(state) {
    state.buttons.next = true
  }
}
