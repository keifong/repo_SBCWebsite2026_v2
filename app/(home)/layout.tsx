import NavbarWhite from "@/components/navbarWhite/navbarWhite";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavbarWhite />
            {children}
        </>
    );
}