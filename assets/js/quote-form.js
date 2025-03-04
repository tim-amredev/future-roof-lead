document.addEventListener("DOMContentLoaded", () => {
  // Form steps configuration
  const totalSteps = 5
  let currentStep = 1
  const completedSteps = []

  // DOM elements
  const form = document.getElementById("quote-form")
  const formSteps = document.querySelectorAll(".form-step")
  const nextButton = document.querySelector(".next-step")
  const prevButton = document.querySelector(".prev-step")
  const submitButton = document.querySelector(".submit-quote")
  const prevButtonContainer = document.querySelector(".prev-button-container")
  const progressRing = document.querySelector(".progress-ring")
  const progressText = document.querySelector(".progress-text")
  const stepIndicators = document.querySelectorAll(".progress-step")

  // Initialize the form
  if (form) {
    initializeForm()
  }

  function initializeForm() {
    showStep(currentStep)
    updateProgressRing()

    // Add event listeners
    if (nextButton) {
      nextButton.addEventListener("click", nextStep)
      console.log("Next button event listener added")
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevStep)
    }

    if (form) {
      form.addEventListener("submit", handleSubmit)
    }

    // Add validation to required fields
    const requiredFields = form.querySelectorAll("[required]")
    requiredFields.forEach((field) => {
      field.addEventListener("change", validateField)
      field.addEventListener("input", validateField)
    })
  }

  function validateField(e) {
    const field = e.target
    const errorElement = document.getElementById(`${field.name}-error`)

    if (field.checkValidity()) {
      if (errorElement) {
        errorElement.style.display = "none"
      }
      return true
    } else {
      if (errorElement) {
        errorElement.style.display = "block"
      }
      return false
    }
  }

  function validateStep(step) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`)
    if (!currentFormStep) return true

    let isValid = true
    const requiredFields = currentFormStep.querySelectorAll("[required]")
    const radioGroups = new Set()

    requiredFields.forEach((field) => {
      if (field.type === "radio") {
        radioGroups.add(field.name)
      } else if (!validateField({ target: field })) {
        isValid = false
      }
    })

    // Validate radio groups
    radioGroups.forEach((groupName) => {
      const checkedRadio = currentFormStep.querySelector(`input[name="${groupName}"]:checked`)
      if (!checkedRadio) {
        isValid = false
        const errorElement = document.getElementById(`${groupName}-error`)
        if (errorElement) {
          errorElement.style.display = "block"
        }
      }
    })

    return isValid
  }

  function showStep(step) {
    console.log("Showing step:", step)
    formSteps.forEach((formStep) => {
      formStep.style.display = "none"
    })

    const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`)
    if (currentFormStep) {
      currentFormStep.style.display = "block"
    }

    // Update navigation buttons
    if (step > 1) {
      prevButtonContainer.style.display = "block"
    } else {
      prevButtonContainer.style.display = "none"
    }

    if (step === totalSteps) {
      nextButton.style.display = "none"
      submitButton.style.display = "block"
    } else {
      nextButton.style.display = "block"
      submitButton.style.display = "none"
    }

    // Update progress indicators
    updateStepIndicators(step)
  }

  function updateStepIndicators(currentStep) {
    stepIndicators.forEach((indicator) => {
      const indicatorStep = Number.parseInt(indicator.dataset.step)

      indicator.classList.remove("completed", "current", "bg-primary", "text-background", "ring-2", "ring-primary")

      if (completedSteps.includes(indicatorStep)) {
        indicator.classList.add("completed", "bg-primary", "text-background")
      } else if (indicatorStep === currentStep) {
        indicator.classList.add("current", "ring-2", "ring-primary")
      }
    })
  }

  function nextStep() {
    console.log("Next step clicked, current step:", currentStep)
    if (currentStep < totalSteps && validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        completedSteps.push(currentStep)
        updateProgressRing()
      }
      currentStep++
      showStep(currentStep)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--
      showStep(currentStep)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function updateProgressRing() {
    const progress = Math.round((completedSteps.length / totalSteps) * 100)

    if (progressText) {
      progressText.textContent = `${progress}%`
    }

    if (progressRing) {
      const radius = 56
      const circumference = radius * 2 * Math.PI
      const offset = circumference - (progress / 100) * circumference

      const progressCircle = progressRing.querySelector("circle:nth-child(2)")
      if (progressCircle) {
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`
        progressCircle.style.strokeDashoffset = offset
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    const formData = new FormData(form)

    // Add metadata
    formData.append("timestamp", new Date().toISOString())
    formData.append("page_url", window.location.href)
    formData.append("_subject", "New Roofing Quote Request")

    // Show loading state
    const loadingOverlay = document.createElement("div")
    loadingOverlay.className = "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    loadingOverlay.innerHTML = `
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-lg">Sending your information...</p>
      </div>
    `
    document.body.appendChild(loadingOverlay)

    // Submit form
    fetch("https://formsubmit.co/tim@americanremodeling.net", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = `${window.location.pathname}/success`
        } else {
          throw new Error("Network response was not ok.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        loadingOverlay.remove()
        alert("There was a problem submitting your form. Please try again.")
      })
  }
})

