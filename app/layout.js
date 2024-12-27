"use client";
// import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalContext from "./context/GlobalContext";
import { Toaster } from "sonner";
import { montserrat } from "@/font";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700", "900"],
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalContext>
        <body className={`${montserrat.className}`}>
          {children}
          <Toaster richColors={true} duration={3000} />
        </body>
      </GlobalContext>
    </html>
  );
}
