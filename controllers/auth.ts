import { profile } from 'console';
import express, {Request,Response,NextFunction } from 'express';
import User from '../models/User'
const {ensureAuth, ensureGuest} = require('../middleware/session')
const cors = require('cors')
const passport = require('passport')
const router = express.Router()
var corsOptions = {
  origin: 'http://localhost:3001',
}
router.get('/google', passport.authenticate('google', { scope: ['profile'] }) ,(req,res)=>{res.json(profile)})

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res:any) => {
    res.json(res.socket.parser.incoming.user.id)
})
 
//Log out User
router.get('/user',ensureGuest,(req:any,res,next)=>{
    User.find()
		.then((users:any) => res.json(users))
		.catch(next)
        console.log(req)
})
router.get('/logout', (req: any , res: Response,next:NextFunction)=>{
    req.logout()
    res.redirect('/')
    
})
module.exports = router