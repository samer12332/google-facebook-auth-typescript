import passport, {} from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as facebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import User, { IUser } from '../models/User-model';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, (user as IUser).id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id) as IUser;
        done(null, user?.id);
    } catch (error) {
        done(error);
    }
});



passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENTID || '',
    clientSecret: process.env.CLIENTSECRET || ''
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const currentUser = await User.findOne({ googleId: profile.id }) as IUser;
        if (currentUser) {
            done(null, currentUser);
        } else {
            const newUser = new User({
                username: profile.displayName,
                googleId: profile.id,
            }) as IUser;
            await newUser.save();
            console.log('new user created:', newUser);
            done(null, newUser);
        }
    } catch (error) {
        console.error('Error during Google authentication:', error);
        done(error);
    }
}));


passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_CLIENTID as string,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET as string,
    callbackURL: '/auth/facebook/redirect'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const currentUser = await User.findOne({ facebookId: profile.id }) as IUser;
        if (currentUser) {
            done(null, currentUser);
        } else {
            const newUser = new User({
                username: profile.displayName,
                facebookId: profile.id,
            }) as IUser;
            await newUser.save();
            console.log('new user created:', newUser);
            done(null, newUser);
        }
    } catch (error) {
        console.error('Error during Google authentication:', error);
        done(error);
    }
}))
