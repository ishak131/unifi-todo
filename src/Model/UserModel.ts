import mongoose, { Document, Schema } from 'mongoose';

export interface UserModelInterface extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<UserModelInterface>('User', UserSchema);
export {UserModel}
