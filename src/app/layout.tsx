import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Painted Pretty | Couples Paint Kits",
  description:
    "Order a Painted Pretty couples paint kit and continue on WhatsApp with your selected design and details ready to send.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
