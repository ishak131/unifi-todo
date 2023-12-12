import { Response } from 'express';
import OCErrorInterface, { OCErrorContentInterface } from './OCErrorInterface';
import { ErrorMessages } from './ErrorsEnum';

abstract class OCErrorAbstract implements OCErrorInterface {
  private status = 0;
  private message: ErrorMessages = ErrorMessages.NULL;
  private data: object = {};

  public getError(): OCErrorContentInterface {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }

  public getStatus(): number {
    return this.status;
  }
  public getMessage(): ErrorMessages {
    return this.message;
  }
  public getData(): object {
    return this.data;
  }
  public setStatus(status: number): OCErrorInterface {
    if (this.status)
      return this
    this.status = status;
    return this;
  }
  public setMessage(message: ErrorMessages): OCErrorInterface {
    console.error(message);
    if (this.message)
      return this
    this.message = message;
    return this;
  }
  public setData(data: object): OCErrorInterface {
    this.data = data;
    return this;
  }
  public reset(): void {
    this.status = 0;
    this.message = ErrorMessages.NULL;
    this.data = {};
  }
  public abstract sendError(response: Response, error: unknown): Response<any>;
  public abstract throw(): never;
}

export default OCErrorAbstract;
