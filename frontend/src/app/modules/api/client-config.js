export const config = {
  baseURL: `${window.location.protocol}//${window.location.hostname}` +
    `${process.env.REACT_APP_POST_URL_PORT !== "" 
        ? ':' + process.env.REACT_APP_POST_URL_PORT : ''}` +
    `${process.env.REACT_APP_POST_URL_PATH_BASE}`,
  timeout: 5000,
}
