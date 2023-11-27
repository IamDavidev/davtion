import { load } from '$std/dotenv/mod.ts'

const envs = {
  API_VERSION_PREFIX: 'API_VERSION_PREFIX',
  PORT: 'PORT',
  DATABASE_URL: 'DATABASE_URL',
  DATABASE_TOKEN: 'DATABASE_TOKEN'
}

const defaultEnvs = {
  API_VERSION_PREFIX: 'v1',
  PORT: 8080,
  DATABASE_URL: null,
  DATABASE_TOKEN: null
}

const envsKeys = Object.keys(envs) as (keyof typeof envs)[]

type ENV = Record<(typeof envsKeys)[number], string>

export const env = (await load()) as ENV

export const API_VERSION_PREFIX =
  env.API_VERSION_PREFIX ?? defaultEnvs.API_VERSION_PREFIX

export const PORT = Number(env.PORT) ?? defaultEnvs.PORT

export const DATABASE_URL = env.DATABASE_URL ?? defaultEnvs.DATABASE_URL
export const DATABASE_TOKEN = env.DATABASE_TOKEN ?? defaultEnvs.DATABASE_TOKEN
