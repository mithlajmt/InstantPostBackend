const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Auth = require('./routes/Auth');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const post = require('./routes/post')
const dashboard = require('./routes/dashboard')
dotenv.config();


mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    app.listen(process.env.PORT, () => {
        console.log('Server connected', process.env.PORT);
    });
});

app.use(express.json());


const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETKEY
}, (jwtPayload, done) => {


    return done(null, jwtPayload);
}));

app.use('/', Auth); 
app.use('/post',post)
app.use('/dashboard',dashboard)

