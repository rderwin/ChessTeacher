import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { ToastProvider } from "@/contexts/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChessTeacher — Learn Chess by Doing",
  description:
    "Master chess openings through interactive practice. Play moves, understand why they work, and build real understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-900 text-stone-100">
        <AuthProvider>
          <PreferencesProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
            </ToastProvider>
          </PreferencesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
