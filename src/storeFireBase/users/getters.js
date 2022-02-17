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

  getLogin (state, getters) {
    let login = ''
    state.users.find(user => {
      if (user.email === getters.userEmail) {
        login = user.login
      }
    })
    return login
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
  },

  getAccount: state => id => {
    for (const [key, value] of Object.entries(state.users)) {
      if (!key) {
        console.log(key)
      }
      if (value.id === id) {
        return value
      }
    }
  },

  getAccountImage: state => id => {
    for (const [key, value] of Object.entries(state.users)) {
      if (!key) {
        console.log(key)
      }
      if (value.id === id) {
        return value.img
      }
    }
  },

  getAccountColor: state => id => {
    for (const [key, value] of Object.entries(state.users)) {
      if (!key) {
        console.log(key)
      }
      if (value.id === id) {
        return value.color
      }
    }
  }
}
