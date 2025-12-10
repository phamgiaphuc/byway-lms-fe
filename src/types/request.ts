export type RequestStatus = "pending" | "completed" | "rejected";
export type RequestType = "teaching" | "category" | "support";

export type Request = {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: RequestType;
  status: RequestStatus;
  response?: string;
  createdAt: string;
  updatedAt: string;
};
