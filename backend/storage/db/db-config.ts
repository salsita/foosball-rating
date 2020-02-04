import { envHelpers as envHelpers } from '../../helpers/env-helpers'

export const testConfig = {
  host: process.env.DB_TEST_HOST,
  port: envHelpers.toNumber(process.env.DB_TEST_PORT),
  database: process.env.DB_TEST_DB,
  user: process.env.DB_TEST_USER,
  password: process.env.DB_TEST_PASS,
}

export const productionConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
  }
  : {
    host: process.env.DB_PROD_HOST,
    port: envHelpers.toNumber(process.env.DB_PROD_PORT),
    database: process.env.DB_PROD_DB,
    user: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASS,
    ssl: envHelpers.toBoolean(process.env.DB_PROD_SSL),
  }
