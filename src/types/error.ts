import type { AxiosError } from "axios";

export interface CustomError extends AxiosError {
  data: {
    message: string;
  };
}
