import { Hono } from 'npm:hono'

import { PORT } from '@config/env.config.ts'
import { $bootstrapServerCore } from '@core/bootstrap-server.core.ts'
import { $loadRoutesCore } from '@core/load-routes.core.ts'

const app = new Hono()

const port = typeof PORT === 'number' ? PORT : 8080
const abortController = new AbortController()

$loadRoutesCore({ app })

$bootstrapServerCore({
  app,
  port,
  abortController
})
