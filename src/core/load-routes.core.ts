import { Hono } from 'npm:hono'

interface ForLoaderRoutes {
  /**
   * @description app instance
   */
  app: Hono
}

export function $loadRoutesCore({ app }: ForLoaderRoutes) {
  app.get('/', c => c.json({ server: 'hono' }))
  app.get('/health', c => c.json({ status: 200, message: 'OK' }))
}
