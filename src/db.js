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
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, iq INTEGER, token TEXT)");
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

function storeAuthToken(userId, token) {
    return new Promise((resolve, reject) => {
        db.run("UPDATE users SET token = ? WHERE id = ?", token, userId, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


module.exports = { addUser, getUserIq, storeAuthToken };
