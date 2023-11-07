import { testClient } from 'npm:hono/testing'

import { Hono } from 'npm:hono'

import { it } from '$std/testing/bdd.ts'
import { assertEquals } from '$std/assert/assert_equals.ts'

it('test', async () => {
  /**
   * @Given
   */
  const data = { user: 'user', password: 'password' }

  /**
   * @When
   */
  const app = new Hono().get('/search', c => c.json(data))

  const res = await testClient(app).search.$get()

  const resJson = await res.json()

  assertEquals(resJson, data)
})
