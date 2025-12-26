"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Schedule", path: "/schedule" },
    { name: "Membership", path: "/membership" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Serenity Yoga</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-smooth hover:text-primary ${isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="ghost" className="mr-2">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="default" className="ml-4">
              Book a Class
            </Button>
            <div className="ml-4">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-smooth hover:text-primary ${isActive(link.path) ? "text-primary" : "text-foreground"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" className="w-full">
                Book a Class
              </Button>
              <div className="flex justify-center pt-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
