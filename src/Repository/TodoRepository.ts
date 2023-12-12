import { TodoModel, TodoModelInterface } from "../Model/TodoModel";

class TodoRepository {
  // Add new todo for specific user
  async addTodo(
    user_id: string,
    title: string,
    description: string
  ): Promise<TodoModelInterface> {
    const todo = await TodoModel.create({ user_id, title, description });
    return todo;
  }

  // Update an existing todo for specific user
  async updateTodo(
    user_id: string,
    todo_id: string,
    title: string,
    description: string
  ): Promise<TodoModelInterface | null> {
    const todo = await TodoModel.findOneAndUpdate(
      { _id: todo_id, user_id },
      { $set: { title, description } },
      { new: true }
    );
    return todo;
  }

  // Delete an existing todo for specific user
  async deleteTodo(
    user_id: string,
    todo_id: string
  ): Promise<TodoModelInterface | null> {
    const todo = await TodoModel.findOneAndDelete({ _id: todo_id, user_id });
    return todo;
  }

  // Get todo information for specific user
  async getTodo(
    user_id: string,
    todo_id: string
  ): Promise<TodoModelInterface | null> {
    const todo = await TodoModel.findOne({ _id: todo_id, user_id });
    return todo;
  }

 
}

export const todoRepository = new TodoRepository();
