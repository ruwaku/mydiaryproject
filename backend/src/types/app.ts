import { Response } from "express";

export interface ApiError {
  display?: string;
  code?: string | number;
  debug?: any;
}
export interface ApiJSON {
  ok: boolean;
  error?: ApiError;
  payload?: any;
}
