// Toast notification system
class ToastSystem {
  constructor() {
    this.toastContainer = null
    this.toasts = []
    this.init()
  }

  init() {
    // Create toast container if it doesn't exist
    if (!document.getElementById("toast-container")) {
      this.toastContainer = document.createElement("div")
      this.toastContainer.id = "toast-container"
      this.toastContainer.className = "fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2"
      document.body.appendChild(this.toastContainer)
    } else {
      this.toastContainer = document.getElementById("toast-container")
    }
  }

  show(options = {}) {
    const { title = "", description = "", type = "default", duration = 5000 } = options

    // Create toast element
    const toast = document.createElement("div")
    toast.className = `toast transform transition-all duration-300 ease-out translate-y-2 opacity-0 
                      flex items-start gap-3 p-4 rounded-lg shadow-lg max-w-sm w-full`

    // Add appropriate background color based on type
    switch (type) {
      case "success":
        toast.classList.add(
          "bg-green-50",
          "dark:bg-green-900/20",
          "border",
          "border-green-200",
          "dark:border-green-800",
        )
        break
      case "error":
        toast.classList.add("bg-red-50", "dark:bg-red-900/20", "border", "border-red-200", "dark:border-red-800")
        break
      case "warning":
        toast.classList.add(
          "bg-yellow-50",
          "dark:bg-yellow-900/20",
          "border",
          "border-yellow-200",
          "dark:border-yellow-800",
        )
        break
      case "info":
        toast.classList.add("bg-blue-50", "dark:bg-blue-900/20", "border", "border-blue-200", "dark:border-blue-800")
        break
      default:
        toast.classList.add("bg-white", "dark:bg-gray-800", "border", "border-gray-200", "dark:border-gray-700")
    }

    // Create icon based on type
    let iconSvg = ""
    switch (type) {
      case "success":
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        break
      case "error":
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
        break
      case "warning":
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
        break
      case "info":
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
        break
      default:
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    }

    // Create toast content
    toast.innerHTML = `
      <div class="flex-shrink-0">
        ${iconSvg}
      </div>
      <div class="flex-1">
        ${title ? `<h3 class="font-medium text-gray-900 dark:text-gray-100">${title}</h3>` : ""}
        ${description ? `<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${description}</p>` : ""}
      </div>
      <button class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `

    // Add toast to container
    this.toastContainer.appendChild(toast)

    // Add to toasts array
    const toastId = Date.now()
    this.toasts.push({ id: toastId, element: toast })

    // Show toast with animation
    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0")
      toast.classList.add("translate-y-0", "opacity-100")
    }, 10)

    // Add close button functionality
    const closeButton = toast.querySelector("button")
    closeButton.addEventListener("click", () => {
      this.dismiss(toastId)
    })

    // Auto dismiss after duration
    if (duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        this.dismiss(toastId)
      }, duration)
    }

    return toastId
  }

  dismiss(id) {
    const toastIndex = this.toasts.findIndex((t) => t.id === id)

    if (toastIndex !== -1) {
      const toast = this.toasts[toastIndex]

      // Hide with animation
      toast.element.classList.remove("translate-y-0", "opacity-100")
      toast.element.classList.add("translate-y-2", "opacity-0")

      // Remove after animation
      setTimeout(() => {
        if (toast.element.parentNode === this.toastContainer) {
          this.toastContainer.removeChild(toast.element)
        }
        this.toasts.splice(toastIndex, 1)
      }, 300)
    }
  }

  success(options = {}) {
    return this.show({ ...options, type: "success" })
  }

  error(options = {}) {
    return this.show({ ...options, type: "error" })
  }

  warning(options = {}) {
    return this.show({ ...options, type: "warning" })
  }

  info(options = {}) {
    return this.show({ ...options, type: "info" })
  }
}

// Initialize toast system
document.addEventListener("DOMContentLoaded", () => {
  window.toast = new ToastSystem()
})

