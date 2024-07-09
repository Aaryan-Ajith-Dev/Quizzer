import mongoose from "mongoose";

const QuizSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    team_size: { type: String, default: 1, required: true },
    elements: [{
        question: String,
        noOfOptions: Number,
        options: [{
            value: String,
            isAnswer: Boolean
        }],
    }]
})

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;