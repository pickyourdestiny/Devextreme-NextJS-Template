import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//this middleware redirects auth/signin and auth/register errors to the custom auth/error page.

// Its not recommended to protect pages with middleware even though
// its possible using a similar approach, its more secure to protect each page individually as they load asynchronously.

export function middleware(req: NextRequest) {
  if (req.nextUrl.searchParams.has("error")) {
    const error = req.nextUrl.searchParams.get("error");

    return NextResponse.redirect(
      new URL(`/auth/error?error=${error}`, req.url)
    );
  }
}

export const config = {
  matcher: ["/auth/signin", "/auth/register"],
};
