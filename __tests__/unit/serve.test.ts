import { testClient } from 'npm:hono/testing'
import { ValidationTargets } from 'npm:hono'
import { Env, Hono, ToSchema } from 'npm:hono'

import { describe, it } from '$std/testing/bdd.ts'
import { assertEquals } from '$std/assert/assert_equals.ts'
import { $loadRoutesCore } from '../../src/core/load-routes.core.ts'

export type ApiValidation = Partial<ValidationTargets>
export type Route = ToSchema<'get', '/search', ApiValidation, {}>

export type ServerType = Hono<Env>

it('Example ', async () => {
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

describe('Api health', () => {
  it('Should return status 200', async () => {
    /**
     * Parse types for warnings
     */
    type HealthSchemaApi = ToSchema<'get', '/health', ApiValidation, {}>
    type HonoWithHealth = Hono<Env, HealthSchemaApi, '/'>

    /**
     * @Given
     */
    const app = new Hono() as HonoWithHealth

    /**
     * @When
     */
    $loadRoutesCore({ app })
    const res = await testClient(app).health.$get()

    /**
     * @Then
     */
    assertEquals(res.status, 200)
  })
})
