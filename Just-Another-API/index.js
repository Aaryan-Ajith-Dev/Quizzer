import express from 'express'
import cors from 'cors'
import AuthRouter from './routers/AuthRouter.js'
import connectDb from './config/db.js';
import AuthFilter from './config/AuthFilter.js';
import env from 'dotenv'

env.config()

const PORT = process.env.PORT
const app = express();

var corsOptions = {
  origin: `http://localhost:${PORT}`,
  optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', AuthRouter);
app.use(AuthFilter);

connectDb();

app.get('/', (req, res) => {
  res.send("App is working");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

