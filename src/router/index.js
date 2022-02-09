import { createRouter, createWebHistory } from 'vue-router'
import store from '@/storeFireBase'// '@/storeMyBackend'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import Articles from '@/views/Articles.vue'
import Science from '@/views/Science.vue'
import Technics from '@/views/Technics.vue'
import Space from '@/views/Space.vue'
import Gadgets from '@/views/Gadgets.vue'
import AddPost from '@/views/AddPost.vue'
import RecommendationsPost from '@/components/icp/RecommendationsPost.vue'
import NewsPost from '@/components/icp/NewsPost.vue'
import ArticlesPost from '@/components/icp/ArticlesPost.vue'
import SciencePost from '@/components/icp/SciencePost.vue'
import TechnicsPost from '@/components/icp/TechnicsPost.vue'
import SpacePost from '@/components/icp/SpacePost.vue'
import GadgetsPost from '@/components/icp/GadgetsPost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/science',
    name: 'Science',
    component: Science
  },
  {
    path: '/technics',
    name: 'Technics',
    component: Technics
  },
  {
    path: '/space',
    name: 'Space',
    component: Space
  },
  {
    path: '/gadgets',
    name: 'Gadgets',
    component: Gadgets
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: AddPost,
    beforeEnter (to, from, next) {
      if (store.getters['users/isAuth']) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/:id',
    component: RecommendationsPost
  },
  {
    path: '/news/:id',
    component: NewsPost
  },
  {
    path: '/articles/:id',
    component: ArticlesPost
  },
  {
    path: '/science/:id',
    component: SciencePost
  },
  {
    path: '/technics/:id',
    component: TechnicsPost
  },
  {
    path: '/space/:id',
    component: SpacePost
  },
  {
    path: '/gadgets/:id',
    component: GadgetsPost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router