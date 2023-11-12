import { Context, Hono } from 'npm:hono'
import { logger } from 'npm:hono/logger'

import { HTTP_METHOD, ROUTES, Route } from '@core/routes.core.ts'

interface ForLoaderRoutes {
  /**
   * @description app instance
   */
  app: Hono
}

export class UploadImageRoute extends Route {
  protected path = ROUTES.IMAGE.UPLOAD

  protected method = HTTP_METHOD.POST

  protected handler(ctx: Context) {
    return ctx.text('ok')
  }
}

export function $loadRoutesCore({ app }: ForLoaderRoutes) {
  app.use('*', logger())

  new UploadImageRoute(app).load()
  app.get('/', c => c.json({ server: 'Davtion Api' }))
  app.get('/health', c => c.json({ status: 200, message: 'OK' }))
}
