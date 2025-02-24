import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log(path);

  return NextResponse.redirect(new URL("/product", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
