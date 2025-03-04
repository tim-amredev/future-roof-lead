import Link from "next/link"
import { Phone } from "lucide-react"

export default function Header() {
  return (
    <header className="glass-dark sticky top-0 z-50 border-b border-white/5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
          >
            Instant Roofing
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="tel:+18005551234"
              className="hidden md:flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors"
            >
              <Phone className="w-5 h-5" />
              (800) 555-1234
            </Link>

            <Link
              href="/quote"
              className="neon-button relative px-6 py-2 rounded-lg text-primary hover:text-primary-foreground transition-colors"
            >
              <span className="relative z-10 font-medium">Get Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

