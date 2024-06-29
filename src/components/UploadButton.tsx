"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { Progress } from "./ui/progress";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<Boolean | null>(true);
  const [uploadingProgress, setUploadingProgress] = useState<number>(0);

  // simulated progress bar
  const startSimulatedProgress = () => {
    setUploadingProgress(0);

    const interval = setInterval(() => {
      setUploadingProgress((prev): number => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }

        return prev + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <>
      <Dropzone
        multiple={false}
        onDrop={(acceptedFile) => {
          setIsUploading(true);

          const progressInterval = startSimulatedProgress();

          // handle file upload

          clearInterval(progressInterval);
          setUploadingProgress(100);
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => {
          return (
            <div
              {...getRootProps()}
              className="border h-64 m-4 border-dashed rounded-lg border-gray-300"
            >
              <div className="flex items-center w-full h-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center rounded-lg w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Cloud className="size-6 text-zinc-500 mb-2" />
                    <p className="mt-2 text-sm text-zinc-700">
                      <span className="font-semibold">Click to upload </span>
                      <span>or drag n drop</span>
                    </p>
                    <p className="text-xs text-zinc-500">PDF (upto 4MB)</p>
                  </div>

                  {acceptedFiles && acceptedFiles[0] ? (
                    <>
                      <div className="max-w-xs bg-white flex overflow-hidden rounded-md items-center outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                        <div className="px-3 py-2 h-full grid place-items-center">
                          <File className="size-4 text-blue-500" />
                        </div>
                        <div className="truncate text-sm py-2 px-3">
                          {acceptedFiles[0].name}
                        </div>
                      </div>
                    </>
                  ) : null}

                  {/* loading state */}

                  {isUploading ? (
                    <>
                      <div className="w-full mt-4 max-w-xs mx-auto">
                        <Progress
                          value={uploadingProgress}
                          className="h-1 w-full bg-zinc-200"
                        />
                      </div>
                    </>
                  ) : null}
                </label>
              </div>
            </div>
          );
        }}
      </Dropzone>
    </>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(v: any) => {
          if (!v) setIsOpen(v);
        }}
      >
        <DialogTrigger asChild onClick={() => setIsOpen(true)}>
          <Button>Upload PDF</Button>
        </DialogTrigger>
        <DialogContent>
          <UploadDropzone />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadButton;

// todo: configure uploadthing to save the uploaded files on the next server
