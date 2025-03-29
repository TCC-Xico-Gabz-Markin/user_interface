"use client"

import "./globals.css";
import Header from "../components/Header"
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/AppSidebar";

const queryClient = new QueryClient();

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="pt" suppressHydrationWarning>
            <QueryClientProvider client={queryClient}>
                <body cz-shortcut-listen="true">
                    <SidebarProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <AppSideBar />
                            <main className="w-full h-screen">
                                <Header />
                                {children}
                            </main>
                        </ThemeProvider>
                    </SidebarProvider>
                </body>
            </QueryClientProvider>
        </html>
    );
}
