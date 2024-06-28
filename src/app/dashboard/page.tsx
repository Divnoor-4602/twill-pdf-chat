import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "@/database/user.model";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

const Page = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard`);

  const dbUser = await User.findOne({
    kindeId: user.id,
  });

  if (!dbUser) {
    redirect(`/auth-callback?origin=dashboard`);
  }

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Page;
