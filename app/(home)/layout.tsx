import type { Metadata } from "next";
import WhiteNavbar from "@/components/navbarWhite";

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
                <WhiteNavbar/>
                {children}
            </body>
        </html>
    );
}