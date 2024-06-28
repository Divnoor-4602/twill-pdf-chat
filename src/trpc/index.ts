import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { databaseConnect } from "@/lib/mongoose";
import User from "@/database/user.model";
import File from "@/database/file.model";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    await databaseConnect();

    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      console.log(user);

      if (!user?.id || !user?.email) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }

      // check if the user is in the database
      const dbUser = await User.findOne({ kindeId: user.id });

      // if not, create a new user
      if (!dbUser) {
        const newUser = await User.create({
          kindeId: user.id,
          email: user.email,
        });
      }

      return { success: true };
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    try {
      await databaseConnect();

      const { userId, user } = ctx;

      // check if the user is in the database
      const exitingUser = await User.findOne({ kindeId: userId });

      if (!exitingUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Not found" });
      }

      // get all the files for the user
      const files = await File.find({ user: exitingUser._id });

      return files;
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }
  }),
  // todo: create a route to delete user files :3:10
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
