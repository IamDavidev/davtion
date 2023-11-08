import { Hono } from 'npm:hono'

interface ForInitiableServer {
  /**
   * @description port to listen
   */
  port?: number
  /**
   * @description abort controller is used to abort the server when the server is not needed
   */
  abortController: AbortController
  /**
   * @description Instace of Hono
   * @default new Hono()
   */
  app?: Hono
}

export function $bootstrapServerCore({
  abortController,
  port = 8080,
  app = new Hono()
}: ForInitiableServer) {
  try {
    const signal = abortController.signal

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
