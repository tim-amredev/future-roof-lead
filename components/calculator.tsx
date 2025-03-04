"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CalculatorIcon as CalcIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Current industry standard prices (2024)
const MATERIAL_COSTS = {
  "3-tab-asphalt": { price: 4.5, lifespan: "15-20" },
  "architectural-shingles": { price: 6.5, lifespan: "25-30" },
  "metal-standing-seam": { price: 12, lifespan: "40-50" },
  "metal-shingles": { price: 10, lifespan: "30-40" },
  "concrete-tile": { price: 12, lifespan: "50+" },
  "clay-tile": { price: 15, lifespan: "50+" },
  slate: { price: 20, lifespan: "75+" },
  "wood-shakes": { price: 9, lifespan: "20-25" },
}

const COMPLEXITY_MULTIPLIERS = {
  simple: 1,
  moderate: 1.2,
  complex: 1.4,
}

const PITCH_MULTIPLIERS = {
  low: 1,
  medium: 1.2,
  steep: 1.4,
  "very-steep": 1.6,
}

const LOCATION_MULTIPLIERS = {
  rural: 0.9,
  suburban: 1,
  urban: 1.15,
  "high-cost": 1.3,
}

interface CalculationResult {
  subtotal: number
  laborCost: number
  materialCost: number
  total: number
  pricePerSqft: number
  lifespan: string
}

export default function Calculator() {
  const [squareFootage, setSquareFootage] = useState<string>("")
  const [material, setMaterial] = useState<string>("")
  const [complexity, setComplexity] = useState<string>("")
  const [pitch, setPitch] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showGetQuote, setShowGetQuote] = useState(false)

  const calculateCost = () => {
    if (!squareFootage || !material || !complexity || !pitch || !location) {
      return
    }

    const area = Number.parseFloat(squareFootage)
    const materialCostPerSqft = MATERIAL_COSTS[material as keyof typeof MATERIAL_COSTS].price
    const complexityMultiplier = COMPLEXITY_MULTIPLIERS[complexity as keyof typeof COMPLEXITY_MULTIPLIERS]
    const pitchMultiplier = PITCH_MULTIPLIERS[pitch as keyof typeof PITCH_MULTIPLIERS]
    const locationMultiplier = LOCATION_MULTIPLIERS[location as keyof typeof LOCATION_MULTIPLIERS]

    // Base material cost
    const materialCost = area * materialCostPerSqft

    // Labor cost (typically 60% of total project cost)
    const laborCost = materialCost * 1.5 * complexityMultiplier * pitchMultiplier * locationMultiplier

    // Calculate totals
    const subtotal = materialCost + laborCost
    const total = subtotal * 1.1 // 10% for overhead and profit

    setResult({
      subtotal: Math.round(subtotal),
      laborCost: Math.round(laborCost),
      materialCost: Math.round(materialCost),
      total: Math.round(total),
      pricePerSqft: Math.round((total / area) * 100) / 100,
      lifespan: MATERIAL_COSTS[material as keyof typeof MATERIAL_COSTS].lifespan,
    })

    setShowGetQuote(true)
  }

  return (
    <Card className="p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="square-footage">Roof Square Footage</Label>
            <Input
              id="square-footage"
              type="number"
              placeholder="Enter square footage"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Roofing Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-tab-asphalt">3-Tab Asphalt Shingles</SelectItem>
                <SelectItem value="architectural-shingles">Architectural Shingles</SelectItem>
                <SelectItem value="metal-standing-seam">Metal (Standing Seam)</SelectItem>
                <SelectItem value="metal-shingles">Metal Shingles</SelectItem>
                <SelectItem value="concrete-tile">Concrete Tile</SelectItem>
                <SelectItem value="clay-tile">Clay Tile</SelectItem>
                <SelectItem value="slate">Slate</SelectItem>
                <SelectItem value="wood-shakes">Wood Shakes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complexity">Roof Complexity</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select value={complexity} onValueChange={setComplexity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple (1-2 planes)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-4 planes)</SelectItem>
                        <SelectItem value="complex">Complex (5+ planes, dormers)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of roof planes, valleys, and features affects installation complexity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pitch">Roof Pitch</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select value={pitch} onValueChange={setPitch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pitch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (1/12 - 3/12)</SelectItem>
                        <SelectItem value="medium">Medium (4/12 - 8/12)</SelectItem>
                        <SelectItem value="steep">Steep (9/12 - 12/12)</SelectItem>
                        <SelectItem value="very-steep">Very Steep ({">"}12/12)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Steeper roofs require additional safety measures and labor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location Type</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rural">Rural Area</SelectItem>
                <SelectItem value="suburban">Suburban Area</SelectItem>
                <SelectItem value="urban">Urban Area</SelectItem>
                <SelectItem value="high-cost">High-Cost Region</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateCost}
            className="w-full"
            size="lg"
            disabled={!squareFootage || !material || !complexity || !pitch || !location}
          >
            <CalcIcon className="w-4 h-4 mr-2" /> Calculate Cost
          </Button>
        </div>

        <div className="space-y-6">
          {result && (
            <div className="space-y-6">
              <div className="p-6 card-future rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Estimated Cost Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Materials:</span>
                    <span className="font-semibold">${result.materialCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Labor:</span>
                    <span className="font-semibold">${result.laborCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Subtotal:</span>
                    <span className="font-semibold">${result.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Estimate:</span>
                      <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                        ${result.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 card-future rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Price per sq ft:</span>
                    <span className="font-semibold">${result.pricePerSqft}</span>
                  </div>
                </div>

                <div className="p-4 card-future rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Expected lifespan:</span>
                    <span className="font-semibold">{result.lifespan} years</span>
                  </div>
                </div>
              </div>

              {showGetQuote && (
                <div className="pt-6">
                  <Link
                    href="/quote"
                    className="neon-button group relative w-full inline-flex items-center justify-center px-8 py-4 rounded-xl text-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                      Get Detailed Quote{" "}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <p className="text-sm text-foreground/60 text-center mt-3">
                    Get a detailed quote with financing options and exact pricing
                  </p>
                </div>
              )}
            </div>
          )}

          {!result && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-foreground/60">
                <CalcIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Fill out the form to calculate your roofing cost estimate</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

