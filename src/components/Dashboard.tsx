"use client";

import { useState } from "react";
import Link from "next/link";
import { Ghost, Plus, MessageSquare, Trash, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns/format";

const Dashboard = () => {
  const [currentlyDeletedFile, setCurrentlyDeletedFile] = useState<
    string | null
  >(null);

  const utils = trpc.useUtils();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  /**
   * Deletes a file and invalidates the user's files cache upon success.
   * @remarks
   * This function is used to delete a file and trigger a cache invalidation for the user's files.
   * @param {string} fileId - The ID of the file to be deleted.
   */
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletedFile(id);
    },
    onSettled() {
      setCurrentlyDeletedFile(null);
    },
  });

  return (
    <>
      <main className="mx-auto md:p-10 max-w-7xl">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-gray-200 border-b pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>
          <UploadButton />
        </div>
      </main>
      {/* display all the user files */}
      <div>
        {files && files.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3 px-6">
            {files
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((file) => {
                return (
                  <>
                    <li
                      key={file.id}
                      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
                    >
                      <Link
                        href={`/dashboard/${file._id}`}
                        className="flex flex-col gap-2"
                      >
                        <div className="pt-6 px-6 flex w-full justify-between space-x-6 items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                          <div className="flex-1 turnacate">
                            <div className="flex items-center space-x-3">
                              <h3 className="truncate text-lg font-medium text-zinc-900">
                                {file.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="mt-4 px-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs tezt-zinc-500">
                        <div className="flex items-center gap-2 ">
                          <Plus className="size-4" />
                          <span className="text-xs">
                            {format(new Date(file.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="size-4" />
                          mocked
                        </div>

                        <Button
                          variant="destructive"
                          className="w-full"
                          size="sm"
                          onClick={() => {
                            deleteFile({ id: file._id });
                          }}
                        >
                          {currentlyDeletedFile === file.id ? (
                            <>
                              <Loader2 className="animate-spin size-4" />
                            </>
                          ) : (
                            <Trash className="size-4" />
                          )}
                        </Button>
                      </div>
                    </li>
                  </>
                );
              })}
          </ul>
        ) : isLoading ? (
          <Skeleton height={100} className="my-2" count={3} />
        ) : (
          <div className="mt-16 flex flex-col items-center gap-2">
            <Ghost className="size-8 text-zinc-800" />
            <h3 className="font-semibold text-xl">Pretty empty around here</h3>
            <p>Let&apos;s upload your first PDF.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

// Requirements: delete files, upload files, list all files
// list all files the user has : myFiles on the screen
// an upload pdf button (make it visible)
// bunch of pdfs saved in chat , add trash can icon on each pdf for an option to delete the pdf
