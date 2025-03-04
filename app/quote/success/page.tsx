import type { Metadata } from "next"
import Link from "next/link"
import { Home, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Quote Submitted | Instant Roofing Prices",
  description: "Thank you for submitting your roofing quote request. Our AI is processing your personalized estimate.",
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto">
          <div className="card-future p-8 md:p-12 rounded-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-8 floating">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Quote Request Submitted!</h1>

            <p className="text-xl mb-8 text-foreground/80">
              Our AI is analyzing your requirements to generate your personalized roofing quote.
            </p>

            <div className="space-y-6 mb-8">
              <div className="card-future p-6 rounded-xl bg-white/5">
                <h3 className="font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  What Happens Next?
                </h3>
                <p className="text-foreground/70">
                  One of our roofing specialists will review your AI-generated quote and contact you within 24 hours to
                  discuss your project in detail.
                </p>
              </div>

              <div className="card-future p-6 rounded-xl bg-white/5">
                <h3 className="font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Preparing Your Quote
                </h3>
                <p className="text-foreground/70">
                  Our system is processing your information using advanced algorithms to ensure accuracy and competitive
                  pricing.
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="neon-button inline-flex items-center gap-2 px-8 py-4 rounded-xl text-primary hover:text-primary-foreground transition-colors"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                <Home className="w-5 h-5" /> Return to Homepage
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

