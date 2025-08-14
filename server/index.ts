import express from 'express'
import session from 'express-session'
import MemoryStore from 'memorystore'
import routes from './routes'

const app = express()
const SessionStore = MemoryStore(session)

app.use(express.json())
app.use(
  session({
    secret: 'safemode',
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({ checkPeriod: 86400000 })
  })
)

app.use('/api', routes)

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Resource already exists' })
  }
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
