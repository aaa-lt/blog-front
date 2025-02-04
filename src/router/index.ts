import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/PostView.vue'
import NotFound from '@/views/NotFound.vue'
import SeriesView from '@/views/SeriesView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/store/auth'
import RegisterView from '@/views/RegisterView.vue'

const isAuthenticated = () => {
  const authStore = useAuthStore()

  if (authStore.user) {
    return { name: 'home' }
  }
}

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
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/logout',
      name: 'Logout',
      redirect() {
        const authStore = useAuthStore()
        authStore.logout()

        return { name: 'login' }
      },
    },
  ],
})

export default router
