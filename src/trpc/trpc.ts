import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
const middlewear = t.middleware;

/**
 * Middleware function to check if user is authenticated
 * @param {Function} opts - Options for the middleware function
 * @returns {Function} - Returns the next function with updated context if user is authenticated
 */
const isAuth = middlewear(async (opts) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
// export he middleawar as a private procedure
export const privateProcedure = t.procedure.use(isAuth);
