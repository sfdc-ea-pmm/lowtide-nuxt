export default {
    setAction(state, { action }) {
        state.action = action;
    },
    setNotificationFieldFilter(state, { field }) {
        state.notificationFieldFilter = field;
    },
}