import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Instagram, Youtube, MessageCircle } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 md:py-28 gradient-hero">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-muted-foreground">
                            We'd love to hear from you. Reach out with any questions or to book your first class.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form and Info Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card className="gradient-card shadow-card">
                            <CardContent className="p-8">
                                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                                <form className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                            Phone Number (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="+1 (234) 567-8900"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Class Information</option>
                                            <option>Membership Question</option>
                                            <option>Private Session</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                            placeholder="Tell us how we can help..."
                                        />
                                    </div>

                                    <Button type="submit" className="w-full text-lg py-6">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
                                <div className="space-y-6">
                                    <Card className="gradient-card shadow-card">
                                        <CardContent className="p-6 flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Location</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    123 Wellness Street<br />
                                                    Peaceful City, PC 12345
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="gradient-card shadow-card">
                                        <CardContent className="p-6 flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Phone</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    +1 (234) 567-8900
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="gradient-card shadow-card">
                                        <CardContent className="p-6 flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Email</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    hello@serenityyoga.com
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="gradient-card shadow-card">
                                        <CardContent className="p-6 flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Studio Hours</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    Monday - Friday: 6:00 AM - 9:00 PM<br />
                                                    Saturday: 7:00 AM - 8:00 PM<br />
                                                    Sunday: 8:00 AM - 6:00 PM
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
                                        aria-label="Instagram"
                                    >
                                        <Instagram size={24} />
                                    </a>
                                    <a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
                                        aria-label="YouTube"
                                    >
                                        <Youtube size={24} />
                                    </a>
                                    <a
                                        href="https://wa.me/1234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
                                        aria-label="WhatsApp"
                                    >
                                        <MessageCircle size={24} />
                                    </a>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <Card className="gradient-card shadow-card overflow-hidden">
                                <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <p className="text-muted-foreground">Map location</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                            Common Questions
                        </h2>

                        <div className="space-y-6">
                            <Card className="gradient-card shadow-card">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">Do I need to book classes in advance?</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Yes, we recommend booking classes at least 24 hours in advance to secure your spot.
                                        Walk-ins are welcome based on availability.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="gradient-card shadow-card">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">What should I wear to class?</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Wear comfortable, breathable clothing that allows you to move freely. We have
                                        changing rooms and lockers available for your convenience.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="gradient-card shadow-card">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">Do you offer private sessions?</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Yes! We offer one-on-one and small group private sessions. Contact us to discuss
                                        your goals and schedule a personalized session.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
