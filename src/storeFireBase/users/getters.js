function isValidToken (token) {
  return token !== undefined
}

export default {
  isAuth (state) {
    return isValidToken(state.user.accessToken)
  },

  userEmail (state) {
    return state.user.email
  },

  regDialog (state) {
    state.dialogAuth = false
    state.dialogReg = true
  },

  authDialog (state) {
    state.dialogReg = false
    state.dialogAuth = true
  },

  getUser: state => email => {
    return state.users.find(user => user.email === email)
  },

  getImage: state => email => {
    for (const [key, value] of Object.entries(state.users)) {
      if (!key) {
        console.log(key)
      }
      if (value.email === email) {
        return value.img
      }
    }
  },

  getId: state => email => {
    for (const [key, value] of Object.entries(state.users)) {
      if (!key) {
        console.log(key)
      }
      if (value.email === email) {
        return value.id
      }
    }
  }
}
