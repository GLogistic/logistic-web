import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Glogistic",
  description: "Your favorite logistic company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Suspense>
        <html lang="en">
          <body>
            <header>
              <Header/>
            </header>
            {children}
          </body>
        </html>
      </Suspense>
    </Providers>
  );
}
