import { describe, it } from '$std/testing/bdd.ts'
import { assertEquals } from '$std/assert/mod.ts'

describe('mock test', () => {
  it('should be true', () => {
    const result = true
    assertEquals(result, true)
  })
})
