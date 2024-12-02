import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Analytics} from "@vercel/analytics/next";

const mainFont = localFont({
    src: "./fonts/adam-cg-pro.regular.otf",
    variable: "--font-main",
    weight: "100",
});

export const metadata: Metadata = {
    title: "F1 Time",
    description: "When is the f*cking race?",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`text-white tracking-[4px] ${mainFont.className} antialiased`}
        >
        {children}
        <Analytics/>
        </body>
        </html>
    );
}
