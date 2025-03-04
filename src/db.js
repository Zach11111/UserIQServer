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

function addUser(id, token) {
    console.log(id,token)
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO users (id, token) VALUES (?, ?)", [id, token], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


async function doesUserExist(id) {
    try {
        const row = await new Promise((resolve, reject) => {
            db.get("SELECT id FROM users WHERE id = ?", id, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        return row ? true : false;
    } catch (err) {
        throw err;
    }
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


function validateUser(id, token) {
    return new Promise((resolve, reject) => {
        db.get("SELECT id FROM users WHERE id = ? AND token = ?", id, token, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? true : false);
            }
        });
    });
}

function setIq(id, iq) {
    return new Promise((resolve, reject) => {
        db.run("UPDATE users SET iq = ? WHERE id = ?", iq, id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


module.exports = { addUser, getUserIq, storeAuthToken, doesUserExist, validateUser, setIq };
