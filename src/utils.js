require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const fetch = require('node-fetch');

async function doesUserIDExist(userId) {
    const url = `https://discord.com/api/v10/users/${userId}`;
    const headers = {
      Authorization: `Bot ${token}`,
    };
  
    try {
      const res = await fetch(url, { method: 'GET', headers: headers });
      if (res.ok) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error('Error:', err);
    }
}


module.exports = { doesUserIDExist };