import jwt, { JwtPayload } from "jsonwebtoken";
// controllers/userController.ts
import { ErrorMessages } from "../utils/Error/ErrorsEnum";
import ocError from "../utils/Error/OCError";
import { comparePasswords } from "../utils/Password/password";
import { userController } from "./UserController";

class AuthController {
  getPrivateKey(): string {
    return process.env.PRIVATE_KEY as string;
  }

  createMyToken(decodedToken: object): string {
    const token = jwt.sign(decodedToken, this.getPrivateKey());
    if (!token)
      return ocError
        .setStatus(505)
        .setMessage(ErrorMessages.INTERNAL_SERVER_ERROR)
        .throw();
    return token;
  }

  async registerUser(username: string, password: string): Promise<string> {
    // Save the user to the database
    const user = await userController.create(username, password);
    const { _id } = user;
    const token = this.createMyToken({
      password,
      username,
      _id,
    });
    return token;
  }

  async loginUser(username: string, password: string): Promise<string | null> {
    const user = await userController.findOneByUsername(username);
    if (user && (await comparePasswords(password, user.password))) {
      const { _id } = user;
      const token = this.createMyToken({
        password,
        username,
        _id,
      });
      return token;
    } else {
      return ocError
        .setStatus(401)
        .setMessage(ErrorMessages.INVALID_CREDENTIALS)
        .throw();
    }
  }

  async processToken(userToken: string): Promise<string | JwtPayload> {
    try {
      const privateKey = this.getPrivateKey();
      const decodedToken = jwt.verify(userToken, privateKey) as JwtPayload;
      return decodedToken;
    } catch (error) {
      return ocError
        .setStatus(401)
        .setMessage(ErrorMessages.USER_TOKEN_IS_INVALID)
        .throw();
    }
  }
}

const authController = new AuthController();

export { authController };
