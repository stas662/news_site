import { getDatabase, ref, set, update } from 'firebase/database'

export default {
  createPost (context, data) {
    data.id = Date.now()
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
