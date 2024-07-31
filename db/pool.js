require('dotenv').config();

const { Pool } = require("pg");

const username = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const database = process.env.DB;
const port = process.env.DB_PORT;


module.exports = new Pool({
    connectionString: `postgresql://${username}:${password}@${host}:${port}/${database}`
})