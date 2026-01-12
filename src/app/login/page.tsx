"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTrainer, setIsTrainer] = useState(false);
    const router = useRouter();
    const { login, user } = useAuth();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isLogin) {
            // Login logic here (placeholder)
            try {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.error || "Login failed");
                    return;
                }

                toast.success("Login successful!");
                if (data.token) {
                    login(data.token);
                }

                router.push("/");
            } catch (error) {
                toast.error("Something went wrong. Please try again.");
                console.error(error);
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: isTrainer ? "TRAINER" : "USER"
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Signup failed");
                return;
            }

            toast.success("Account created successfully!");
            if (data.token) {
                login(data.token);
            }

            router.push("/");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">
                        {isLogin ? "Welcome Back" : "Join Serenity"}
                    </CardTitle>
                    <CardDescription>
                        {isLogin
                            ? "Sign in to continue your wellness journey"
                            : "Start your journey to inner peace"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="trainer-signup"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={isTrainer}
                                    onChange={(e) => setIsTrainer(e.target.checked)}
                                />
                                <Label htmlFor="trainer-signup" className="text-sm font-normal cursor-pointer">
                                    Sign up as an Instructor/Trainer
                                </Label>
                            </div>
                        )}

                        {isLogin && (
                            <div className="text-right">
                                <Link href="#" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        )}
                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-1 text-primary hover:underline font-medium"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
