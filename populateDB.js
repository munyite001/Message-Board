#!/usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const username = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const database = process.env.DB;
const port = process.env.PORT;


const SQL = `
    INSERT INTO messages (text, date, user_id)
    VALUES ($1, NOW(), $2),
           ($3, NOW(), $4),
           ($5, NOW(), $6);
`;

const values = [
    'Hello, World!', 1,
    'Hello Message Board', 2,
    "What's up Party People?", 3
];

async function main() {
    console.log("Seeding . . .");
    const client = new Client({
        connectionString: `postgresql://${username}:${password}@${host}:${port}/${database}`
    });
    try {
        await client.connect();
        await client.query(SQL, values);
        await client.end();
        console.log("Seeding complete!");
    } catch (error) {
        console.error("Error: ", error);
    }
}

main();