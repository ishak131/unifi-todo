import { Request, Response } from "express";
import { todoRepository } from "../Repository/TodoRepository";
import { TodoModelInterface } from "../Model/TodoModel";
import ocError from "../utils/Error/OCError";
import { ErrorMessages } from "../utils/Error/ErrorsEnum";

class TodoController {
  // Add new todo for specific user
  async addTodo(
    user_id: string,
    title: string,
    description: string
  ): Promise<TodoModelInterface> {
    const todo = await todoRepository.addTodo(user_id, title, description);
    return todo;
  }

  // Update an existing todo for specific user
  async updateTodo(
    user_id: string,
    todo_id: string,
    title: string,
    description: string
  ): Promise<TodoModelInterface> {
    const todo = await todoRepository.updateTodo(
      user_id,
      todo_id,
      title,
      description
    );
    if (!todo) {
      return ocError
        .setStatus(404)
        .setMessage(ErrorMessages.TODO_IS_NOT_FOUND)
        .throw();
    }
    return todo;
  }

  // Delete an existing todo for specific user
  async deleteTodo(
    user_id: string,
    todo_id: string
  ): Promise<TodoModelInterface> {
    const todo = await todoRepository.deleteTodo(user_id, todo_id);
    if (!todo) {
      return ocError
        .setStatus(404)
        .setMessage(ErrorMessages.TODO_IS_NOT_FOUND)
        .throw();
    }
    return todo;
  }

  // Get todo information for specific user
  async getTodo(user_id: string, todo_id: string): Promise<TodoModelInterface> {
    const todo = await todoRepository.getTodo(user_id, todo_id);
    if (!todo) {
      return ocError
        .setStatus(404)
        .setMessage(ErrorMessages.TODO_IS_NOT_FOUND)
        .throw();
    }
    return todo;
  }

}

export const todoController = new TodoController();
