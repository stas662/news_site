import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

function generateUUID () {
  var d = new Date().getTime()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    // use high-precision timer if available
    d += performance.now()
  }
  var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })

  return newGuid
}

export default {
  doAuth (context, data) {
    // if (data.login === 'stas' && data.password === '123') {
    //   context.state.token = data.login
    //   return 'OK'
    // }
    // return 'error'
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, data.login, data.password)
      .then((userCredential) => {
        context.state.user = userCredential.user
        context.state.userAuth = false
        return 'OK'
      })
      .catch((error) => {
        return `error ${error.message}`
        // const errorCode = error.code;
        // const errorMessage = error.message;
      })
  },

  logout (context) {
    context.state.user = {}
    const auth = getAuth()
    context.state.userAuth = true
    return signOut(auth).then(() => 'OK')
  },

  doCreate (context, data) {
    const auth = getAuth()
    return createUserWithEmailAndPassword(auth, data.login, data.password)
      .then((userCredential) => {
        context.state.user = userCredential.user
        context.state.userAuth = false
        return 'OK'
      })
      .catch((error) => {
        return `error ${error.message}`
        // const errorCode = error.code;
        // const errorMessage = error.message;
      })
  },

  createUser (context, data) {
    data.id = generateUUID()
    if (data.login === undefined) {
      data.login = generateUUID()
    }
    data.img = 'https://www.meme-arsenal.com/memes/d9cffaded34167af95ce6b0611494ca0.jpg'
    const db = getDatabase()
    set(ref(db, 'users/' + data.id), data)
  }
}
