import UploadButton from "./UploadButton";

const Dashboard = () => {
  return (
    <>
      <div className="mx-auto md:p-10 max-w-7xl">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-gray-200 border-b pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>
          <UploadButton />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// Requirements: delete files, upload files, list all files
// list all files the user has : myFiles on the screen
// an upload pdf button (make it visible)
// bunch of pdfs saved in chat , add trash can icon on each pdf for an option to delete the pdf
