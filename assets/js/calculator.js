import { Dialog } from "@/components/ui/dialog"
// Calculator functionality
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const squareFootageInput = document.getElementById("square-footage")
  const materialSelect = document.getElementById("material")
  const complexitySelect = document.getElementById("complexity")
  const pitchSelect = document.getElementById("pitch")
  const locationSelect = document.getElementById("location")
  const calculateButton = document.getElementById("calculate-button")
  const emptyState = document.getElementById("empty-state")
  const results = document.getElementById("results")
  const getQuoteContainer = document.getElementById("get-quote-container")

  // Result elements
  const materialCostElement = document.getElementById("material-cost")
  const laborCostElement = document.getElementById("labor-cost")
  const subtotalElement = document.getElementById("subtotal")
  const totalCostElement = document.getElementById("total-cost")
  const pricePerSqftElement = document.getElementById("price-per-sqft")
  const lifespanElement = document.getElementById("lifespan")

  // Calculator data
  let calculatorData

  // Fetch calculator data
  fetch("/assets/js/calculator-data.json")
    .then((response) => response.json())
    .then((data) => {
      calculatorData = data
      initializeCalculator()
    })
    .catch((error) => {
      console.error("Error loading calculator data:", error)
    })

  function initializeCalculator() {
    // Enable/disable calculate button based on form completion
    if (calculateButton) {
      ;[squareFootageInput, materialSelect, complexitySelect, pitchSelect, locationSelect].forEach((element) => {
        if (element) {
          element.addEventListener("change", checkFormCompletion)
          element.addEventListener("input", checkFormCompletion)
        }
      })

      calculateButton.addEventListener("click", calculateCost)
    }

    // Initial check
    checkFormCompletion()
    handleGetQuoteClick()
  }

  function checkFormCompletion() {
    if (!calculateButton) return

    const isComplete =
      squareFootageInput &&
      squareFootageInput.value &&
      materialSelect &&
      materialSelect.value &&
      complexitySelect &&
      complexitySelect.value &&
      pitchSelect &&
      pitchSelect.value &&
      locationSelect &&
      locationSelect.value

    calculateButton.disabled = !isComplete
  }

  function calculateCost() {
    if (!calculatorData) {
      console.error("Calculator data not loaded")
      return
    }

    const area = Number.parseFloat(squareFootageInput.value)
    const materialData = calculatorData.materials[materialSelect.value]
    const complexityMultiplier = calculatorData.multipliers.complexity[complexitySelect.value]
    const pitchMultiplier = calculatorData.multipliers.pitch[pitchSelect.value]
    const locationMultiplier = calculatorData.multipliers.location[locationSelect.value]

    // Base material cost
    const materialCost = area * materialData.price

    // Labor cost (typically 60% of total project cost)
    const laborCost = materialCost * 1.5 * complexityMultiplier * pitchMultiplier * locationMultiplier

    // Calculate totals
    const subtotal = materialCost + laborCost
    const total = subtotal * 1.1 // 10% for overhead and profit
    const pricePerSqft = Math.round((total / area) * 100) / 100
    const lifespan = materialData.lifespan

    // Update the UI
    if (materialCostElement) materialCostElement.textContent = "$" + Math.round(materialCost).toLocaleString()
    if (laborCostElement) laborCostElement.textContent = "$" + Math.round(laborCost).toLocaleString()
    if (subtotalElement) subtotalElement.textContent = "$" + Math.round(subtotal).toLocaleString()
    if (totalCostElement) totalCostElement.textContent = "$" + Math.round(total).toLocaleString()
    if (pricePerSqftElement) pricePerSqftElement.textContent = "$" + pricePerSqft
    if (lifespanElement) lifespanElement.textContent = lifespan + " years"

    // Show results and hide empty state
    if (emptyState) emptyState.style.display = "none"
    if (results) results.style.display = "block"
    if (getQuoteContainer) getQuoteContainer.style.display = "block"
  }

  function handleGetQuoteClick() {
    const getQuoteButton = document.getElementById("get-quote-button")

    if (getQuoteButton) {
      getQuoteButton.addEventListener("click", () => {
        // Collect calculator data
        const area = Number.parseFloat(squareFootageInput.value)
        const material = materialSelect.value
        const complexity = complexitySelect.value
        const pitch = pitchSelect.value
        const location = locationSelect.value
        const totalCost = totalCostElement.textContent

        // Create modal to collect contact information
        const modal = new Dialog({
          id: "quote-modal",
          title: "Request Your Detailed Quote",
          content: `
            <form id="calculator-quote-form" action="https://formsubmit.co/tim@americanremodeling.net" method="POST" class="space-y-4">
              <input type="hidden" name="_subject" value="New Calculator Quote Request">
              <input type="hidden" name="_captcha" value="false">
              <input type="hidden" name="_next" value="${window.location.origin}/quote/success">
              <input type="hidden" name="_template" value="table">
              <input type="hidden" name="square_footage" value="${area}">
              <input type="hidden" name="material" value="${material}">
              <input type="hidden" name="complexity" value="${complexity}">
              <input type="hidden" name="pitch" value="${pitch}">
              <input type="hidden" name="location" value="${location}">
              <input type="hidden" name="estimated_cost" value="${totalCost}">
              <input type="hidden" name="timestamp" value="${new Date().toISOString()}">
              <input type="hidden" name="page_url" value="${window.location.href}">
              
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" id="name" name="name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" id="email" name="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" id="phone" name="phone" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Address</label>
                <input type="text" id="address" name="address" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Additional Information</label>
                <textarea id="message" name="message" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"></textarea>
              </div>
              <div class="flex justify-end space-x-3">
                <button type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" onclick="document.querySelector('#quote-modal [data-close]').click()">Cancel</button>
                <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Submit Request</button>
              </div>
            </form>
          `,
        })

        // Open the modal
        modal.open()

        // Handle form submission with loading overlay
        const contactForm = document.getElementById("calculator-quote-form")
        if (contactForm) {
          contactForm.addEventListener("submit", (e) => {
            // Show loading overlay
            const loadingOverlay = document.createElement("div")
            loadingOverlay.className =
              "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            loadingOverlay.innerHTML = `
              <div class="text-center">
                <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-lg">Sending your information...</p>
              </div>
            `
            document.body.appendChild(loadingOverlay)

            // Close the modal
            modal.close()

            // Form will submit normally to FormSubmit
            // No need to prevent default
          })
        }
      })
    }
  }
})

