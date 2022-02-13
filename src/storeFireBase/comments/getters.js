
function getParent (elements, id) {
  const arrayParent = []
  for (const element of elements) {
    if (id === element.id) {
      const idParent = element.id
      if (element.arrayComment !== undefined) {
        for (const [key, value] of Object.entries(element.arrayComment)) {
          if (!key) {
            console.log(key)
          }
          if (value.idComment === idParent) {
            arrayParent.push(value)
          }
        }
      }
    }
  }
  return arrayParent
}

function getChild (elements, id) {
  const arrayChild = []
  for (const element of elements) {
    if (element.arrayComment !== undefined) {
      for (const [key, value] of Object.entries(element.arrayComment)) {
        if (!key) {
          console.log(key)
        }
        if (value.idComment === id) {
          arrayChild.push(value)
        }
      }
    }
  }
  return arrayChild
}

function getAllRating (elements, id) {
  var like = 0
  for (const [key, value] of Object.entries(elements)) {
    if (!key) {
      console.log(key)
    }
    if (value.arrayComment !== undefined) {
      for (const [newKey, newValue] of Object.entries(value.arrayComment)) {
        if (!newKey) {
          console.log(newKey)
        }
        if (newValue.likes !== undefined) {
          if (newValue.idUser === id) {
            like = newValue.likes + like
          }
        }
      }
    }
    if (value.likes !== undefined) {
      if (value.idUser === id) {
        like = value.likes + like
      }
    }
  }
  return like
}

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

  getParentComment: (state, getters) => (route, id) => {
    const arrayParent = getParent(getters.getCommentsUser(route), id)
    return arrayParent
  },

  getChildComment: state => id => {
    const arrayChild = getChild(state.comments, id)
    if (arrayChild === []) {
      return false
    }
    return arrayChild
  },

  commentById: state => id => {
    for (const element of state.comments) {
      if (element.arrayComment !== undefined) {
        for (const [key, value] of Object.entries(element.arrayComment)) {
          if (key === `${id}`) {
            return value
          }
        }
      }
    }
  },

  getRating (state, getters, rootState, rootGetters) {
    return getAllRating(state.comments, rootGetters['users/getId'](rootGetters['users/userEmail']))
  },

  getRatingAccount: (state) => idUser => {
    return getAllRating(state.comments, idUser)
  }
}
