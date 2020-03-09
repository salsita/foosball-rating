const { Pool } = require('pg')
const dbConfig = require('./db-config')

const pool = new Pool(dbConfig.productionConfig)

class Transaction {
    constructor(client) {
        this.client = client
        this.active = true
    }

    async executeQuery(query, values) {
        if (!this.active) {
            throw new Error("Attempting to execute query on an inactive transaction")
        }

        const res = await this.client.query(query, values)
        
        return res.rows
    }

    async executeSingleResultQuery(query, values) {
        const rows = await this.executeQuery(query, values)
        if (rows.length == 0) {
            return null
        }
    
        return rows[0]
    }

    async commit() {
        this.active = false
        try {
            await this.client.query('COMMIT')
        } finally {
            this.client.release()
        }
    }

    async rollback() {
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

exports.beginTransaction = async () => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
    } catch (error) {
        client.release()
        return null
    }

    return new Transaction(client)
}
