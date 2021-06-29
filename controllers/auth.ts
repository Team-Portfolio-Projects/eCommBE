import express, {Request,Response,NextFunction } from 'express';
import { resolveTypeReferenceDirective } from 'typescript';

const passport = require('passport')
const router = express.Router()
var corsOptions = {
  origin: 'http://localhost:3002',
}
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res:any) => {
    res.json(res.socket.parser.incoming.user.id)
})
 
//Log out User

router.get('/logout', (req: any , res: Response,next:NextFunction)=>{
    req.logout()
    res.redirect('/')
    
})
module.exports = router