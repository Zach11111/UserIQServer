const express = require('express');
const app = express();
const scoreTest = require('./score');
const doesUserIDExist = require('./utils').doesUserIDExist;
require('dotenv').config();

const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');
const { storeAuthToken } = require('./db');

const port = process.env.PORT || 3000;

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT_URI,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile.id, accessToken);
        await storeAuthToken(profile.id, accessToken);
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());

app.post('/test', async (req, res) => {
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

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});