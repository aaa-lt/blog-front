import { object, string } from 'yup'

export const userSchema = object({
  email: string().email().required(),
  password: string().min(8).max(32).required(),
})
