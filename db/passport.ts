import * as mongoose from 'mongoose'
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

module.exports = function(passport: any) { 
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log(profile)
    }))
}
