import { Pool, QueryResultRow } from 'pg'
import * as dbConfig from './db-config'

const pool = new Pool(dbConfig.productionConfig)

export class Transaction {
  private active: boolean
  constructor(private client) {
    this.active = true
  }

  async executeQuery(query, values): Promise<Array<QueryResultRow>> {
    if (!this.active) {
      throw new Error('Attempting to execute query on an inactive transaction')
    }

    const res = await this.client.query(query, values)

    return res.rows
  }

  async executeSingleResultQuery(query, values): Promise<QueryResultRow> {
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

export const beginTransaction = async (): Promise<Transaction> => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
  } catch (error) {
    client.release()
    return null
  }

  return new Transaction(client)
}
