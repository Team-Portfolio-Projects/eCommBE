// import { profile } from 'console';
import express, {Request,Response,NextFunction } from 'express';
import User from '../models/user'
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// const {ensureAuth, ensureGuest} = require('../middleware/session')
// const cors = require('cors')
// const passport = require('passport')
const router = express.Router()
// var corsOptions = {
//   origin: 'http://localhost:3001',
// }



router.post('/google/',async (req:any,res,next)=>{
    const {token} = req.body
        const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();    

    const user = await User.updateOne(
        {displayName: name},{
            displayName: name,
        },
        {upsert: true}
    )
    req.session.userId = user.id
    

    User.findOne({ displayName: name }).then((foundUser:any)=> res.json(foundUser))
    res.status(201)
    // res.json(user)

} )








// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))




// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
// (req, res:any) => {
//     res.json(res.socket.parser.incoming.user.id)
// })




// //Log out User
// router.get('/user',(req:any,res,next)=>{
//     User.find()
// 		.then((users:any) => res.json(users))
// 		.catch(next)
//         // console.log(req.socket)
// })




router.get('/logout', (req: any , res: Response,next:NextFunction)=>{
    req.logout()
    res.redirect('/')
    
})
module.exports = router