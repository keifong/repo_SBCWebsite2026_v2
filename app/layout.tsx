import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";

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
                <Footer/>
            </body>
        </html>
    );
}