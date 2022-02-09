export default {
  addComments (state, data) {
    state.comments.push(data)
  },

  clear (state) {
    state.comments = []
  }
}
