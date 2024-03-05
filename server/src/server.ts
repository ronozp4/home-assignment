import express, { Express, Request, Response } from "express";
import cors from "cors";
import users from './routes/users'
import posts from './routes/posts'

const app: Express = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});

//routes
app.use('/users',users)
app.use('/posts',posts)

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
