// Progress ring functionality
class ProgressRing {
  constructor(element, options = {}) {
    this.element = element
    this.size = options.size || 120
    this.strokeWidth = options.strokeWidth || 8
    this.progress = options.progress || 0
    this.init()
  }

  init() {
    this.radius = (this.size - this.strokeWidth) / 2
    this.circumference = this.radius * 2 * Math.PI
    this.render()
    this.setProgress(this.progress)
  }

  render() {
    this.element.innerHTML = `
      <svg class="progress-ring -rotate-90" width="${this.size}" height="${this.size}">
        <circle
          class="text-white/5"
          stroke="currentColor"
          stroke-width="${this.strokeWidth}"
          fill="transparent"
          r="${this.radius}"
          cx="${this.size / 2}"
          cy="${this.size / 2}"
        />
        <circle
          class="transition-all duration-500 ease-out"
          stroke="url(#progressGradient)"
          stroke-width="${this.strokeWidth}"
          stroke-dasharray="${this.circumference} ${this.circumference}"
          stroke-dashoffset="${this.circumference}"
          stroke-linecap="round"
          fill="transparent"
          r="${this.radius}"
          cx="${this.size / 2}"
          cy="${this.size / 2}"
        />
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
          ${this.progress}%
        </span>
      </div>
    `
  }

  setProgress(progress) {
    this.progress = progress
    const offset = this.circumference - (progress / 100) * this.circumference
    const circle = this.element.querySelector("circle:nth-child(2)")
    const text = this.element.querySelector("span")

    if (circle) {
      circle.style.strokeDashoffset = offset
    }

    if (text) {
      text.textContent = `${progress}%`
    }
  }
}

// Initialize progress rings
document.addEventListener("DOMContentLoaded", () => {
  const progressRingElements = document.querySelectorAll(".progress-ring-container")

  progressRingElements.forEach((element) => {
    const progress = Number.parseInt(element.dataset.progress || 0)
    const size = Number.parseInt(element.dataset.size || 120)
    const strokeWidth = Number.parseInt(element.dataset.strokeWidth || 8)

    new ProgressRing(element, {
      progress,
      size,
      strokeWidth,
    })
  })
})

