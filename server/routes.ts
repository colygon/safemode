import { Router } from 'express'
import { DatabaseStorage } from './storage'
import { insertEmailSchema } from '../shared/schema'

const router = Router()
const storage = new DatabaseStorage()

router.post('/signup', async (req, res) => {
  try {
    const { email } = insertEmailSchema.parse(req.body)
    const newEmail = await storage.createEmail({ email })
    res.json(newEmail)
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'This email is already registered' })
    }
    res.status(400).json({ error: error.message })
  }
})

export default router
