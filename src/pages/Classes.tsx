import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp } from "lucide-react";

interface ClassType {
  id: number;
  name: string;
  instructor: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  participants: string;
  description: string;
  schedule: string[];
  style: string;
}

const Classes = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStyle, setSelectedStyle] = useState<string>("All");

  const classes: ClassType[] = [
    {
      id: 1,
      name: "Morning Flow",
      instructor: "Maya Patel",
      duration: "60 min",
      difficulty: "Beginner",
      participants: "Max 15",
      description: "Start your day with gentle stretches and mindful movement. Perfect for beginners and those seeking a peaceful morning practice.",
      schedule: ["Mon, Wed, Fri - 7:00 AM", "Tue, Thu - 6:30 AM"],
      style: "Vinyasa",
    },
    {
      id: 2,
      name: "Power Yoga",
      instructor: "James Rodriguez",
      duration: "75 min",
      difficulty: "Advanced",
      participants: "Max 12",
      description: "Intense, dynamic practice focused on building strength, flexibility, and endurance. Expect to sweat and challenge yourself.",
      schedule: ["Mon, Wed, Fri - 6:00 PM", "Sat - 10:00 AM"],
      style: "Vinyasa",
    },
    {
      id: 3,
      name: "Yin & Meditation",
      instructor: "Sarah Chen",
      duration: "90 min",
      difficulty: "Beginner",
      participants: "Max 20",
      description: "Deep, restorative practice with long-held poses followed by guided meditation. Perfect for stress relief and flexibility.",
      schedule: ["Tue, Thu - 7:30 PM", "Sun - 4:00 PM"],
      style: "Yin",
    },
    {
      id: 4,
      name: "Hatha Basics",
      instructor: "Maya Patel",
      duration: "60 min",
      difficulty: "Beginner",
      participants: "Max 15",
      description: "Learn the fundamentals of yoga postures, breathing, and alignment. Ideal for complete beginners.",
      schedule: ["Tue, Thu - 10:00 AM", "Sat - 9:00 AM"],
      style: "Hatha",
    },
    {
      id: 5,
      name: "Vinyasa Flow",
      instructor: "Emma Wilson",
      duration: "60 min",
      difficulty: "Intermediate",
      participants: "Max 18",
      description: "Dynamic sequences linking breath with movement. Build heat, strength, and mindfulness in this popular flowing style.",
      schedule: ["Mon, Wed, Fri - 12:00 PM", "Sun - 10:00 AM"],
      style: "Vinyasa",
    },
    {
      id: 6,
      name: "Prenatal Yoga",
      instructor: "Sarah Chen",
      duration: "60 min",
      difficulty: "Beginner",
      participants: "Max 10",
      description: "Gentle practice specifically designed for expectant mothers. Focus on breathing, gentle stretching, and relaxation.",
      schedule: ["Tue, Thu - 2:00 PM"],
      style: "Prenatal",
    },
  ];

  const difficultyOptions = ["All", "Beginner", "Intermediate", "Advanced"];
  const styleOptions = ["All", "Vinyasa", "Hatha", "Yin", "Prenatal"];

  const filteredClasses = classes.filter((cls) => {
    const difficultyMatch = selectedDifficulty === "All" || cls.difficulty === selectedDifficulty;
    const styleMatch = selectedStyle === "All" || cls.style === selectedStyle;
    return difficultyMatch && styleMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "Intermediate":
        return "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20";
      case "Advanced":
        return "bg-accent/10 text-accent-foreground hover:bg-accent/20";
      default:
        return "";
    }
  };

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

      {/* Filters Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Filter by Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  {difficultyOptions.map((difficulty) => (
                    <Badge
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      className="cursor-pointer hover-scale px-4 py-2"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Filter by Style</h3>
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((style) => (
                    <Badge
                      key={style}
                      variant={selectedStyle === style ? "default" : "outline"}
                      className="cursor-pointer hover-scale px-4 py-2"
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClasses.map((cls) => (
                <Card key={cls.id} className="gradient-card shadow-card hover:shadow-soft transition-smooth">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">{cls.name}</h3>
                      <p className="text-sm text-muted-foreground">with {cls.instructor}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={16} />
                        <span>{cls.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users size={16} />
                        <span>{cls.participants}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-muted-foreground" />
                      <Badge className={getDifficultyColor(cls.difficulty)}>
                        {cls.difficulty}
                      </Badge>
                      <Badge variant="outline">{cls.style}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cls.description}
                    </p>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground">Schedule:</p>
                      {cls.schedule.map((time, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          {time}
                        </p>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full">Book This Class</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No classes found matching your filters. Try adjusting your selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Instructors</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Our team of certified yoga teachers brings decades of combined experience and a deep 
              passion for sharing the transformative practice of yoga.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["Maya Patel", "James Rodriguez", "Sarah Chen", "Emma Wilson"].map((instructor, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                  <h4 className="text-lg font-semibold">{instructor}</h4>
                  <p className="text-sm text-muted-foreground">Certified Yoga Instructor</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;
