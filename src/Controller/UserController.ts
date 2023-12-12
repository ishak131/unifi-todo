import { UserModel, UserModelInterface } from "../Model/UserModel";
import { userRepository } from "../Repository/UserRepository";
import { hashPassword } from "../utils/Password/password";

class UserController {
  async create(
    username: string,
    password: string
  ): Promise<UserModelInterface> {
    const hashedPassword = await hashPassword(password);
    return await userRepository.create(username, hashedPassword);
  }

  async findOneByUsername(
    username: string
  ): Promise<UserModelInterface | null> {
    return await userRepository.findOneByUsername(username);
  }

  async findById(user_id: string): Promise<UserModelInterface | null> {
    return await userRepository.findById(user_id);
  }
}

export const userController = new UserController();
