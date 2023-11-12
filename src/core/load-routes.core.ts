import { Context, Env, Hono, Input } from 'npm:hono'
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

  protected method = HTTP_METHOD.GET

  protected handler(ctx: Context<Env, typeof this.path, Input>) {
    return ctx.json({ status: 200, message: 'OK' })
  }
}

export function $loadRoutesCore({ app }: ForLoaderRoutes) {
  app.use('*', logger())

  new UploadImageRoute(app).load()
  app.get('/', c => c.json({ server: 'Davtion Api' }))
  app.get('/health', c => c.json({ status: 200, message: 'OK' }))
}
