import { testClient } from 'npm:hono/testing'
import { ValidationTargets } from 'npm:hono'
import { Env, Hono, ToSchema } from 'npm:hono'

import { it } from '$std/testing/bdd.ts'
import { assertEquals } from '$std/assert/assert_equals.ts'

export type ApiValidation = Partial<ValidationTargets>
export type Route = ToSchema<'get', '/search', ApiValidation, {}>

export type ServerType = Hono<Env>

it('test', async () => {
  /**
   * @Given
   */
  const data = { user: 'user', password: 'password' }

  /**
   * @When
   */
  const app = new Hono()

  app.get('/search', c => c.json(data))

  const res = await testClient(app as Hono<Env, Route, '/'>).search.$get()

  const resJson = await res.json()

  assertEquals(resJson, data)
})
