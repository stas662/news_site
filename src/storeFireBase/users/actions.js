import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref, set, update } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

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
    // const auth = getAuth()
    // return createUserWithEmailAndPassword(auth, data.email, data.password)
    //   .then((userCredential) => {
    //     context.state.user = userCredential.user
    //     context.state.userAuth = false
    //     return 'OK'
    //   })
    //   .catch((error) => {
    //     return `error ${error.message}`
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //   })
  },

  createUser (context, data) {
    data.id = data.login
    data.color = '#04d9ff'
    data.img = 'https://www.meme-arsenal.com/memes/d9cffaded34167af95ce6b0611494ca0.jpg'
    const db = getDatabase()
    set(ref(db, 'users/' + data.id), data)
  },

  async updateUser (context, data) {
    if (data.file !== undefined) {
      const newGuid = generateUUID()
      const storage = getStorage()
      const storeRef = storageRef(storage, 'images/' + newGuid)

      // Загрузка картинки в firebase
      await uploadBytes(storeRef, data.file).then((snapshot) => {
        console.log('Uploaded a blob or file!', data.file)
      })

      // Получение ссылки на картинку и запись этой ссылки в БД
      await getDownloadURL(storageRef(storage, 'images/' + newGuid)).then(url => {
        data.img = url
        return data.img
      })

      delete data.file
    }
    const updates = {}
    updates['/users/' + data.id] = data
    const db = getDatabase()
    return update(ref(db), updates)
  }
}
