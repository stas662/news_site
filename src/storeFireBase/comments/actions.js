import { getDatabase, ref, set, update } from 'firebase/database'

export default {
  createComment (context, data) {
    data.id = Date.now()
    const db = getDatabase()
    set(ref(db, 'comments/' + data.id), data)
  },

  createNestedComment (context, data) {
    data.id = Date.now()
    const db = getDatabase()
    set(ref(db, 'comments/' + data.id), data)
  },

  createUser (context, data) {
    data.id = Date.now()
    const db = getDatabase()
    set(ref(db, 'users/' + data.id), data)
  },

  updateComment (context, data) {
    const updates = {}
    updates['/comments/' + data.id] = data
    const db = getDatabase()
    return update(ref(db), updates)
  },

  deleteComment (context, id) {
    const updates = {}
    updates['/comments/' + id] = null
    const db = getDatabase()
    return update(ref(db), updates)
  },

  getArrayComments (context, array) {
    const arrayComments = array
    return arrayComments
  }
}
