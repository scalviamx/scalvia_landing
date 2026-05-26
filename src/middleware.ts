import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware((auth, req) => {
  // Clerk solo activo en rutas /lalanuda
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Solo rutas de vitelas y Clerk proxy
    "/vitelas(.*)",
    "/__clerk/(.*)",
  ],
};
