const express = require('express');
const app = express();
const scoreTest = require('./score');

require('dotenv').config();

const cors = require('cors');

const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');
const { storeAuthToken, addUser, validateUser, getUserIq, doesUserExist } = require('./db');

const port = process.env.PORT || 3000;

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT_URI,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (!(await doesUserExist(profile.id))) {
            await addUser(profile.id, accessToken);
        } else {
            await storeAuthToken(profile.id, accessToken);
        }
        done(null, profile);
    } catch (err) {
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());

app.post('/test', async (req, res) => {
    const id = req.body.id;
    const answers = req.body.answers;
    const token = req.headers.authorization;
    const userId = req.headers.userid;
    const isUserValid = await validateUser(userId, token);
    if (!isUserValid) {
        return res.status(401).send('Unauthorized');
    }
    if (!id || !answers) {
        return res.status(400).sendStatus('Bad Request');
    }
    try {
        const score = scoreTest(answers);
        return res.status(200).json({ score });
    } catch (error) {
        return res.status(500).sendStatus('Internal Server Error');
    }
});

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    const accessToken = req.user ? req.user.accessToken : null;
    
    if (accessToken) {
        return res.json({ token: accessToken });
    } else {
        return res.status(500).send('Authentication failed');
    }
});
