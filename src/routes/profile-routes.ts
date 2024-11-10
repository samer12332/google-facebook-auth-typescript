import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();

const authCheck = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) {
        res.redirect('/auth/login')
    } else {
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    res.render('profile', {user: req.user});
});

export default router;