import { clerkMiddleware } from "@clerk/nextjs/server";

const middleware = async (req) => {

  return clerkMiddleware()(req);
};

export default middleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};