import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const Blog = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "5 Morning Yoga Poses to Start Your Day Right",
      excerpt: "Discover simple yet powerful poses that will energize your body and calm your mind for a productive day ahead.",
      author: "Maya Patel",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Yoga Tips",
    },
    {
      id: 2,
      title: "The Science Behind Mindfulness Meditation",
      excerpt: "Explore the research-backed benefits of meditation and how it can transform your mental health and well-being.",
      author: "Sarah Chen",
      date: "March 12, 2024",
      readTime: "8 min read",
      category: "Mindfulness",
    },
    {
      id: 3,
      title: "Nutrition for Yogis: Eating for Energy and Balance",
      excerpt: "Learn about the best foods to fuel your practice and support your body's natural healing processes.",
      author: "Emma Wilson",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Nutrition",
    },
    {
      id: 4,
      title: "Breathwork Techniques for Stress Relief",
      excerpt: "Master simple breathing exercises that can instantly calm your nervous system and reduce anxiety.",
      author: "James Rodriguez",
      date: "March 8, 2024",
      readTime: "4 min read",
      category: "Mindfulness",
    },
    {
      id: 5,
      title: "Building a Sustainable Home Yoga Practice",
      excerpt: "Tips and strategies for creating a consistent yoga routine that fits your lifestyle and keeps you motivated.",
      author: "Maya Patel",
      date: "March 5, 2024",
      readTime: "7 min read",
      category: "Yoga Tips",
    },
    {
      id: 6,
      title: "Understanding the Eight Limbs of Yoga",
      excerpt: "Dive deep into the ancient philosophy of yoga and discover how these principles can guide your modern life.",
      author: "Sarah Chen",
      date: "March 1, 2024",
      readTime: "10 min read",
      category: "Lifestyle",
    },
  ];

  const categories = ["All", "Yoga Tips", "Mindfulness", "Nutrition", "Lifestyle"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Wellness Blog</h1>
            <p className="text-xl text-muted-foreground">
              Insights, tips, and inspiration for your yoga and mindfulness journey
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover-scale px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="gradient-card shadow-card hover:shadow-soft transition-smooth cursor-pointer hover-scale group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
                    
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>

                    <h3 className="text-xl font-semibold group-hover:text-primary transition-smooth">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight
                        size={20}
                        className="text-primary group-hover:translate-x-1 transition-smooth"
                      />
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">By {post.author}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Inspired</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get weekly wellness tips, yoga inspiration, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
