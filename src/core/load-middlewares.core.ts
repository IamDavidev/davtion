import { Hono } from 'npm:hono'

import { LoggerMiddleware } from '../middlewares/logger.middleware.ts'

interface ForLoaderMiddlewares {
  /**
   * @description app instance
   */
  app: Hono
}

export function $loadMiddlewaresCore({ app }: ForLoaderMiddlewares) {
  /**
   * Load Middlewares
   */

  new LoggerMiddleware(app).load()
}
