import { Redis } from 'npm:@upstash/redis'
import { DATABASE_TOKEN, DATABASE_URL } from '@config/env.config.ts'
import { HTTP_METHOD, Route } from '@core/routes.core.ts'
import { Context, Env, Input } from 'npm:hono'

export const redis = new Redis({
  url: DATABASE_URL,
  token: DATABASE_TOKEN
})

export const DB_KEYS = {
  image: (id: string) => `image:${id}`
}

export class ExampleInsertImage extends Route {
  protected path = 'example'

  protected method = HTTP_METHOD.GET

  protected async handler(ctx: Context<Env, string, Input>): Promise<Response> {
    const newUUID = crypto.randomUUID()

    const data = await redis.set(
      DB_KEYS.image(newUUID),
      JSON.stringify({
        id: newUUID,
        name: 'test',
        url: 'https://google.com',
        userId: 'test'
      })
    )
    console.log('>> data', data)

    return ctx.json({ status: 200, message: 'OK' })
  }
}
