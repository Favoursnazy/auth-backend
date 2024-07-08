import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/not-found-error";
import cookieParser from "cookie-parser";
// **************** ROUTES ****************
import { authRoutes, orgRoutes, usersRoutes } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/api", orgRoutes);
app.use("/api/users", usersRoutes);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
