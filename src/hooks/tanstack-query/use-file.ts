import { uploadSingle, uploadMultiple } from "@/services/file-service";
import { useMutation } from "@tanstack/react-query";

export const useUploadSingle = () => {
  return useMutation({
    mutationFn: uploadSingle,
  });
};

export const useUploadMultiple = () => {
  return useMutation({
    mutationFn: uploadMultiple,
  });
};
