import type { Metadata } from "next";
import localFont from "next/font/local";
import { NotificationProvider } from "@/zustand/notificationPtoviderClient";
import "./globals.css";
const kuunari = localFont({
  src: [
    {
      path: "../assests/Kuunari/fonts/aqui.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assests/Kuunari/fonts/aqui2.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-kuunari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Projeto z13gameclub",
  description:
    "Essé é um projeto de fight game feito com carinho para fomentar a cultura gamer e a comunidade de jogos de luta. aqui na baixada santista.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kuunari.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <NotificationProvider />
      </body>
    </html>
  );
}
