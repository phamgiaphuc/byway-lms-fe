import { useUploadMultiple } from "@/hooks/tanstack-query/use-file";
import type { UploadMultipleResponse } from "@/types/file";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

type FileDropzoneProps = {
  dropzoneOptions?: DropzoneOptions;
  folder?: string;
  onFilesChange: (files: UploadMultipleResponse) => void;
};

export const defaultFileDropzoneOptions: DropzoneOptions = {
  accept: {
    "image/*": [".jpg", ".jpeg", ".png"],
  },
  maxFiles: 1,
  maxSize: 10 * 1024 * 1024,
};

const FileDropzone = ({
  dropzoneOptions = defaultFileDropzoneOptions,
  folder,
  onFilesChange,
}: FileDropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { mutate } = useUploadMultiple();

  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneOptions,
    onDrop: async (files) => {
      setFiles(files);
      mutate(
        {
          files: files,
          folder: folder,
        },
        {
          onSuccess: (response) => onFilesChange(response.data),
          onError: (err) => {
            console.error("Upload error:", err);
          },
        },
      );
    },
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="border-input hover:bg-accent/50 flex h-24 cursor-pointer items-center rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs"
    >
      <div className="text-muted-foreground flex w-full flex-col items-center gap-1 text-center">
        <UploadCloud />
        <p>Drag 'n' drop some files here, or click to select files.</p>
      </div>
      <input {...getInputProps()} />
    </div>
  );
};

export default FileDropzone;
