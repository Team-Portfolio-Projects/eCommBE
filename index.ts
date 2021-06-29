import express, { Application, Request, Response, NextFunction} from 'express';
const cors = require('cors');
const passport = require('passport')
const session = require('express-session')

const app: Application = express();

require('./config/passport')(passport)

app.use(session({
    secret: 'dog',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use(passport.session())

// Controllers
const userController = require('./controllers/user');
app.use('/api/user', userController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on ${port}`))