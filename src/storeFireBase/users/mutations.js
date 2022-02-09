export default {
  setAuthUser (state, data) {
    state.user = data || {}
  },

  addUsers (state, data) {
    state.users.push(data)
  },

  clear (state) {
    state.users = []
  }
}
