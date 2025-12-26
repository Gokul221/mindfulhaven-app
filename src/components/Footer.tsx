import Link from "next/link";
import { Instagram, Youtube, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Serenity Yoga</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Find balance. Breathe. Be.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-muted-foreground hover:text-primary transition-smooth">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-muted-foreground hover:text-primary transition-smooth">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-smooth">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Wellness Street, Peaceful City, PC 12345</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone size={16} className="flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail size={16} className="flex-shrink-0" />
                <span>hello@serenityyoga.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get wellness tips and updates.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Serenity Yoga. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
