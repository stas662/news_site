export default {
  getComments: state => id => {
    return state.comments.filter(comment => comment.idPost === id)
  },

  getCommentsUser: state => id => {
    const array = []
    state.comments.filter(comment => {
      if (comment.idUser === id) {
        array.push(comment)
      }
    })
    const arrayComments = []
    array.reverse()
    for (let i = 0; i < 4; i++) {
      if (array[i] !== undefined) {
        arrayComments.push(array[i])
      }
    }
    return arrayComments
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
  },

  getRatingAccount: (state) => idUser => {
    var like = 0
    for (const [key, value] of Object.entries(state.comments)) {
      if (!key) {
        console.log(key, value)
      }
      if (value.likes !== undefined) {
        if (value.idUser === idUser) {
          like = value.likes + like
        }
      }
    }
    return like
  }
}
