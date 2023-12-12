import { Response } from 'express';
import { ErrorMessages } from './ErrorsEnum';

export default interface OCErrorInterface {
  getStatus(): number;
  getMessage(): ErrorMessages;
  getData(): object;
  setStatus(status: number): OCErrorInterface;
  setMessage(message: ErrorMessages): OCErrorInterface;
  setData(data: object): OCErrorInterface;
  sendError(response: Response, error: unknown): Response;
  reset():void;
  throw(): never;
}

export interface OCErrorContentInterface {
  status: number;
  message: ErrorMessages;
  data: object;
}
