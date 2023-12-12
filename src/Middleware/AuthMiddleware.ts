import { Request, Response, NextFunction } from "express";
import { authController } from "../Controller/AuthController";
import ocError from "../utils/Error/OCError";

export const getUserFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization");
    const user = await authController.processToken(token?.split("=")[1] as string);
    req.body.user = user;
    next();
  } catch (error) {
    ocError.sendError(res, error);
  }
};
