const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../db/db.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Could not connect to database", err);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, iq INTEGER)");
});

function addUser(id, iq) {
    db.run("INSERT INTO users (id, iq) VALUES (?, ?)", id, iq);
}

function getUserIq(id) {
    return new Promise((resolve, reject) => {
        db.get("SELECT iq FROM users WHERE id = ?", id, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.iq : null);
            }
        });
    });
}

module.exports = { addUser, getUserIq };
