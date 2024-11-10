"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const profile_routes_1 = __importDefault(require("./routes/profile-routes"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./config/passport-setup");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const dbUri = process.env.DBURI;
const finalDbUri = dbUri;
mongoose_1.default.connect(finalDbUri).then(() => {
    console.log('Database connected');
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});
app.use('/auth', auth_routes_1.default);
app.use('/profile', profile_routes_1.default);
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});
