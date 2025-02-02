import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!!");
  }
  app.listen(3000, () => {
    console.log("listening on port 3000!!");
  });
};

start();
