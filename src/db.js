import {createPool} from 'mysql2/promise'
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
} from './config.js'

export const pool = await createPool({
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    user: DB_USER,
    port: DB_PORT
})

