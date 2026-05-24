"use client";

import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export default function ClerkProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ClerkProvider
      localization={esES}
      signInFallbackRedirectUrl={pathname}
      signUpFallbackRedirectUrl={pathname}
    >
      {children}
    </ClerkProvider>
  );
}
