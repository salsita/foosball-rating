const { Pool } = require('pg')
const dbConfig = require('./db-config.js')

const pool = new Pool(dbConfig.config)

const executeQuery = async (query, values) => {
    const client = await pool.connect()
    try {
        const res = await client.query(query, values)
        return res
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
}

exports.executeSingleResultQuery = async (query, values, rowResultExtractor) => {
    const result = await dbExecutor.executeQuery(query, values)
    if (result.rowCount == 0) {
        return null
    }

    return rowResultExtractor(result.rows[0])
}

exports.executeMultiResultQuery = async (query, values, rowResultExtractor) => 
    dbExecutor.executeQuery(query, values)
        .then(result => result.rows.map(row => rowResultExtractor(row)))