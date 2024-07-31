const pool = require("./pool");

async function getAllMessages() {

    const { rows } = await pool.query(
        `SELECT 
            messages.id AS message_id,
            messages.text AS message_text,
            messages.date AS message_date,
            usernames.id AS user_id,
            usernames.username
        FROM messages
        JOIN usernames ON messages.user_id = usernames.id;
        `
    );

    return rows;
}

async function createNewMessage(newMessage) {
    
    const { user, text, added } = newMessage;

    //  Check if the user exists
    const userResult = await pool.query('SELECT id FROM usernames WHERE username = $1', [user]);

    let userId;

    if (userResult.rowCount > 0) {
       //   User exists get the user id
       userId = userResult.rows[0].id;
    } else {
        const innerUserResult = await pool.query('INSERT INTO usernames (username) VALUES ($1) RETURNING id', [user]);
        userId = innerUserResult.rows[0].id;
    }

    //  Insert the new message
    await pool.query('INSERT INTO messages (user_id, text, date) VALUES ($1, $2, $3)', [userId, text, added]);
}

module.exports = {
    getAllMessages,
    createNewMessage
}