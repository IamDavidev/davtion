import { Env, Hono, Input, MiddlewareHandler } from 'npm:hono'

export abstract class Middleware {
  constructor(private readonly app: Hono) {}

  protected abstract handler(): MiddlewareHandler<Env, '*', Input>

  public load(): void {
    this.app.use('*', this.handler())
  }
}
