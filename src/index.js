const express = require('express');
const app = express();
const scoreTest = require('./score');

const doesUserIDExist = require('./utils').doesUserIDExist;
require('dotenv').config();


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


  app.use(express.json());
  app.post('/register', async (req, res) => {
    const id = req.body.id;
    const answers = req.body.answers;
    if (!id || !answers) {
      return res.status(400).sendStatus('Bad Request');
    }
    if (await doesUserIDExist(id.toString()) === false) {
      return res.status(404).send('User not found');
    }
    try {
      const score = scoreTest(answers);
      return res.status(200).json({ score });
    } catch (error) {
      return res.status(500).sendStatus('Internal Server Error');
    }
  });
  
  