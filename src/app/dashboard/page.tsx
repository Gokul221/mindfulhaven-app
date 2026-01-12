"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, User as UserIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ClassesManager } from "@/components/ClassesManager";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const isTrainer = user.role === "TRAINER";

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar / User Profile Summary */}
                <aside className="w-full md:w-64 space-y-6">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user.image || ""} alt={user.name || "@user"} />
                                    <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle>{user.name || "User"}</CardTitle>
                            <CardDescription>{user.role}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Member since {new Date().getFullYear()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>New York, NY</span>
                                </div>
                            </div>
                            <Button className="w-full mt-6" variant="outline">
                                Edit Profile
                            </Button>
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="classes">My Bookings</TabsTrigger>
                            {isTrainer && <TabsTrigger value="manage-classes">Manage Classes</TabsTrigger>}
                            <TabsTrigger value="history">History</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">3</div>
                                        <p className="text-xs text-muted-foreground">Next: Vinyasa Flow @ 5PM</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">12</div>
                                        <p className="text-xs text-muted-foreground">+2 this week</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-green-600">Active</div>
                                        <p className="text-xs text-muted-foreground">Renews on Jan 1st</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Today's Schedule</CardTitle>
                                    <CardDescription>Your booked classes for today</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <Clock className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Vinyasa Flow</h4>
                                                <p className="text-sm text-muted-foreground">5:00 PM - 6:00 PM with Sarah</p>
                                            </div>
                                        </div>
                                        <Button>Join / Check-in</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="classes">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Classes</CardTitle>
                                    <CardDescription>Manage your bookings</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">List of booked classes will appear here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {isTrainer && (
                            <TabsContent value="manage-classes">
                                <ClassesManager />
                            </TabsContent>
                        )}

                        <TabsContent value="history">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Class History</CardTitle>
                                    <CardDescription>View your past attendance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Past classes will appear here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                    <CardDescription>Manage your preferences</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Settings form will appear here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

