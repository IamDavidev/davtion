/**
 * Load libraries
 */
import { testClient } from 'npm:hono/testing'
import { ValidationTargets } from 'npm:hono'
import { Env, Hono, ToSchema } from 'npm:hono'
import { describe, it } from '$std/testing/bdd.ts'
import { assertEquals } from '$std/assert/assert_equals.ts'

/**
 * Load internal modules
 */
import { $loadRoutesCore } from '@core/load-routes.core.ts'

type ApiValidation = Partial<ValidationTargets>

describe('Api health', () => {
  it('Should return status 200', async () => {
    /**
     * Parse types for warnings
     */
    type HealthSchemaApi = ToSchema<'get', '/health', ApiValidation, '/'>
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

describe('Api Update Image', () => {
  it('Should return image id', async () => {
    /**
     * @Given
     */
    const expected = { status: 200, message: 'OK' }
    const app = new Hono() as HonoWithUpdateImage

    /**
     * Parse types for warnings
     */
    type UpdateImageSchemaApi = ToSchema<
      'get',
      `/api/v100/update-image`,
      ApiValidation,
      typeof expected
    >

    type HonoWithUpdateImage = Hono<Env, UpdateImageSchemaApi, '/'>

    /**
     * @When
     */
    $loadRoutesCore({ app })
    const res = await testClient(app).api.v100['update-image'].$get()
    const resJson = await res.json()
    /**
     * @Then
     */

    assertEquals(resJson, expected)
    assertEquals(res.status, 200)
  })
})
