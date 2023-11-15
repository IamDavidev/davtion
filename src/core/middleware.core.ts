import { Env, Hono, Input, MiddlewareHandler } from 'npm:hono'

export abstract class Middleware {
  private readonly commonPath = '*'
  constructor(private readonly app: Hono) {}

  protected abstract handler(): MiddlewareHandler<
    Env,
    typeof this.commonPath,
    Input
  >

  public load(): void {
    this.app.use(this.commonPath, this.handler())
  }
}
