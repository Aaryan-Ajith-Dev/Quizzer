import express from 'express'

const QuizRouter = express.Router();

QuizRouter.post('/', (req, res) => {
    const quiz = req.body;
    // creating a quiz logic
    let response = null;
    response = createQuiz(quiz)
    res.status(response.status)
    res.body(response)
    res.send()
})


export default QuizRouter;