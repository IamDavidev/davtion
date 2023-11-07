import { Hono } from 'npm:hono'
import { PORT } from './config/env.config.ts'
import { $bootstrapServerCore } from './core/bootstrap-server.core.ts'

const app = new Hono()

const port = PORT
const abortController = new AbortController()

app.get('/', c => c.json({ server: 'hono' }))
app.get('/health', c => c.json({ status: 200, message: 'OK' }))

$bootstrapServerCore({
  app,
  port,
  abortController
})
