import { Router, Request, Response } from "express";
import { todoController } from "../Controller/TodoController";
import { getUserFromToken } from "../Middleware/AuthMiddleware";
import ocError from "../utils/Error/OCError";
export const todoRouter = Router();

todoRouter.post("/", getUserFromToken, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const user_id = req.body.user._id;
    const todo = await todoController.addTodo(user_id, title, description);
    res.json({ todo });
  } catch (error) {
    ocError.sendError(res, error);
  }
});

// Update an existing todo for specific user
todoRouter.put("/:todo_id", getUserFromToken,async (req: Request, res: Response) => {
  try {
    const { todo_id } = req.params;
    const { title, description } = req.body;
    const user_id = req.body.user._id;
    const todo = await todoController.updateTodo(
      user_id,
      todo_id,
      title,
      description
    );
    res.json({ todo });
  } catch (error) {
    ocError.sendError(res, error);
  }
});

// Delete an existing todo for specific user
todoRouter.delete("/:todo_id", getUserFromToken,async (req: Request, res: Response) => {
  try {
    const { todo_id } = req.params;
    const user_id = req.body.user._id;
    const todo = await todoController.deleteTodo(user_id, todo_id);
    res.json({ todo });
  } catch (error) {
    ocError.sendError(res, error);
  }
});

// Get todo information for specific user
todoRouter.get(
  "/:todo_id",
  getUserFromToken,
  async (req: Request, res: Response) => {
    try {
      const { todo_id } = req.params;
      const user_id = req.body.user._id;
      const todo = await todoController.getTodo(user_id, todo_id);
      res.json({ todo });
    } catch (error) {
      ocError.sendError(res, error);
    }
  }
);

