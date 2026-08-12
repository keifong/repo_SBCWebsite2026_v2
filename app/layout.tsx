import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Singapore Baptist Church",
    description: "Singapore Baptist Church",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}