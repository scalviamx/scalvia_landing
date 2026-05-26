import { NextResponse } from "next/server";

// Branch Demo: sin Clerk. Middleware simple que solo deja pasar.
// En main/PROD se restaura clerkMiddleware.
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/vitelas(.*)"],
};
