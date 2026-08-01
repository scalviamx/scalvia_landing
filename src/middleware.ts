import { NextRequest, NextResponse } from "next/server";
import { hiddenRoutes, publicApis, publicRoutes } from "@/config/public-allowlist";

const publicRoutePaths = new Set(publicRoutes.map((route) => route.path));
const publicApiPaths = new Set(publicApis.map((api) => api.path));
const fileExtensionPattern = /\.[a-z0-9]+$/i;

// Branch Demo: sin Clerk. Middleware simple que solo deja pasar.
// En main/PROD se restaura clerkMiddleware.
export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const isWorkersPreview = host.endsWith(".workers.dev");
  const isHiddenRoute = hiddenRoutes.some(
    (route) => route.path.startsWith("/") && pathname === route.path,
  );
  const isPublicRoute = publicRoutePaths.has(pathname);
  const isPublicApi = publicApiPaths.has(pathname);
  const isApi = pathname.startsWith("/api/");
  const isAsset = fileExtensionPattern.test(pathname);
  const shouldNoIndex =
    isWorkersPreview ||
    isHiddenRoute ||
    (isApi && !isPublicApi) ||
    (!isApi && !isAsset && !isPublicRoute);

  if (shouldNoIndex) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.png|vitelas_logo.png|vitelas_logo_black.png).*)"],
};
