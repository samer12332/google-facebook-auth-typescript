"use strict";
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
Object.defineProperty(exports, "__esModule", { value: true });
// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     googleId: {
//         type: String
//     },
//     facebookId: {
//         type: String
//     }
// });
// export default mongoose.model('User', userSchema);
// User-model.ts (or user.ts)
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    googleId: { type: String, required: false },
    facebookId: { type: String, required: false }
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
