// import { profile } from 'console';
const express = require('express');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const {ensureAuth, ensureGuest} = require('../middleware/session')
// const cors = require('cors')
// const passport = require('passport')
const router = express.Router();
// var corsOptions = {
//   origin: 'http://localhost:3001',
// }

router.post('/google/', async (req, res, next) => {
	const { token } = req.body;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
	console.log(ticket);
	const { name, email, picture, sub } = ticket.getPayload();

	const user = await User.updateOne(
		{ googleId: sub },
		{
			googleID: sub,
			displayName: name,
		},
		{ upsert: true }
	);
	req.session.userId = user.id;

	User.findOne({ displayName: name }).then((foundUser) => res.json(foundUser));
	res.status(201);
	// res.json(user)
});

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

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/');
});
module.exports = router;
