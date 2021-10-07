const envPort = process.env.REACT_APP_POST_URL_PORT || ''
const envBasePath = process.env.REACT_APP_POST_URL_PATH_BASE || ''
const postUrlPort = envPort ? `:${envPort}` : ''

export const config = {
  baseURL: `${window.location.protocol}//${window.location.hostname}${postUrlPort}${envBasePath}`,
  timeout: 5000,
}
