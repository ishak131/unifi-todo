import { UserModel, UserModelInterface } from "../Model/UserModel";

class UserRepository {
  async findOneByUsername(
    username: string
  ): Promise<UserModelInterface | null> {
    return await UserModel.findOne({ username });
  }

  async findById(user_id: string): Promise<UserModelInterface | null> {
    return await UserModel.findById(user_id);
  }

  async create(
    username: string,
    password: string
  ): Promise<UserModelInterface> {
    return await UserModel.create({ username, password });
  }
}

export const userRepository = new UserRepository();
