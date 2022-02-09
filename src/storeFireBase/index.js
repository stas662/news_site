import { createStore } from 'vuex'
import postsStore from './posts'
import userStore from './users'
import commentsStore from './comments'

export default createStore({
  modules: {
    users: userStore,
    posts: postsStore,
    comments: commentsStore
  }
})
