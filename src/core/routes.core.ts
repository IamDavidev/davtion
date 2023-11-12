import { Context, Env, Hono, Input } from 'npm:hono'
// deno-lint-ignore-file

import { API_VERSION_PREFIX } from '@config/env.config.ts'

export const ROUTES = {
  IMAGE: {
    UPLOAD: 'upload-image'
  }
}

export enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export abstract class Route {
  constructor(private readonly app: Hono) {}

  protected abstract path: string
  protected abstract method: HTTP_METHOD

  protected abstract handler(
    ctx: Context<Env, typeof this.path, Input>
  ): Response | Promise<Response>

  private genPath(): string {
    return `/api/${API_VERSION_PREFIX}/${this.path}`
  }

  private printPath(path: string) {
    console.log(`[INFO] ${path}`)
  }

  public load(): void {
    const path = this.genPath()
    this.printPath(path)
    /**
     * @description
     *
     * Reasearch more about this
     * The problem is when use this.app[method](path, this.handler.bind(this))
     */
    if (this.method === HTTP_METHOD.GET)
      this.app.get(path, this.handler.bind(this))
    if (this.method === HTTP_METHOD.POST)
      this.app.post(path, this.handler.bind(this))
    if (this.method === HTTP_METHOD.PUT)
      this.app.put(path, this.handler.bind(this))
    if (this.method === HTTP_METHOD.DELETE)
      this.app.delete(path, this.handler.bind(this))

    this.app.get('/health', c => c.json({ status: 200, message: 'OK' }))
  }
}
