const addUser = require('./db').addUser;
const getUserIq = require('./db').getUserIq;
const doesUserIDExist = require('./utils').doesUserIDExist;
require('dotenv').config();

getUserIq(678987654).then(async iq => {
    console.log(iq);

    const test = await doesUserIDExist("765432")

console.log(test);


});



fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: '12345',
      answers: [1, 2, 3, 4, 5]
    })
  })
    .then(response => response.text())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  