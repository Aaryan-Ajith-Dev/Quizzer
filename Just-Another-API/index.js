import express from 'express'
import cors from 'cors'
import AuthRouter from './routers/AuthRouter.js'
import connectDb from './config/db.js';
import AuthFilter from './config/AuthFilter.js';
import env from 'dotenv'

env.config();

const PORT = process.env.PORT;
const app = express();

let corsOptions = {
  origin: function (origin, callback) {
    if (origin && origin.startsWith(`http://localhost:${PORT}`)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors());
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

