import type { Response } from "express";

interface ErrorResponse {
  status: number;
  message: string;
}

export default function handleHttpError(error: unknown, res: Response) {
  const err = error as ErrorResponse;
  console.error(err?.message || error);
  res.status(err?.status || 500).send({ status: "FAILED", data: { error: err?.message || error } });
}
