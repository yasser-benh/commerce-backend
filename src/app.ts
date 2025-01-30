import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDB";
import AppRouter from "./app.routers";
import { errorHandler } from "./middleware/eroorMiddleware";

dotenv.config();

export interface CustomRequest extends Request {
  user: {
    role: string;
    id: string;
    session_id: string;
  } | null;
}

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.use(errorHandler)
app.listen(port, async () => {
  await connectDB();
  AppRouter(app);

  console.log("server started on port :" + port);
});
