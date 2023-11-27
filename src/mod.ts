import { Hono } from 'npm:hono'

import { PORT } from '@config/env.config.ts'
import { $bootstrapServerCore } from '@core/bootstrap-server.core.ts'

const app = new Hono()

const port = PORT
const abortController = new AbortController()

$bootstrapServerCore(app, {
  port,
  abortController
})
