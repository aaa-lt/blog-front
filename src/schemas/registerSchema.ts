import { object, string } from 'yup'

export const registerSchema = object({
  name: string().min(2).max(32).required(),
  email: string().email().required(),
  password: string().min(8).max(32).required(),
})
