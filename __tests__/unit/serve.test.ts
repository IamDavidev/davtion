// deno-lint-ignore-file no-explicit-any
/**
 * Load libraries
 */
import { assertEquals } from '$std/assert/assert_equals.ts'
import { beforeAll, describe, it } from '$std/testing/bdd.ts'
import { Env, Hono, Schema, ValidationTargets } from 'npm:hono'
import { testClient } from 'npm:hono/testing'

/**
 * Load internal modules
 */
import { API_VERSION_PREFIX } from '@config/env.config.ts'
import { $loadRoutesCore } from '@core/load-routes.core.ts'

type ApiValidation = Partial<ValidationTargets>

describe('Api health', () => {
  const version = API_VERSION_PREFIX

  let client: any

  beforeAll(() => {
    const server = new Hono() as Hono<Env, Schema, '/'>

    $loadRoutesCore({ app: server })
    client = testClient(server)
  })

  it('Should return status 200 in home page', async () => {
    /**
     * @Given
     */
    const expectedStatus = 200
    const expectedResponse = {
      server: 'Davtion Api'
    }

    /**
     * @When
     */
    const request = await client.api[version][''].$get()
    const response = await request.json()

    /**
     * @Then
     */

    assertEquals(request.status, expectedStatus)
    assertEquals(response, expectedResponse)
  })

  it('should return ok in healt route', async () => {
    /**
     * @Given
     */
    const expectedStatus = 200
    const expectedResponse = {
      status: 200,
      message: 'OK'
    }

    /**
     * @When
     */
    const request = await client.api[version].health.$get()
    const response = await request.json()

    /**
     * @Then
     */
    assertEquals(request.status, expectedStatus)
    assertEquals(response, expectedResponse)
  })
})
