const envPort = process.env.REACT_APP_POST_URL_PORT || '';
const postUrlPort = envPort ? `:${envPort}`: ''

export const config = {
  baseURL: `${window.location.protocol}//${window.location.hostname}${postUrlPort}` +
    process.env.REACT_APP_POST_URL_PATH_BASE,
  timeout: 5000,
}
