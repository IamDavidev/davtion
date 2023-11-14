import { logger } from 'npm:hono/logger'

import { Middleware } from '@core/middleware.core.ts'
import { Env, Input, MiddlewareHandler } from 'npm:hono'

export class LoggerMiddleware extends Middleware {
  protected handle(): MiddlewareHandler<Env, '*', Input> {
    return logger()
  }
}
