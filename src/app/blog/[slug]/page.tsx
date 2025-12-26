import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Mock data - in a real app, fetch based on slug
    const post = {
        title: "10 Benefits of Daily Meditation",
        author: {
            name: "Emma Wilson",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            role: "Meditation Coach"
        },
        date: "June 15, 2024",
        readTime: "5 min read",
        category: "Mindfulness",
        image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1200&h=600&fit=crop",
        content: `
      <p class="mb-4">Meditation is more than just a trend; it's a practice that has been around for thousands of years. In today's fast-paced world, taking a few minutes each day to center yourself can have profound effects on your mental and physical well-being.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">1. Reduces Stress</h2>
      <p class="mb-4">One of the most common reasons people try meditation is to reduce stress. One study including over 3,500 adults showed that it lives up to its reputation for stress reduction.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Controls Anxiety</h2>
      <p class="mb-4">Less stress translates to less anxiety. For example, an eight-week study of mindfulness meditation helped participants reduce their anxiety symptoms.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">3. Promotes Emotional Health</h2>
      <p class="mb-4">Some forms of meditation can lead to an improved self-image and a more positive outlook on life.</p>
    `
    };

    return (
        <article className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="w-full h-[400px] relative mb-12">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="container max-w-4xl text-white text-center">
                        <Badge className="mb-4 bg-primary text-black hover:bg-primary/90">
                            {post.category}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-4xl mx-auto px-4">
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Button>
                </Link>

                <div className="grid md:grid-cols-[1fr_300px] gap-12">
                    {/* Main Content */}
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="border rounded-lg p-6 bg-card text-card-foreground">
                            <h3 className="font-semibold mb-4">About the Author</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                    <AvatarImage src={post.author.image} />
                                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{post.author.name}</p>
                                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                                </div>
                            </div>
                            <Button className="w-full" variant="outline">Follow</Button>
                        </div>

                        <div className="border rounded-lg p-6 bg-primary/5">
                            <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get the latest mindfulness tips delivered to your inbox.
                            </p>
                            <Button className="w-full">Subscribe</Button>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
