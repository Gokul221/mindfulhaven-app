// this file is used to provide authentication state and functions to the app

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string | null;
    email: string;
    role: "USER" | "TRAINER" | "ADMIN";
    image?: string | null;
    trainer?: {
        id: string;
    } | null;
}

// this interface is used to define the type of the auth context
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async (token: string) => {
        try {
            const res = await fetch("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                // If token is invalid or expired
                logout();
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    // this useEffect is used to fetch the user details from the database
    useEffect(() => {
        const token = storage.get<string>("token");
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token: string) => {
        storage.set("token", token);
        fetchUser(token);
    };

    const logout = () => {
        storage.remove("token");
        setUser(null);
        router.push("/login"); // Optional: redirect to login
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
