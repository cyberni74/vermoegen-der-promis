import { NextResponse } from "next/server";

export function middleware() {
  return new NextResponse("Diese Website wurde entfernt.", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "public, max-age=300",
    },
  });
}

export const config = {
  matcher: ["/", "/:path*"],
};
