import type { Metadata } from "next";
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Web3Provider } from "@/components/providers/web3-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "sonner";
import { AppProvider } from "@/components/providers/app-prodiver";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LensCourt",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
          <Web3Provider>
            <AuthProvider>
              <AppProvider>{children}</AppProvider>
            </AuthProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
