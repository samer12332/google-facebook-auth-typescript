"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    else {
        next();
    }
};
router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });
});
exports.default = router;
