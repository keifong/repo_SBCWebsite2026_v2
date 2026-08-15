import type { Metadata } from "next";
import Navbar from "@/components/navbar";

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
                <Navbar/>
                {children}
            </body>
        </html>
    );
}