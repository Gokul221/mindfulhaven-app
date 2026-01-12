// this file is used to provide global context to the app

"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { UserPreferencesProvider } from "@/context/user-preferences-context";
import { AuthProvider } from "@/context/auth-context";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <UserPreferencesProvider>
                    <AuthProvider>
                        <TooltipProvider>
                            {children}
                            <Toaster />
                            <Sonner />
                        </TooltipProvider>
                    </AuthProvider>
                </UserPreferencesProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
