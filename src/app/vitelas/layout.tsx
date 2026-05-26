import ClerkProviderClient from "@/components/ClerkProviderClient";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export default function VitelasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (DEMO_MODE) {
    return <>{children}</>;
  }
  return <ClerkProviderClient>{children}</ClerkProviderClient>;
}
