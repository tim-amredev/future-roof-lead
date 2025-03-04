import Link from "next/link"
import { ArrowRight, Shield, Zap, BarChart, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

        {/* Animated grid background */}
        <div className="absolute inset-0 grid-background opacity-20" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              The Future of Roofing is Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80">
              Advanced roofing solutions powered by cutting-edge technology. Get your instant quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="neon-button group relative px-8 py-4 rounded-lg text-primary hover:text-primary-foreground transition-colors overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                  Get Instant Quote <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/calculator"
                className="glass text-foreground/90 hover:text-foreground font-semibold px-8 py-4 rounded-lg text-center transition-all hover:scale-105"
              >
                Try Our Cost Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glow-text">
            Next-Generation Roofing Technology
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-future p-8 rounded-2xl">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Materials</h3>
              <p className="text-foreground/70">
                Advanced roofing materials with integrated sensors and weather-adaptive properties.
              </p>
            </div>

            <div className="card-future p-8 rounded-2xl">
              <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <BarChart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-foreground/70">
                Precise cost estimation and material recommendations using artificial intelligence.
              </p>
            </div>

            <div className="card-future p-8 rounded-2xl">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Protection</h3>
              <p className="text-foreground/70">
                Enhanced durability with next-gen materials and smart monitoring systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-2xl mx-auto">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">Ready to Transform Your Roof?</h2>
            <p className="text-xl text-foreground/80 mb-8">
              Get an instant, AI-powered quote for your roofing project. Experience the future of roofing technology.
            </p>
            <Link
              href="/quote"
              className="neon-button inline-flex items-center gap-2 px-8 py-4 rounded-lg text-primary hover:text-primary-foreground transition-colors"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

