import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/PostView.vue'
import NotFound from '@/views/NotFound.vue'
import SeriesView from '@/views/SeriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/:path',
      name: 'post',
      component: PostView,
    },
    {
      path: '/series/:path',
      name: 'series',
      component: SeriesView,
    },
  ],
})

export default router
