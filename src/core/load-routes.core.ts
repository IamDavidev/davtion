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

  protected method = HTTP_METHOD.POST

  protected async handler(
    ctx: Context<Env, typeof this.path, Input>
  ): Promise<Response> {
    const formData = await ctx.req.formData()
    const file = formData.get('file') as File

    if (!file) return ctx.json({ status: 400, message: 'Bad Request' })

    const arr = await file.arrayBuffer()

    Deno.writeFile('test.png', new Uint8Array(arr))

    return ctx.json({ status: 200, message: 'OK' })
  }
}

export class HealthRoute extends Route {
  protected path = 'health'
  protected method: HTTP_METHOD = HTTP_METHOD.GET

  protected handler(ctx: Context<Env, string, Input>): Response {
    return ctx.json({ status: 200, message: 'OK' })
  }
}

export class HomeRoute extends Route {
  protected path = ''
  protected method: HTTP_METHOD = HTTP_METHOD.GET

  protected handler(
    ctx: Context<Env, string, Input>
  ): Response | Promise<Response> {
    return ctx.json({
      server: 'Davtion Api'
    })
  }
}

export function $loadRoutesCore({ app }: ForLoaderRoutes) {
  /**
   * Load all routes
   */
  new UploadImageRoute(app).load()
  new HealthRoute(app).load()
  new HomeRoute(app).load()
}
