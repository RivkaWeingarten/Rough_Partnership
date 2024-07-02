import { clerkMiddleware } from "@clerk/nextjs/server";

const middleware = async (req) => {
  console.log('Middleware is running');
  return clerkMiddleware()(req);
};

export default middleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};