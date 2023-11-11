import { Context, Hono } from 'npm:hono'
import { logger } from 'npm:hono/logger'
import { ROUTES } from '@core/routes.core.ts'
import { API_VERSION_PREFIX } from '@config/env.config.ts'

interface ForLoaderRoutes {
  /**
   * @description app instance
   */
  app: Hono
}

export abstract class Route {
  constructor(private readonly app: Hono) {}

  protected abstract path: string

  protected abstract handler(ctx: Context): Response

  private genPath(): string {
    return `/api/${API_VERSION_PREFIX}/${this.path}`
  }

  private printPath(path: string) {
    console.log(`[INFO] ${path}`)
  }

  public load() {
    const path = this.genPath()
    this.printPath(path)
    this.app.get(path, this.handler.bind(this))
  }
}

export class UploadImageRoute extends Route {
  protected path = ROUTES.IMAGE.UPLOAD

  protected handler(ctx: Context) {
    return ctx.json({ status: 200, message: 'OK' })
  }
}

export function $loadRoutesCore({ app }: ForLoaderRoutes) {
  app.use('*', logger())

  new UploadImageRoute(app).load()
  app.get('/', c => c.json({ server: 'Davtion Api' }))
  app.get('/health', c => c.json({ status: 200, message: 'OK' }))
}
