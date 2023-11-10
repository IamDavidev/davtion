import { Context, Hono } from 'npm:hono'
import { logger } from 'npm:hono/logger'
import { ROUTES } from '@core/routes.core.ts'

interface ForLoaderRoutes {
  /**
   * @description app instance
   */
  app: Hono
}

export abstract class Controller {
  constructor(private readonly app: Hono) {}

  protected abstract path: string

  protected abstract handler(ctx: Context): Response

  private printPath(path: string) {
    console.log(`[INFO] ${path}`)
  }

  public load() {
    const path = this.path
    this.printPath(path)
    this.app.get(path, this.handler.bind(this))
  }
}

export class UploadImageController extends Controller {
  protected path = ROUTES.IMAGE.UPLOAD

  protected handler(ctx: Context) {
    return ctx.json({ status: 200, message: 'OK' })
  }
}

export function $loadRoutesCore({ app }: ForLoaderRoutes) {
  app.use('*', logger())
  new UploadImageController(app).load()

  app.get('/', c => c.json({ server: 'Davtion Api' }))
  app.get('/health', c => c.json({ status: 200, message: 'OK' }))
}
