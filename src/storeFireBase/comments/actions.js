import { getDatabase, ref, set, update } from 'firebase/database'

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
    data.id = generateUUID()
    data.data = Date.now()
    const db = getDatabase()
    set(ref(db, 'comments/' + data.id), data)
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

  deletePostAndComment (context, id) {
    for (const [key, value] of Object.entries(context.state.comments)) {
      if (!key) {
        console.log(key)
      }
      if (value.idPost === id) {
        const updates = {}
        updates['/comments/' + value.id] = null
        const db = getDatabase()
        update(ref(db), updates)
      }
    }
  },

  getArrayComments (context, array) {
    const arrayComments = array
    return arrayComments
  },

  createNestedComment (context, data) {
    data.id = generateUUID()
    data.data = Date.now()
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
