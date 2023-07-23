"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Providers } from "./providers";
import Main from "@/components/layout/main";
import "@splidejs/react-splide/css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <Navbar />
          <Main children={children} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
