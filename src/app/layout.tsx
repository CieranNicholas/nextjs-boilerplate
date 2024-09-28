import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/nav-bar";
import { getUser } from "@/lib/lucia";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/providers/session-provider";
import { COMPANY_DESCRIPTION, COMPANY_NAME } from "@/constants";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: COMPANY_NAME,
  description: COMPANY_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider value={user}>
          <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
