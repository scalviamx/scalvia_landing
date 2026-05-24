import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export default function LalanudaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esES} signInFallbackRedirectUrl="/lalanuda" signUpFallbackRedirectUrl="/lalanuda">
      {children}
    </ClerkProvider>
  );
}
