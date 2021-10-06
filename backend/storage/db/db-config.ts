import { PoolConfig } from 'pg'

export const testConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'XXXX',
  port: 5432,
}

export let productionConfig: PoolConfig
if (process.env.DATABASE_URL) {
  productionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {} # otherwise NODE_TLS_REJECT_UNAUTHORIZED has no effect
  }
} else {
  productionConfig = {
    user: 'rwarcmrtvowmie',
    host: 'ec2-54-75-232-114.eu-west-1.compute.amazonaws.com',
    database: 'd4fdcat6vlkd1k',
    password: '94b49764bb25dc4aaa182327a4b20f8c764feaf5b9c18488b632de67b896ebd4',
    port: 5432,
    ssl: true,
  }
}
