import config from './client-config'

const axios = require('axios')

const client = axios.create(config);

export default client
