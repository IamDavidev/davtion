import { API_VERSION_PREFIX } from '@config/env.config.ts'

export const genRoute = (path: string) => `/api/${API_VERSION_PREFIX}/${path}`

export const ROUTES = {
  IMAGE: {
    UPLOAD: genRoute('image-upload')
  }
}
