import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/PostView.vue'
import NotFound from '@/views/NotFound.vue'
import { fetchPostByRoute } from '@/services/fetchService'

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
      path: '/post/:id',
      name: 'post',
      component: PostView,
      props: true,
      beforeEnter: async (to, from, next) => {
        const post = await fetchPostByRoute(to.params.id as string)
        if (post) {
          to.params.post = JSON.stringify(post)
          return next()
        }

        return next({ name: 'NotFound' })
      },
    },
  ],
})

export default router
