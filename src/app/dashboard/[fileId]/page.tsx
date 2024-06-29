import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import File from "@/database/file.model";
import PdfRenderer from "@/components/PdfRenderer";
import ChatWrapper from "@/components/ChatWrapper";
import { databaseConnect } from "@/lib/mongoose";

interface PageProps {
  params: {
    fileId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  // fetch the file from passed in params
  const { fileId } = params;

  // fetch the user from the session
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  // If no user redirect back to auth-callback
  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`);

  // connect to db
  await databaseConnect();

  // Fetch file details from the database
  const file = await File.findOne({ _id: fileId });

  if (!file) notFound();

  return (
    <>
      <div className="h-[calc(100vh-3.5rem)] flex flex-col flex-1 justify-between">
        <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
          {/* pdf side */}
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <PdfRenderer />
            </div>
          </div>

          {/* chat with pdf */}
          <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-top-0">
            <ChatWrapper />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
