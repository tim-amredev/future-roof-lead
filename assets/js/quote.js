document.addEventListener("DOMContentLoaded", () => {
  // Form steps configuration
  const totalSteps = 5
  let currentStep = 1
  const completedSteps = []

  // Achievement data
  const achievements = [
    {
      title: "Project Initialized",
      description: "Complete the basic information",
      step: 1,
    },
    {
      title: "Tech Specs Added",
      description: "Specify your roof details",
      step: 2,
    },
    {
      title: "Requirements Set",
      description: "Define your project specifics",
      step: 3,
    },
    {
      title: "Parameters Defined",
      description: "Set your preferences and budget",
      step: 4,
    },
    {
      title: "Final Configuration",
      description: "Complete contact information",
      step: 5,
    },
  ]

  // DOM elements
  const form = document.getElementById("quote-form")
  const nextButton = document.querySelector(".next-step")
  const prevButton = document.querySelector(".prev-step")
  const submitButton = document.querySelector(".submit-quote")
  const prevButtonContainer = document.querySelector(".prev-button-container")
  const progressRingContainer = document.getElementById("progress-ring-container")
  const achievementsContainer = document.getElementById("achievements-container")
  const stepsProgressContainer = document.getElementById("steps-progress-container")

  // Initialize the form
  initializeForm()

  // Event listeners
  nextButton.addEventListener("click", nextStep)
  prevButton.addEventListener("click", prevStep)
  form.addEventListener("submit", handleSubmit)

  // Functions
  function initializeForm() {
    // Create achievement badges
    createAchievementBadges()

    // Create step indicators
    createStepIndicators()

    // Create progress ring
    updateProgressRing()

    // Show first step
    showStep(currentStep)
  }

  function createAchievementBadges() {
    achievements.forEach((achievement) => {
      const badge = document.createElement("div")
      badge.className = `card-future relative overflow-hidden transition-all duration-300 ${completedSteps.includes(achievement.step) ? "achievement-unlock" : "opacity-50"}`
      badge.dataset.step = achievement.step

      badge.innerHTML = `
        <div class="relative p-4 rounded-xl flex items-center gap-4 z-10">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center ${completedSteps.includes(achievement.step) ? "bg-primary/20" : "bg-white/5"}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 ${completedSteps.includes(achievement.step) ? "text-primary" : "text-white/20"}">
              <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11"></path>
              <path d="M15 7a3 3 0 1 0-6 0c0 1.66 1.34 3 3 3s3-1.34 3-3z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold ${completedSteps.includes(achievement.step) ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent" : ""}">
              ${achievement.title}
            </h3>
            <p class="${completedSteps.includes(achievement.step) ? "text-foreground/80" : "text-foreground/40"}">${achievement.description}</p>
          </div>
        </div>
      `

      achievementsContainer.appendChild(badge)
    })
  }

  function createStepIndicators() {
    for (let i = 1; i <= totalSteps; i++) {
      const stepIndicator = document.createElement("div")
      stepIndicator.className = `
        progress-step relative flex items-center justify-center w-12 h-12 rounded-xl text-sm font-medium
        ${completedSteps.includes(i) ? "bg-primary text-background" : i === currentStep ? "card-future ring-2 ring-primary ring-offset-2 ring-offset-background" : "card-future"}
        ${completedSteps.includes(i) ? "completed" : ""}
      `
      stepIndicator.dataset.step = i

      stepIndicator.innerHTML = completedSteps.includes(i)
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>`
        : i

      // Add connecting line
      if (i < totalSteps) {
        const line = document.createElement("div")
        line.className = `
          absolute left-full w-full h-0.5 -translate-y-1/2 top-1/2
          ${completedSteps.includes(i) ? "bg-primary" : "bg-white/10"}
        `
        stepIndicator.appendChild(line)
      }

      stepsProgressContainer.appendChild(stepIndicator)
    }
  }

  function updateProgressRing() {
    const progress = Math.round((completedSteps.length / totalSteps) * 100)

    progressRingContainer.innerHTML = `
      <div class="relative">
        <svg class="progress-ring -rotate-90" width="120" height="120">
          <!-- Background circle -->
          <circle
            class="text-white/5"
            stroke="currentColor"
            stroke-width="8"
            fill="transparent"
            r="56"
            cx="60"
            cy="60"
          />
          <!-- Progress circle with gradient -->
          <circle
            class="transition-all duration-500 ease-out"
            stroke="url(#progressGradient)"
            stroke-width="8"
            stroke-dasharray="${56 * 2 * Math.PI} ${56 * 2 * Math.PI}"
            stroke-dashoffset="${56 * 2 * Math.PI - (progress / 100) * (56 * 2 * Math.PI)}"
            stroke-linecap="round"
            fill="transparent"
            r="56"
            cx="60"
            cy="60"
          />
          <!-- Gradient definition -->
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="rgb(14, 165, 233)" />
              <stop offset="50%" stop-color="rgb(59, 130, 246)" />
              <stop offset="100%" stop-color="rgb(45, 212, 191)" />
            </linearGradient>
          </defs>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            ${progress}%
          </span>
        </div>
      </div>
    `
  }

  function showStep(step) {
    // Hide all steps
    const formSteps = document.querySelectorAll(".form-step")
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
    const stepIndicators = document.querySelectorAll(".progress-step")
    stepIndicators.forEach((indicator) => {
      const indicatorStep = Number.parseInt(indicator.dataset.step)

      indicator.className = `
        progress-step relative flex items-center justify-center w-12 h-12 rounded-xl text-sm font-medium
        ${completedSteps.includes(indicatorStep) ? "bg-primary text-background" : indicatorStep === step ? "card-future ring-2 ring-primary ring-offset-2 ring-offset-background" : "card-future"}
        ${completedSteps.includes(indicatorStep) ? "completed" : ""}
      `
    })
  }

  function nextStep() {
    if (currentStep < totalSteps) {
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

  function updateAchievements() {
    const achievementBadges = document.querySelectorAll("#achievements-container > div")
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
    // Simple confetti effect
    const confetti = document.createElement("div")
    confetti.className = "confetti-container"
    document.body.appendChild(confetti)

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("div")
      particle.className = "confetti-particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
      particle.style.width = `${Math.random() * 10 + 5}px`
      particle.style.height = `${Math.random() * 10 + 5}px`
      particle.style.transform = `rotate(${Math.random() * 360}deg)`
      confetti.appendChild(particle)
    }

    setTimeout(() => {
      confetti.remove()
    }, 2000)
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Simulate form submission
    const loadingOverlay = document.createElement("div")
    loadingOverlay.className = "loading-overlay"
    loadingOverlay.innerHTML = `
      <div class="loading-spinner"></div>
      <p>Generating your quote...</p>
    `
    document.body.appendChild(loadingOverlay)

    // Redirect after a delay
    setTimeout(() => {
      window.location.href = "/quote/success"
    }, 2000)
  }
})

