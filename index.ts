import express, { Application} from 'express';
const cors = require('cors')

const passport = require('passport')
const session = require('express-session')

const app: Application = express();

require('./middleware/passport')(passport)

app.use(session({
    secret: 'dog',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())
const requestLogger = require('./middleware/request_logger');
// Controllers
const userController = require('./controllers/users');
app.use('/api/user', userController);

const authController = require('./controllers/auth');
app.use('/auth', authController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on ${port}`))