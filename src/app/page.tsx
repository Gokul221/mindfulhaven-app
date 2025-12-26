import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Calendar, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-yoga.jpg";

export default function Home() {
    const features = [
        {
            icon: Heart,
            title: "Holistic Wellness",
            description: "Nurture your mind, body, and spirit through ancient practices and modern techniques.",
        },
        {
            icon: Users,
            title: "Expert Instructors",
            description: "Learn from certified yoga teachers with years of experience and deep knowledge.",
        },
        {
            icon: Calendar,
            title: "Flexible Schedule",
            description: "Choose from morning, afternoon, and evening classes that fit your lifestyle.",
        },
        {
            icon: Sparkles,
            title: "Peaceful Environment",
            description: "Practice in our serene studio designed to promote relaxation and inner peace.",
        },
    ];

    const testimonials = [
        {
            name: "Sarah Mitchell",
            text: "Serenity Yoga has transformed my life. The instructors are incredibly knowledgeable and the community is so welcoming.",
            role: "Member since 2022",
        },
        {
            name: "David Chen",
            text: "I started with no flexibility and a lot of stress. Now I feel balanced, strong, and peaceful. Highly recommend!",
            role: "Member since 2023",
        },
        {
            name: "Emma Rodriguez",
            text: "The mindfulness workshops have been life-changing. I've learned tools I use every day to manage anxiety and find calm.",
            role: "Member since 2021",
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${heroImage.src})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <div className="max-w-3xl animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
                            Find Balance.<br />
                            <span className="text-primary">Breathe. Be.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                            Discover inner peace through yoga, meditation, and mindfulness practices.
                            Join our welcoming community and transform your well-being.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/classes">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                                    Join a Class
                                </Button>
                            </Link>
                            <Link href="/membership">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                                    View Plans
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-28 gradient-hero">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Serenity Yoga</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Experience a holistic approach to wellness with our expert-led classes and supportive community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="gradient-card shadow-card hover:shadow-soft transition-smooth hover-scale"
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                        <feature.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Community Says</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Real stories from real people who found their balance with us.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="gradient-card shadow-card">
                                <CardContent className="p-8">
                                    <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 gradient-hero">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Begin Your Journey?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join us for a free trial class and experience the transformative power of yoga.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="text-lg px-12">
                            Book Your Free Class
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
