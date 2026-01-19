"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, MapPin, Loader2 } from "lucide-react";
import { RazorpayPayment } from "@/components/RazorpayPayment";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface YogaClass {
    id: string;
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    capacity: number;
    priceCents: number;
    location: string;
    trainer: {
        user: {
            name: string;
        };
    };
}

export default function Classes() {
    const [classes, setClasses] = useState<YogaClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [bookingClass, setBookingClass] = useState<YogaClass | null>(null);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await fetch("/api/classes");
            if (res.ok) {
                const data = await res.json();
                setClasses(data);
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = async (yogaClass: YogaClass) => {
        if (!user) {
            router.push("/login?redirect=/classes");
            return;
        }

        setBookingClass(yogaClass);

        try {
            const token = storage.get<string>("token");
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ classId: yogaClass.id }),
            });

            if (res.ok) {
                const booking = await res.json();
                setBookingId(booking.id);
            } else {
                const error = await res.json();
                if (res.status === 409) {
                    alert("You have already booked this class!");
                    setBookingClass(null);
                } else {
                    alert(error.error || "Failed to initiate booking");
                    setBookingClass(null);
                }
            }
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Failed to initiate booking");
            setBookingClass(null);
        }
    };

    const handlePaymentSuccess = () => {
        alert("Booking Confirmed!");
        setBookingClass(null);
        setBookingId(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 md:py-28 gradient-hero">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Classes</h1>
                        <p className="text-xl text-muted-foreground">
                            Find the perfect class for your level, schedule, and wellness goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Classes Grid */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {classes.map((cls) => (
                                <Card key={cls.id} className="gradient-card shadow-card hover:shadow-soft transition-smooth">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-semibold">{cls.title}</h3>
                                            <p className="text-sm text-muted-foreground">with {cls.trainer?.user?.name || "Instructor"}</p>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Clock size={16} />
                                                <span>
                                                    {new Date(cls.startAt).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Users size={16} />
                                                <span>{cls.capacity} spots</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">{cls.location || "Main Studio"}</span>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                            {cls.description}
                                        </p>

                                        <div className="font-bold text-lg text-primary">
                                            ₹{(cls.priceCents / 100).toFixed(2)}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-6 pt-0">
                                        <Button className="w-full" onClick={() => handleBookClick(cls)}>
                                            Book This Class
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {classes.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-lg text-muted-foreground">
                                    No classes available at the moment. Please check back later.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Dialog open={!!bookingClass} onOpenChange={(open) => !open && setBookingClass(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Booking</DialogTitle>
                        <DialogDescription>
                            You are booking <strong>{bookingClass?.title}</strong> for <strong>₹{bookingClass ? (bookingClass.priceCents / 100).toFixed(2) : "0"}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {bookingId ? (
                            <RazorpayPayment
                                bookingId={bookingId}
                                onSuccess={handlePaymentSuccess}
                                onError={(err) => alert(err)}
                                className="w-full"
                            />
                        ) : (
                            <div className="flex justify-center">
                                <Loader2 className="animate-spin" />
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
