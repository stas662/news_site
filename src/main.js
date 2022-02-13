import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './storeFireBase'// './storeMyBackend'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function getOnValue (path, stringClear, stringAdd) {
  onValue(ref(db, path), (snapshot) => {
    store.commit(stringClear)
    for (const [key, value] of Object.entries(snapshot.val())) {
      store.commit(stringAdd, value)
      if (!key) {
        console.log(key)
      }
    }
  })
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBMnc665X8E_j7PrcRnPzfoWUZF6-fHKA4',
  authDomain: 'news-site-81755.firebaseapp.com',
  databaseURL: 'https://news-site-81755-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'news-site-81755',
  storageBucket: 'gs://news-site-81755.appspot.com',
  messagingSenderId: '421197030501',
  appId: '1:421197030501:web:6dd24a06dc18644042928c'
}
// Initialize Firebase
initializeApp(firebaseConfig)
const db = getDatabase()
const auth = getAuth()

getOnValue('/posts', 'posts/clear', 'posts/addPost')
getOnValue('/comments', 'comments/clear', 'comments/addComments')
getOnValue('/users', 'users/clear', 'users/addUsers')
getOnValue('/arrayComment', 'comments/arrayCommentCleat', 'comments/arrayComment')

const app = createApp(App)
app.use(store)
let mounted = false
onAuthStateChanged(auth, (user) => {
  store.commit('users/setAuthUser', user)
  console.log('onAuthStateChanged', user)
  if (!mounted) {
    app.use(router)
    app.mount('#app')
    mounted = true
  }
})
