import express from 'express'
import { createQuiz, getQuiz, updateQuiz, deleteQuiz } from '../services/QuizService.js';
import { getUserFromToken } from '../services/UserService.js';

const QuizRouter = express.Router();

QuizRouter.put('/', async (req, res) => {
    const header = req.headers;
    const token = header.authorization.substring(7);
    const userRes = await getUserFromToken(token);
    const quiz = req.body;
    // creating a quiz logic
    let response = null;
    response = await createQuiz(quiz, userRes.user)
    res.status(response.status)
    res.send(response)
})

QuizRouter.get('/:id', async (req, res) => {
    let response = null;
    response = await getQuiz(req.params.id)
    res.status(response.status)
    res.send(response)
})

QuizRouter.post('/', async (req, res) => {
    let response = null;
    response = await updateQuiz(req.body)
    res.status(response.status)
    res.send(response)
})

QuizRouter.delete('/:id', async (req, res) => {
    let response = null;
    response = await deleteQuiz(req.params.id)
    res.status(response.status)
    res.send(response)
})

export default QuizRouter;