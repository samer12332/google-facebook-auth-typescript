import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth-routes';
import profileRouter from './routes/profile-routes';
import session from 'express-session';
import passport from 'passport';
import './config/passport-setup';
const app = express();
dotenv.config();

app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const dbUri: string | undefined = process.env.DBURI;
const finalDbUri: string = dbUri as string;
mongoose.connect(finalDbUri).then(() => { 
    console.log('Database connected');
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((err) => { 
    console.log(err);
});

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});


