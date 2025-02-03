<script setup lang="ts">
import { userSchema } from '@/schemas/loginSchema'
import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'
import { ValidationError } from 'yup'

const authStore = useAuthStore()

const isButtonDisabled = ref(false)
const valErr = ref<ValidationError>()

const form = ref({
  email: 'user@example.com',
  password: 'stringst',
})

const doLogin = async () => {
  try {
    isButtonDisabled.value = true
    valErr.value = undefined

    const validatedUser = await userSchema.validate(form.value)

    authStore.login(validatedUser.email, validatedUser.password)
  } catch (error) {
    if (error instanceof ValidationError) {
      valErr.value = error
    }
  } finally {
    isButtonDisabled.value = false
  }
}
</script>

<template>
  <form @submit.prevent="doLogin" class="flex items-center justify-center px-6 py-8 mt-10 lg:py-0">
    <div
      class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md sm:max-w-md p-6 space-y-6 sm:p-8"
    >
      <h1 class="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">Log In</h1>
      <div class="space-y-4 md:space-y-6">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            v-model="form.email"
            type="text"
            name="email"
            id="email"
            autocomplete="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            :class="valErr?.path === 'email' ? 'border-red-500' : ''"
            placeholder="user@example.com"
            required
          />
          <div v-if="valErr?.path === 'email'" class="text-sm mt-2 font-medium text-red-500">
            {{ valErr?.message }}
          </div>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            placeholder="••••••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            :class="valErr?.path === 'password' ? 'border-red-500' : ''"
            required
          />
          <div v-if="valErr?.path === 'password'" class="text-sm mt-2 font-medium text-red-500">
            {{ valErr?.message }}
          </div>
          <!-- <div class="text-sm mt-2 font-medium text-red-500">{{ getError('password') }}</div> -->
        </div>
        <!-- <div v-if="responseError" class="text-sm font-medium text-red-500">
              <span v-if="responseError.response?.status === 401"
                >Invalid username or password</span
              >
              <span v-else>Unexpected error: {{ responseError }}</span>
            </div> -->
        <button
          :disabled="isButtonDisabled"
          type="submit"
          class="w-full text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Log In
        </button>
        <div class="border-t border-slate-200 mx-6"></div>

        <p class="text-sm font-light text-gray-500 py-0">
          Don't have an account?
          <RouterLink
            to="/register"
            class="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
            >Register here</RouterLink
          >
        </p>
      </div>
    </div>
  </form>
</template>
