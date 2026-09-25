import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b0c0f]">
        <PlanProvider>
        <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer position="top-right" />
        </PlanProvider>
      </body>
    </html>
  );
}
