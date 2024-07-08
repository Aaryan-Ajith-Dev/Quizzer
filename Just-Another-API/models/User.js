import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: { type: String, unique: true, required:true },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    profile_picture: String,
    password: {type: String, required: true},
    role: {type: String, required: true}
})

const User = mongoose.model('Users', UserSchema);
export default User;