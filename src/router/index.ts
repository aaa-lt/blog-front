import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '@/views/PostView.vue'
import NotFound from '@/views/NotFound.vue'
import SeriesView from '@/views/SeriesView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/store/auth'
import RegisterView from '@/views/RegisterView.vue'
import DraftsView from '@/views/DraftsView.vue'
import DraftEditor from '@/views/PostEditor.vue'

const HomeIfAuth = () => {
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
      beforeEnter: HomeIfAuth,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: HomeIfAuth,
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
    {
      path: '/drafts',
      name: 'drafts',
      component: DraftsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/post/:id',
      name: 'draft',
      component: PostView,
      meta: {
        requiresAuth: true,
      },
      props: { isDraft: true },
    },
    {
      path: '/admin/post/:id/edit',
      name: 'draftEditor',
      component: DraftEditor,
      meta: {
        requiresAuth: true,
        isAsideHidden: true,
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next('/login')
  } else {
    next()
  }
})

export default router
