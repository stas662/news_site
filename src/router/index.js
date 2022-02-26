import { createRouter, createWebHistory } from 'vue-router'
import store from '@/storeFireBase'// '@/storeMyBackend'
import HomeView from '@/views/HomeView.vue'
import NewsView from '@/views/NewsView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import ScienceView from '@/views/ScienceView.vue'
import TechnicsView from '@/views/TechnicsView.vue'
import SpaceView from '@/views/SpaceView.vue'
import GadgetsView from '@/views/GadgetsView.vue'
import AddPostView from '@/views/AddPostView.vue'
import AccountView from '@/views/AccountView.vue'
import CarouselPost from '@/components/icp/CarouselPost.vue'
import NewsPost from '@/components/icp/NewsPost.vue'
import ArticlesPost from '@/components/icp/ArticlesPost.vue'
import SciencePost from '@/components/icp/SciencePost.vue'
import TechnicsPost from '@/components/icp/TechnicsPost.vue'
import SpacePost from '@/components/icp/SpacePost.vue'
import GadgetsPost from '@/components/icp/GadgetsPost.vue'
import PopularPosts from '@/components/icp/PopularPosts.vue'
import RecommendedPost from '@/components/icp/RecommendedPost.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/news',
    name: 'NewsView',
    component: NewsView
  },
  {
    path: '/articles',
    name: 'ArticlesView',
    component: ArticlesView
  },
  {
    path: '/science',
    name: 'ScienceView',
    component: ScienceView
  },
  {
    path: '/technics',
    name: 'TechnicsView',
    component: TechnicsView
  },
  {
    path: '/space',
    name: 'SpaceView',
    component: SpaceView
  },
  {
    path: '/gadgets',
    name: 'GadgetsView',
    component: GadgetsView
  },
  {
    path: '/add-post',
    name: 'AddPostView',
    component: AddPostView,
    beforeEnter (to, from, next) {
      if (store.getters['users/isAuth']) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/account/:id',
    name: 'AccountView',
    component: AccountView
  },
  {
    path: '/:id',
    component: CarouselPost
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
  },
  {
    path: '/popul/:id',
    component: PopularPosts
  },
  {
    path: '/recommended/:id',
    component: RecommendedPost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
