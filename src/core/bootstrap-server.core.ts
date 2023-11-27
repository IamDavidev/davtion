import { Hono } from 'npm:hono'
import { $loadMiddlewaresCore } from '@core/load-middlewares.core.ts'
import { $loadRoutesCore } from '@core/load-routes.core.ts'

interface ForInitiableServer {
  /**
   * @description port to listen
   */
  port?: number
  /**
   * @description abort controller is used to abort the server when the server is not needed
   */
  abortController: AbortController
}

export function $bootstrapServerCore(
  app: Hono,
  { abortController, port = 8080 }: ForInitiableServer
) {
  try {
    const signal = abortController.signal

    $loadMiddlewaresCore({ app })
    $loadRoutesCore({ app })

    Deno.serve(
      {
        port,
        signal
      },
      app.fetch
    )
  } catch (err: unknown) {
    const parseError = err as Error
    console.error(parseError.message)
    abortController.abort()
  }
}
