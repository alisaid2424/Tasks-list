import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/components/header/Header";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasks List App",
  description: "Tasks list app for managing my tasks",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-mainBackground text-mainColor`}>
        <ToastContainer theme="colored" position="top-center" />
        <PageTransition>
          <Header />
          <main className="container">{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
