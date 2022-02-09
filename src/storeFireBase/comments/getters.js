export default {
  getComments: state => id => {
    return state.comments.filter(comment => comment.idPost === id)
  },

  commentById (state) {
    return (id) => state.comments.find(item => item.id === id)
  },

  getRating (state, getters, rootState, rootGetters) {
    var like = 0
    for (const [key, value] of Object.entries(state.comments)) {
      if (!key) {
        console.log(key, value)
      }
      if (value.likes !== undefined) {
        if (value.idUser === rootGetters['users/getId'](rootGetters['users/userEmail'])) {
          like = value.likes + like
        }
      }
    }
    return like
  }
}
