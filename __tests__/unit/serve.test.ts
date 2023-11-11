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
import { API_VERSION_PREFIX } from '@config/env.config.ts'
import { ROUTES } from '@core/routes.core.ts'

type ApiValidation = Partial<ValidationTargets>

const version = API_VERSION_PREFIX

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
      typeof ROUTES.IMAGE.UPLOAD,
      ApiValidation,
      typeof expected
    >

    type HonoWithUpdateImage = Hono<Env, UpdateImageSchemaApi, '/'>

    /**
     * @When
     */
    $loadRoutesCore({ app })

    // deno-lint-ignore no-explicit-any
    const res = await (testClient(app) as any).api[version][
      ROUTES.IMAGE.UPLOAD
    ].$get()

    const resJson = await res.json()
    /**
     * @Then
     */

    assertEquals(resJson, expected)
    assertEquals(res.status, 200)
  })
})
