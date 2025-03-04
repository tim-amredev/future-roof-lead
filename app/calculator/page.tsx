import type { Metadata } from "next"
import Calculator from "@/components/calculator"
import { Cpu } from "lucide-react"

export const metadata: Metadata = {
  title: "Roofing Cost Calculator | Instant Roofing",
  description:
    "Calculate the estimated cost of your roofing project with our advanced AI-powered calculator. Get accurate pricing based on your specific requirements.",
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen py-12 md:py-16 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Cpu className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Roofing Cost Calculator
          </h1>
          <p className="text-lg text-foreground/80">
            Get an instant estimate for your roofing project using our advanced calculation system
          </p>
        </div>

        <div className="relative">
          <Calculator />
        </div>
      </div>
    </div>
  )
}

