import { load } from '$std/dotenv/mod.ts'

const envs = {
  API_VERSION_PREFIX: 'API_VERSION_PREFIX',
  PORT: 'PORT'
}

const defaultEnvs = {
  API_VERSION_PREFIX: 'v1',
  PORT: 8080
}

const envsKeys = Object.keys(envs) as (keyof typeof envs)[]

export const env = (await load()) as Record<(typeof envsKeys)[number], string>

export const API_VERSION_PREFIX =
  env.API_VERSION_PREFIX ?? defaultEnvs.API_VERSION_PREFIX

export const PORT = Number(env.PORT) ?? defaultEnvs.PORT
