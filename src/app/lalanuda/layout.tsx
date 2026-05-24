import ClerkProviderClient from "@/components/ClerkProviderClient";

export default function LalanudaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProviderClient>{children}</ClerkProviderClient>;
}
