export default {
  addComments (state, data) {
    state.comments.push(data)
  },

  clear (state) {
    state.comments = []
  },

  arrayComment (state, data) {
    state.arrayComments.push(data)
  },

  arrayCommentCleat (state) {
    state.arrayComments = []
  }
}
