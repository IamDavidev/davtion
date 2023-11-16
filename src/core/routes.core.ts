import { Context, Env, Hono, Input } from 'npm:hono'
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
    this.app[this.method](path, this.handler.bind(this))
  }
}
