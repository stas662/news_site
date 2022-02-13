import { getDatabase, ref, set, update } from 'firebase/database'

function removeRecursion (elements, id) {
  for (const element of elements) {
    if (element.arrayComment !== undefined) {
      for (const [key, value] of Object.entries(element.arrayComment)) {
        if (id === value.id) {
          console.log(value.id)
          const updates = {}
          updates['comments/' + value.idParent + '/arrayComment/' + value.id] = null
          const db = getDatabase()
          update(ref(db), updates)
        }
        if (id === value.idComment) {
          removeRecursion(elements, Number(key))
        }
      }
    }
  }
}

export default {
  createComment (context, data) {
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
  },

  createNestedComment (context, data) {
    data.id = Date.now()
    const db = getDatabase()
    set(ref(db, 'comments/' + data.idParent + '/arrayComment/' + data.id), data)
  },

  updateNestedComment (context, data) {
    const updates = {}
    if (data.likes === undefined) {
      data.likes = []
    }
    updates['comments/' + data.idParent + '/arrayComment/' + data.id] = data
    const db = getDatabase()
    return update(ref(db), updates)
  },

  deleteNestedComment (context, id) {
    return removeRecursion(context.state.comments, id)
  }
}
