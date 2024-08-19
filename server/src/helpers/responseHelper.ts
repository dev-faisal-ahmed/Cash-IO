import { Response } from 'express';

type TMeta = { page: number; limit: number; total: number; totalPages: number };
type TSuccessResponse = {
  data: any;
  meta?: TMeta;
  message: string;
  status: number;
};

type TErrorResponse = { error: any; message: string; status: number };

export const sendSuccessResponse = (res: Response, args: TSuccessResponse) => {
  const { status, message, meta, data } = args;
  return res.status(status).json({ ok: true, message, meta, data });
};

export const sendErrorResponse = (res: Response, args: TErrorResponse) => {
  const { status, message, error } = args;
  return res.status(status).json({ ok: false, message, error });
};
