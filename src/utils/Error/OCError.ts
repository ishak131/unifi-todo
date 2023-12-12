import { Response } from 'express';
import OCErrorAbstract from './OCErrorAbstract';
import { OCErrorContentInterface } from './OCErrorInterface';

class OCError extends OCErrorAbstract {
  public sendError(response: Response, error: unknown): Response<any> {
    const status = this.getStatus();
    if (status >= 100 && status < 600) {
      const error: OCErrorContentInterface = this.getError();
      this.reset();
      return response.status(status).send(error);
    }
    return response.status(400).send(error);
  }

  public throw(): never {
    throw new Error(this.getMessage().toString());
  }
}
const ocError = new OCError();
export default ocError;
