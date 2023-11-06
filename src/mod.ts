import { Hono } from "https://deno.land/x/hono@v3.9.2/mod.ts"

const app = new Hono()

app.get('/', ctx => {
  return ctx.text('Hello World')
})


Deno.serve(app.fetch)