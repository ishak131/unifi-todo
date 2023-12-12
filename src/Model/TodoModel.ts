import mongoose, { Document, Schema } from "mongoose";

export interface TodoModelInterface extends Document {
  user_id: string;
  title: string;
  description: string;
}

const TodoSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const TodoModel = mongoose.model<TodoModelInterface>("Todo", TodoSchema);
