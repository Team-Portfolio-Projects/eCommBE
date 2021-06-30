import express, { Request, Response, NextFunction} from 'express';


const router = express.Router();

// interface UserInterface {
//     Id: number,
//     Username: string,
//     Password: string,
//     Purchased: Array<string>
// }

// router.post('/signin', (req: Request, res: Response, next: NextFunction) => {
//     User.findOne({ email: req.body.email })
//         .then((user: UserInterface) => console.log('gotem'))
//         //.then((token) => res.json({ token }))
//         .catch(next);
// });

// router.post('/signup', async (req, res, next) => {
//     try {
//         const password = await bcrypt.hash(req.body.password, 10);
//         const email = req.body.email;
//         const user = await User.create({ email, password });
//         res.status(201).json(user);
//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = router;