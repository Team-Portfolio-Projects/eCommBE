// import User from '../models/user'
// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
// // const User = require('../models/User')
// interface UserFace{
//   id: string,
//   displayName: string,
//   googleId:  string,
// 	purchased: string[]
// }

// module.exports = function(passport: any) { 
//     passport.use(new GoogleStrategy({
//         clientID: ,
//         clientSecret: ,
//         callbackURL: '/auth/google/callback'
//     },
//     async (accessToken: any, refreshToken: any, profile: any, done: any) => {
//       const newUser = {
//         displayName: profile.displayName,
//         googleId: profile.id,
//       }  
//       try {
//         let user = await User.findOne({googleId: profile.id})

//         if(user){
  
//           done(null,user)

//         }else {
//           user = await User.create(newUser)
//           done(null,user)
//         }
//       } catch (err){
//         console.log(err)
//       }
      

//     }))
//     passport.serializeUser((user: UserFace, done:any)=>
//       done(null, user.id)
//     )
//     passport.deserializeUser((id:string,done:any)=>
//       User.findById(id,(err:any,user:UserFace)=>done(err,user))
//     )
// }
