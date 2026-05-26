import { ClerkProvider } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function VitelasLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider afterSignOutUrl="/vitelas">{children}</ClerkProvider>;
}
