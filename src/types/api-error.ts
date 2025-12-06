export type ApiError = Error & {
  message: string;
  status: boolean;
  errors: any[];
};
