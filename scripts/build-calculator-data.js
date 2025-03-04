const fs = require("fs")
const path = require("path")

// Calculator data
const calculatorData = {
  materials: {
    asphalt: {
      name: "Asphalt Shingles",
      price: 3.5,
      lifespan: 20,
      description: "Affordable and popular roofing material with good durability.",
    },
    metal: {
      name: "Metal Roofing",
      price: 8.5,
      lifespan: 50,
      description: "Long-lasting and energy-efficient roofing solution.",
    },
    tile: {
      name: "Clay Tile",
      price: 12.0,
      lifespan: 75,
      description: "Classic, elegant appearance with excellent longevity.",
    },
    slate: {
      name: "Slate",
      price: 15.0,
      lifespan: 100,
      description: "Premium natural stone roofing with exceptional durability.",
    },
    wood: {
      name: "Wood Shakes",
      price: 7.5,
      lifespan: 30,
      description: "Natural appearance with good insulation properties.",
    },
    composite: {
      name: "Composite Shingles",
      price: 5.0,
      lifespan: 40,
      description: "Synthetic materials that mimic natural materials at a lower cost.",
    },
  },
  multipliers: {
    complexity: {
      simple: 1.0,
      moderate: 1.2,
      complex: 1.5,
    },
    pitch: {
      flat: 0.8,
      low: 1.0,
      medium: 1.2,
      steep: 1.5,
    },
    location: {
      urban: 1.2,
      suburban: 1.0,
      rural: 0.9,
    },
  },
}

// Ensure directory exists
const assetsJsDir = path.join(__dirname, "..", "assets", "js")
if (!fs.existsSync(assetsJsDir)) {
  fs.mkdirSync(assetsJsDir, { recursive: true })
}

// Write data to file
const outputPath = path.join(assetsJsDir, "calculator-data.json")
fs.writeFileSync(outputPath, JSON.stringify(calculatorData, null, 2))

console.log(`Calculator data written to ${outputPath}`)

