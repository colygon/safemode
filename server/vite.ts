import { createServer as createViteServer } from 'vite'
import type { Express } from 'express'

export async function initVite(app: Express) {
  if (process.env.NODE_ENV !== 'development') return

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)
}
