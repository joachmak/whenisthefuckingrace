import localFont from "next/font/local";
import "./globals.css";
import {Analytics} from "@vercel/analytics/next";

const mainFont = localFont({
    src: "./fonts/adam-cg-pro.regular.otf",
    variable: "--font-main",
    weight: "100",
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <head>
            <meta name="googlebot" content="noindex,nofollow"/>
            <meta name="robots" content="noindex"/>
            <link rel="alternate" hrefLang="" href="https://whenisthefuckingrace.com"/>
            <meta name="viewport" content="viewport-fit=cover"/>
        </head>
        <body
            className={`text-white tracking-[4px] ${mainFont.className} antialiased`}
        >
        {children}
        <Analytics/>
        </body>
        </html>
    );
}
