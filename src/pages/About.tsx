import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Users } from "lucide-react";
import aboutImage from "@/assets/about-wellness.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground">
              A journey of self-discovery, healing, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={aboutImage}
                alt="Wellness and mindfulness"
                className="rounded-2xl shadow-soft w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Serenity Yoga was founded in 2018 with a simple yet profound mission: to make the 
                transformative practices of yoga and mindfulness accessible to everyone, regardless 
                of experience level or background.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that wellness is not a destination but a journey—one that requires patience, 
                compassion, and consistent practice. Our studio is a sanctuary where you can disconnect 
                from the chaos of daily life and reconnect with your true self.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through ancient yogic wisdom and modern wellness techniques, we guide our students 
                toward balance, strength, and inner peace. Every class, workshop, and retreat is 
                designed to nurture your mind, body, and spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="gradient-card shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Compassion</h3>
                <p className="text-muted-foreground">
                  We approach every student with kindness, understanding that everyone's journey is unique. 
                  Our community is built on mutual respect and support.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Authenticity</h3>
                <p className="text-muted-foreground">
                  We honor the ancient traditions of yoga while adapting practices to meet modern needs. 
                  Authenticity means being true to both our roots and our students.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Community</h3>
                <p className="text-muted-foreground">
                  Yoga is not just individual practice—it's about connection. We foster a welcoming 
                  space where lasting friendships and support networks flourish.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Founder</h2>
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
              <h3 className="text-2xl font-semibold mb-2">Maya Patel</h3>
              <p className="text-muted-foreground">Founder & Lead Instructor</p>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Maya's journey with yoga began over 15 years ago during a particularly challenging 
                period in her life. What started as a search for stress relief became a profound 
                spiritual awakening and life-long passion.
              </p>
              <p>
                After training extensively in India and obtaining certifications in Hatha, Vinyasa, 
                and Yin yoga, Maya returned home with a vision: to create a space where people could 
                experience the same transformation she had found on her mat.
              </p>
              <p>
                Today, Maya leads teacher trainings, workshops, and retreats while continuing to teach 
                regular classes at the studio. Her teaching style blends traditional yogic philosophy 
                with modern mindfulness techniques, always emphasizing self-compassion and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
