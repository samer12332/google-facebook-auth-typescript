"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const dotenv_1 = __importDefault(require("dotenv"));
const User_model_1 = __importDefault(require("../models/User-model"));
dotenv_1.default.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findById(id);
        done(null, user === null || user === void 0 ? void 0 : user.id);
    }
    catch (error) {
        done(error);
    }
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENTID || '',
    clientSecret: process.env.CLIENTSECRET || ''
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(profile);
        const currentUser = yield User_model_1.default.findOne({ googleId: profile.id });
        if (currentUser) {
            done(null, currentUser);
        }
        else {
            const newUser = new User_model_1.default({
                username: profile.displayName,
                googleId: profile.id,
            });
            yield newUser.save();
            console.log('new user created:', newUser);
            done(null, newUser);
        }
    }
    catch (error) {
        console.error('Error during Google authentication:', error);
        done(error);
    }
})));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL: '/auth/facebook/redirect'
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(profile);
        const currentUser = yield User_model_1.default.findOne({ facebookId: profile.id });
        if (currentUser) {
            done(null, currentUser);
        }
        else {
            const newUser = new User_model_1.default({
                username: profile.displayName,
                facebookId: profile.id,
            });
            yield newUser.save();
            console.log('new user created:', newUser);
            done(null, newUser);
        }
    }
    catch (error) {
        console.error('Error during Google authentication:', error);
        done(error);
    }
})));
