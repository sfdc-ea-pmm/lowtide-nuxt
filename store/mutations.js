import { nanoid } from 'nanoid'

export default {

  /* Session */

  setSession(state, session) {
    state.session = session
  },
  setDeployBranch(state, value) {
    state.session.deployBranch = value
  },

  /* Toast */

  setToastStatus(state, status) {
      state.toastStatus = status;
  },

  /* Modal & Notifications */

  toggleModal(state) {
    state.modal.visible = !state.modal.visible
    state.modal.unread = false
  },

  setFieldFilter(state, value) {
    state.modal.fieldFilter = value
  },

}
