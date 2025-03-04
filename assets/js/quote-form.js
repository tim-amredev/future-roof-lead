// Quote form functionality
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
  const achievementBadges = document.querySelectorAll(".achievement-badge")

  // Initialize the form
  if (form) {
    initializeForm()
  }

  function initializeForm() {
    // Show first step
    showStep(currentStep)
    updateProgressRing()

    // Add event listeners
    if (nextButton) {
      nextButton.addEventListener("click", nextStep)
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
    } else {
      if (errorElement) {
        errorElement.style.display = "block"
      }
    }
  }

  function validateStep(step) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`)
    if (!currentFormStep) return true

    const requiredFields = currentFormStep.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.checkValidity()) {
        isValid = false
        const errorElement = document.getElementById(`${field.name}-error`)
        if (errorElement) {
          errorElement.style.display = "block"
        }
      }
    })

    return isValid
  }

  function showStep(step) {
    // Hide all steps
    formSteps.forEach((formStep) => {
      formStep.style.display = "none"
    })

    // Show current step
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

    // Update step indicators
    stepIndicators.forEach((indicator) => {
      const indicatorStep = Number.parseInt(indicator.dataset.step)

      if (completedSteps.includes(indicatorStep)) {
        indicator.classList.add("completed")
        indicator.classList.add("bg-primary")
        indicator.classList.add("text-background")
      } else if (indicatorStep === step) {
        indicator.classList.add("ring-2")
        indicator.classList.add("ring-primary")
        indicator.classList.add("ring-offset-2")
        indicator.classList.add("ring-offset-background")
      } else {
        indicator.classList.remove("completed")
        indicator.classList.remove("bg-primary")
        indicator.classList.remove("text-background")
        indicator.classList.remove("ring-2")
        indicator.classList.remove("ring-primary")
        indicator.classList.remove("ring-offset-2")
        indicator.classList.remove("ring-offset-background")
      }
    })
  }

  function nextStep() {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        completedSteps.push(currentStep)
        updateAchievements()
        updateProgressRing()
        celebrateCompletion()
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

  function updateAchievements() {
    achievementBadges.forEach((badge) => {
      const badgeStep = Number.parseInt(badge.dataset.step)

      if (completedSteps.includes(badgeStep)) {
        badge.classList.remove("opacity-50")
        badge.classList.add("achievement-unlock")

        const icon = badge.querySelector("svg")
        if (icon) {
          icon.classList.remove("text-white/20")
          icon.classList.add("text-primary")
        }

        const iconContainer = badge.querySelector(".w-12.h-12")
        if (iconContainer) {
          iconContainer.classList.remove("bg-white/5")
          iconContainer.classList.add("bg-primary/20")
        }

        const title = badge.querySelector("h3")
        if (title) {
          title.classList.add(
            "text-transparent",
            "bg-clip-text",
            "bg-gradient-to-r",
            "from-primary",
            "via-secondary",
            "to-accent",
          )
        }

        const description = badge.querySelector("p")
        if (description) {
          description.classList.remove("text-foreground/40")
          description.classList.add("text-foreground/80")
        }
      }
    })
  }

  function celebrateCompletion() {
    // Create confetti effect
    const confettiContainer = document.createElement("div")
    confettiContainer.className = "confetti-container fixed inset-0 pointer-events-none z-50"
    document.body.appendChild(confettiContainer)

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("div")
      particle.className = "confetti-particle absolute"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
      particle.style.width = `${Math.random() * 10 + 5}px`
      particle.style.height = `${Math.random() * 10 + 5}px`
      particle.style.transform = `rotate(${Math.random() * 360}deg)`
      particle.style.opacity = "0"
      particle.style.animation = `confetti-fall ${Math.random() * 3 + 2}s ease-out forwards`
      confettiContainer.appendChild(particle)
    }

    // Add animation style
    const style = document.createElement("style")
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)

    // Remove confetti after animation
    setTimeout(() => {
      confettiContainer.remove()
      style.remove()
    }, 5000)
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Show loading overlay
    const loadingOverlay = document.createElement("div")
    loadingOverlay.className = "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    loadingOverlay.innerHTML = `
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-lg">Sending your information...</p>
      </div>
    `
    document.body.appendChild(loadingOverlay)

    // Collect all form data
    const formData = new FormData(form)

    // Add timestamp
    formData.append("timestamp", new Date().toISOString())

    // Add page URL
    formData.append("page_url", window.location.href)

    // Add form summary for email subject
    formData.append("_subject", "New Roofing Quote Request")

    // Send form data using FormSubmit
    fetch("https://formsubmit.co/tim@americanremodeling.net", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to success page
          window.location.href = "/quote/success"
        } else {
          throw new Error("Network response was not ok.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)

        // Remove loading overlay
        loadingOverlay.remove()

        // Show error message
        if (window.toast) {
          window.toast.error({
            title: "Error",
            description: "There was a problem submitting your form. Please try again.",
          })
        } else {
          alert("There was a problem submitting your form. Please try again.")
        }
      })
  }
})

