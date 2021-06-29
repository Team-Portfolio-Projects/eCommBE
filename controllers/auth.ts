import express, { Request, Response, NextFunction} from 'express';
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
    res.redirect('/dashboard')
})

module.exports = router