import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";

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
    <html lang="en">
      <body>
        <header>
          <Header/>
        </header>
        {children}
      </body>
    </html>
    </Providers>
  );
}
