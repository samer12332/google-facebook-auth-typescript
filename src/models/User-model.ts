// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

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
import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    googleId: string;
    facebookId: string
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    googleId: { type: String, required: false },
    facebookId: {type: String, required: false}
});

const User: Model<IUser> = model<IUser>('User', UserSchema);
export default User;



