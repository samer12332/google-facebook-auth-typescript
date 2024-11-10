"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});
router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.send(err);
        }
        else {
            res.redirect('/');
        }
    });
});
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile']
}));
router.get("/google/redirect", passport_1.default.authenticate("google"), (req, res) => {
    res.redirect("/profile");
});
router.get('/facebook', passport_1.default.authenticate('facebook', {
    scope: ['public_profile']
}));
router.get('/facebook/redirect', passport_1.default.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});
exports.default = router;
