import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useUploadMultiple } from "@/hooks/tanstack-query/use-file";
import { getExtFileIcon } from "@/lib/helpers";
import type { File } from "@/types/file";
import { Link } from "@tanstack/react-router";
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

type FileDropzoneProps = {
  files: File[];
  dropzoneOptions?: DropzoneOptions;
  folder?: string;
  label?: string;
  subLabel?: string;
  onFilesChange: (files: File[]) => void;
};

export const defaultFileDropzoneOptions: DropzoneOptions = {
  accept: {
    "image/*": [".jpg", ".svg", ".png"],
  },
  maxFiles: 1,
  maxSize: 10 * 1024 * 1024,
};

const FileDropzone = ({
  files,
  dropzoneOptions = defaultFileDropzoneOptions,
  folder,
  label = "Choose a file or drag & drop it here",
  subLabel = "JPEG, PNG, and SVG formats, up to 10MB",
  onFilesChange,
}: FileDropzoneProps) => {
  const [currentFiles, setCurrentFiles] = useState<File[]>(files);
  const { mutate, isPending } = useUploadMultiple();

  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneOptions,
    onDrop: async (files) => {
      mutate(
        {
          files: files,
          folder: folder,
        },
        {
          onSuccess: (response) => {
            const data: File[] = response.data.map((file) => ({
              id: file.name.replace(`.${file.ext}`, ""),
              ...file,
            }));
            setCurrentFiles(data);
            onFilesChange(data);
          },
          onError: (err) => {
            console.error("Upload error:", err);
          },
        },
      );
    },
  });

  const onDeleteFile = (deletedFile: File) => {
    const files = currentFiles.filter((file) => file.id !== deletedFile.id);
    setCurrentFiles(files);
    onFilesChange(files);
  };

  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border-input hover:bg-accent/50 flex h-32 cursor-pointer items-center rounded-md border border-dashed bg-transparent px-3 py-1 text-sm shadow-xs transition-colors"
      >
        {isPending && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
            <Spinner className="size-6" />
            <p className="mt-2 text-sm">Uploading files...</p>
          </div>
        )}
        <div className="flex w-full flex-col items-center text-center">
          <UploadCloud />
          <div className="mt-2 space-y-1">
            <p>{label}</p>
            <p className="text-muted-foreground">{subLabel}</p>
          </div>
        </div>
        <input {...getInputProps()} />
      </div>
      <div className="mt-2 space-y-2">
        {currentFiles.map((file) => (
          <Link
            to={file.url}
            target="_blank"
            key={file.id}
            className="rouned-md relative flex items-center gap-2 rounded-md bg-gray-100 p-3 shadow-xs transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="relative size-14 overflow-hidden">
                <img
                  src={getExtFileIcon(file.ext)}
                  alt={file.name}
                  className="h-full object-cover object-center"
                />
              </div>
              <div>
                <Label className="font-normal">{file.name}</Label>
              </div>
            </div>
            <div className="ml-auto">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteFile(file);
                }}
                size="icon-sm"
                variant="ghost"
                className="hover:bg-destructive/10"
              >
                <X className="text-destructive" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FileDropzone;
