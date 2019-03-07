import { config } from './client-config'

const axios = require('axios')

export const client = axios.create(config);

