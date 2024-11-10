import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/');
        }
    })
})



router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/profile");
});

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile']
}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

export default router;