import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const Membership = () => {
  const plans = [
    {
      name: "Drop-In",
      price: "$25",
      period: "per class",
      description: "Perfect for trying out classes or occasional visits",
      features: [
        "Access to any single class",
        "No commitment required",
        "Valid for 30 days from purchase",
        "Can be shared with a friend",
      ],
      popular: false,
    },
    {
      name: "Monthly",
      price: "$120",
      period: "per month",
      description: "Best value for regular practitioners",
      features: [
        "Unlimited classes per month",
        "Priority booking for workshops",
        "10% discount on retail items",
        "Access to members-only events",
        "Free yoga mat rental",
      ],
      popular: true,
    },
    {
      name: "Annual",
      price: "$1,200",
      period: "per year",
      description: "Save $240 with our annual commitment",
      features: [
        "Unlimited classes all year",
        "Priority booking for all events",
        "20% discount on retail items",
        "Free workshops (2 per year)",
        "Guest pass (1 per month)",
        "Free yoga mat included",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Membership Plans</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your wellness journey
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`gradient-card shadow-card hover:shadow-soft transition-smooth relative ${
                    plan.popular ? "border-2 border-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader className="p-6 pb-4">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="p-6 pt-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Class Packages Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Class Packages</h2>
              <p className="text-lg text-muted-foreground">
                Not ready for a membership? Try our flexible class packages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="gradient-card shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">5-Class Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$100</span>
                    <span className="text-muted-foreground ml-2">($20 per class)</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Valid for 3 months from purchase. Save $25 compared to drop-in rates.
                  </p>
                  <Button className="w-full">Purchase Pack</Button>
                </CardContent>
              </Card>

              <Card className="gradient-card shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">10-Class Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$180</span>
                    <span className="text-muted-foreground ml-2">($18 per class)</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Valid for 6 months from purchase. Save $70 compared to drop-in rates.
                  </p>
                  <Button className="w-full">Purchase Pack</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I pause or cancel my membership?</h3>
                <p className="text-muted-foreground">
                  Yes! Monthly memberships can be paused for up to 2 months per year or cancelled with 
                  30 days notice. Annual memberships can be paused but are non-refundable after 30 days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">What if I can't attend a booked class?</h3>
                <p className="text-muted-foreground">
                  Please cancel your booking at least 4 hours in advance through our app or website. 
                  Late cancellations may result in the class being deducted from your package.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Do you offer student or senior discounts?</h3>
                <p className="text-muted-foreground">
                  Yes! We offer a 15% discount on monthly and annual memberships for students (with valid ID) 
                  and seniors (65+). Contact us for more information.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">What should I bring to class?</h3>
                <p className="text-muted-foreground">
                  We provide yoga mats, blocks, and straps. Just bring yourself, a water bottle, and 
                  comfortable clothing. We also have showers and changing rooms available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community today and take the first step toward a healthier, more balanced life.
          </p>
          <Button size="lg" className="text-lg px-12">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Membership;
