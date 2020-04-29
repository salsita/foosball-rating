import { Pool, QueryResultRow, PoolClient } from 'pg'
import * as dbConfig from './db-config'

const pool = new Pool(dbConfig.productionConfig)

type QueryValues = Array<string | number | boolean | Date>

export class Transaction {
  private active: boolean
  constructor(private client: PoolClient) {
    this.active = true
  }

  async executeQuery(query: string, values: QueryValues): Promise<Array<QueryResultRow>> {
    if (!this.active) {
      throw new Error('Attempting to execute query on an inactive transaction')
    }

    const res = await this.client.query(query, values)

    return res.rows
  }

  async executeSingleResultQuery(query: string, values: QueryValues):
  Promise<QueryResultRow | null> {
    const rows = await this.executeQuery(query, values)
    if (rows.length == 0) {
      return null
    }

    return rows[0]
  }

  async commit(): Promise<void> {
    this.active = false
    try {
      await this.client.query('COMMIT')
    } finally {
      this.client.release()
    }
  }

  async rollback(): Promise<void> {
    this.active = false
    try {
      await this.client.query('ROLLBACK')
    } catch (error) {
      console.error(error)
    } finally {
      this.client.release()
    }
  }
}

export const beginTransaction = async (): Promise<Transaction | null> => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
  } catch (error) {
    client.release()
    return null
  }

  return new Transaction(client)
}
