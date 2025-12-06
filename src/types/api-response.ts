export type ApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};
