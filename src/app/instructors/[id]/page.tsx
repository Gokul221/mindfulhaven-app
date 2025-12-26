import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Instagram, Linkedin, Twitter } from "lucide-react";

export default async function InstructorProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Mock data - in a real app, fetch based on id
    const instructor = {
        name: "Sarah Johnson",
        role: "Senior Yoga Instructor",
        bio: "Sarah has been practicing yoga for over 15 years and specializes in Vinyasa and Hatha yoga. Her classes focus on mindful movement and breath work.",
        specialties: ["Vinyasa", "Hatha", "Meditation", "Prenatal"],
        image: "https://images.unsplash.com/photo-1544367563-12123d8975bd?w=400&h=400&fit=crop",
        social: {
            instagram: "#",
            twitter: "#",
            linkedin: "#",
        },
    };

    const upcomingClasses = [
        { id: 1, name: "Sunrise Vinyasa", date: "Tomorrow, 7:00 AM", duration: "60 min" },
        { id: 2, name: "Power Flow", date: "Thu, 6:00 PM", duration: "75 min" },
        { id: 3, name: "Restorative Yoga", date: "Sat, 10:00 AM", duration: "90 min" },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Sidebar */}
                <div className="md:col-span-1">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="mb-6 flex justify-center">
                                <Avatar className="h-48 w-48">
                                    <AvatarImage src={instructor.image} className="object-cover" />
                                    <AvatarFallback>{instructor.name[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <h1 className="text-2xl font-bold mb-2">{instructor.name}</h1>
                            <p className="text-muted-foreground mb-4">{instructor.role}</p>

                            <div className="flex justify-center gap-4 mb-6">
                                <a href={instructor.social.instagram} className="text-muted-foreground hover:text-primary">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href={instructor.social.twitter} className="text-muted-foreground hover:text-primary">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href={instructor.social.linkedin} className="text-muted-foreground hover:text-primary">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>

                            <div className="flex flex-wrap justify-center gap-2">
                                {instructor.specialties.map((specialty) => (
                                    <Badge key={specialty} variant="secondary">
                                        {specialty}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {instructor.bio}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Upcoming Classes</h2>
                        <div className="grid gap-4">
                            {upcomingClasses.map((cls) => (
                                <Card key={cls.id}>
                                    <CardContent className="flex items-center justify-between p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <Calendar className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{cls.name}</h3>
                                                <p className="text-muted-foreground">
                                                    {cls.date} • {cls.duration}
                                                </p>
                                            </div>
                                        </div>
                                        <Button>Book Class</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
