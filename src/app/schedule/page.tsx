"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";

export default function Schedule() {
    const [filter, setFilter] = useState("all");

    const classes = [
        { id: 1, name: "Morning Hatha", instructor: "Sarah J.", time: "07:00 AM", duration: "60 mins", type: "hatha", spots: 5 },
        { id: 2, name: "Power Vinyasa", instructor: "Mike T.", time: "09:00 AM", duration: "75 mins", type: "vinyasa", spots: 12 },
        { id: 3, name: "Gentle Flow", instructor: "Emily R.", time: "12:00 PM", duration: "45 mins", type: "flow", spots: 8 },
        { id: 4, name: "Evening Yin", instructor: "Sarah J.", time: "06:00 PM", duration: "90 mins", type: "yin", spots: 3 },
    ];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [selectedDay, setSelectedDay] = useState("Mon");

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Class Schedule</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Find your perfect balance. Book your spot in our daily yoga and meditation sessions.
                </p>
            </div>

            {/* Week Navigation */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-2 justify-start md:justify-center">
                {days.map((day) => (
                    <Button
                        key={day}
                        variant={selectedDay === day ? "default" : "outline"}
                        className="min-w-[60px]"
                        onClick={() => setSelectedDay(day)}
                    >
                        {day}
                    </Button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">{selectedDay}'s Classes</h2>
                <div className="w-[180px]">
                    <Select defaultValue="all" onValueChange={setFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="vinyasa">Vinyasa</SelectItem>
                            <SelectItem value="hatha">Hatha</SelectItem>
                            <SelectItem value="yin">Yin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Classes Grid */}
            <div className="grid gap-4">
                {classes.map((cls) => (
                    <Card key={cls.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex gap-4 items-start md:items-center">
                                    <div className="bg-primary/10 p-4 rounded-xl text-center min-w-[80px]">
                                        <span className="block font-bold text-lg text-primary">{cls.time.split(" ")[0]}</span>
                                        <span className="text-xs text-muted-foreground">{cls.time.split(" ")[1]}</span>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-xl mb-1">{cls.name}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {cls.instructor}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {cls.duration}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm font-medium text-green-600">{cls.spots} spots left</p>
                                        <p className="text-xs text-muted-foreground">Studio A</p>
                                    </div>
                                    <Button size="lg">Book Now</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
