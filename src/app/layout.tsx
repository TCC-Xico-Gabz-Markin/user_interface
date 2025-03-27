"use client"

import "./globals.css";
import Header from "../components/Header"
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="pt" suppressHydrationWarning>
            <QueryClientProvider client={queryClient}>
                <body cz-shortcut-listen="true" className="w-full h-screen bg-secondary">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        {children}
                    </ThemeProvider>
                </body>
            </QueryClientProvider>
        </html>
    );
}
