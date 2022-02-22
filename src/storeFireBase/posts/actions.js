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
  async createPost (context, data) {
    data.id = generateUUID()
    data.data = Date.now()
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
    const db = getDatabase()
    set(ref(db, 'posts/' + data.id), data)
  },

  updatePost (context, data) {
    const updates = {}
    updates['/posts/' + data.id] = data
    const db = getDatabase()
    return update(ref(db), updates)
  },

  deletePost (context, id) {
    const updates = {}
    updates['/posts/' + id] = null
    const db = getDatabase()
    return update(ref(db), updates)
  }
}
