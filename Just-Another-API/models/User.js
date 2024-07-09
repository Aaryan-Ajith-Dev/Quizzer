import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: { type: String, required:true },
    lastName: { type: String, required:true },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    profile_picture: String,
    password: { type: String, required: true },
    quizzes_made: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
    }],
    quizzes_attempted: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
    }],
    role: { type: String, required: true },
})

const User = mongoose.model('Users', UserSchema);
export default User;