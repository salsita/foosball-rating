import { Pool, PoolClient, QueryResultRow } from 'pg'

import { productionConfig, testConfig } from './db-config'
import { envHelpers } from '../../helpers/env-helpers'

const config = envHelpers.toBoolean(process.env.DB_PROD) ? productionConfig : testConfig
const pool: Pool = new Pool(config)

export interface ITransaction {
    executeQuery(query: string, values: Array<string>): Promise<Array<QueryResultRow>>

    executeSingleResultQuery(query: string, values: Array<string>): Promise<QueryResultRow>

    commit(): Promise<void>

    rollback(): Promise<void>
}

export class Transaction implements ITransaction {
    private client: PoolClient

    private active: boolean

    constructor(client: PoolClient) {
        this.client = client
        this.active = true
    }

    async executeQuery(query: string, values: Array<string>): Promise<Array<QueryResultRow>> {
        if (!this.active) {
            return Promise.reject(new Error('Attempting to execute query on an inactive transaction'))
        }
        const res = await this.client.query(query, values)
        return res.rows
    }

    async executeSingleResultQuery(query: string, values: Array<string>): Promise<QueryResultRow> {
        const rows = await this.executeQuery(query, values)
        if (rows.length === 0) {
            return Promise.reject(new Error('Single result query failed to return a result'))
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

export const beginTransaction = async (): Promise<ITransaction> => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
    } catch (error) {
        client.release()
        throw error
    }
    return new Transaction(client)
}
