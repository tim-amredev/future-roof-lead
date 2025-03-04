import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glass-dark border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Instant Roofing
            </h3>
            <p className="mb-6 text-foreground/70">
              Leading the future of roofing with advanced technology and AI-powered solutions.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-4 text-foreground/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-primary" />
                <p>123 Innovation Way, Future City, FC 90210</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <Link href="tel:+18005551234" className="hover:text-primary transition-colors">
                  (800) 555-1234
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <Link href="mailto:info@instantroofing.com" className="hover:text-primary transition-colors">
                  info@instantroofing.com
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-primary transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-primary transition-colors">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-primary transition-colors">
                  Our Technology
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Instant Roofing. Pioneering the Future of Roofing.</p>
        </div>
      </div>
    </footer>
  )
}

