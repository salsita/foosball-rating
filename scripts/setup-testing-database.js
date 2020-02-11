const { Pool } = require('pg')
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // "postgres://ttnovella:@localhost:5432/tnovella" //
})

const baseDirectory = './backend/db_migrations/'
const files = fs.readdirSync(baseDirectory)
const fileSortedByRevision = [...files.sort((file1, file2) => parseInt(file1) - parseInt(file2))]

const concatenatedMigrations = fileSortedByRevision.map(fileName => {
    const content = fs.readFileSync(path.join(baseDirectory, fileName))
    return content;
}).join(';\n')

const testDataPath = './backend/db_test/test_data.sql'
const initialData = fs.readFileSync(testDataPath)
const sqlToRun = concatenatedMigrations + initialData

async function main() {
    try {
        const client = await pool.connect()
        await client.query(sqlToRun)
        console.log('Database with testing data created');
    } catch(e) {
        console.error("Something went wrong", e);
    }
}
main()

