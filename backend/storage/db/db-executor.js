const { Pool } = require('pg')
const dbConfig = require('./db-config')

const pool = new Pool(dbConfig.config)

exports.executeQuery = async (query, values) => {
    const client = await pool.connect()
    try {
        const res = await client.query(query, values)
        return res.rows
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
}

exports.executeSingleResultQuery = async (query, values) => {
    const rows = await exports.executeQuery(query, values)
    if (rows.length == 0) {
        return null
    }

    return rows[0]
}
