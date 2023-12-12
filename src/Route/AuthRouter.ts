// routes/userRoutes.ts
import express, { Request, Response } from "express";
import { authController } from "../Controller/AuthController";
import ocError from "../utils/Error/OCError";

export const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await authController.registerUser(username, password);
    res.json({ token });
  } catch (error) {
    ocError.sendError(res, error);
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const token = await authController.loginUser(username, password);
    res.json({ token });
  } catch (error) {
    ocError.sendError(res, error);
  }
});
