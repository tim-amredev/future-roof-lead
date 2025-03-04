// Dialog/Modal functionality
class Dialog {
  constructor(options = {}) {
    this.options = {
      id: options.id || `dialog-${Date.now()}`,
      title: options.title || "",
      description: options.description || "",
      content: options.content || "",
      closeOnOverlayClick: options.closeOnOverlayClick !== undefined ? options.closeOnOverlayClick : true,
      onOpen: options.onOpen || (() => {}),
      onClose: options.onClose || (() => {}),
    }

    this.isOpen = false
    this.element = null
    this.createDialog()
  }

  createDialog() {
    // Check if dialog already exists
    const existingDialog = document.getElementById(this.options.id)
    if (existingDialog) {
      this.element = existingDialog
      return
    }

    // Create dialog element
    this.element = document.createElement("div")
    this.element.id = this.options.id
    this.element.className =
      "fixed inset-0 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300"
    this.element.setAttribute("aria-modal", "true")
    this.element.setAttribute("role", "dialog")

    // Create dialog HTML
    this.element.innerHTML = `
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-300" data-overlay></div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[85vh] overflow-auto opacity-0 transform translate-y-4 transition-all duration-300">
        <div class="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            ${this.options.title ? `<h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">${this.options.title}</h2>` : ""}
            ${this.options.description ? `<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${this.options.description}</p>` : ""}
          </div>
          <button class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" data-close>
            <span class="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="p-4" data-content>
          ${this.options.content}
        </div>
      </div>
    `

    // Add to document
    document.body.appendChild(this.element)

    // Add event listeners
    const closeButton = this.element.querySelector("[data-close]")
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close())
    }

    const overlay = this.element.querySelector("[data-overlay]")
    if (overlay && this.options.closeOnOverlayClick) {
      overlay.addEventListener("click", () => this.close())
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close()
      }
    })
  }

  setContent(content) {
    const contentContainer = this.element.querySelector("[data-content]")
    if (contentContainer) {
      contentContainer.innerHTML = content
    }
  }

  open() {
    if (this.isOpen) return

    // Show dialog
    this.element.classList.remove("opacity-0", "pointer-events-none")
    this.element.classList.add("opacity-100", "pointer-events-auto")

    // Show overlay and dialog content with animation
    const overlay = this.element.querySelector("[data-overlay]")
    const dialog = this.element.querySelector(".bg-white, .dark\\:bg-gray-800")

    if (overlay) {
      overlay.classList.remove("opacity-0")
      overlay.classList.add("opacity-100")
    }

    if (dialog) {
      dialog.classList.remove("opacity-0", "translate-y-4")
      dialog.classList.add("opacity-100", "translate-y-0")
    }

    // Prevent body scrolling
    document.body.style.overflow = "hidden"

    this.isOpen = true
    this.options.onOpen()
  }

  close() {
    if (!this.isOpen) return

    // Hide overlay and dialog content with animation
    const overlay = this.element.querySelector("[data-overlay]")
    const dialog = this.element.querySelector(".bg-white, .dark\\:bg-gray-800")

    if (overlay) {
      overlay.classList.remove("opacity-100")
      overlay.classList.add("opacity-0")
    }

    if (dialog) {
      dialog.classList.remove("opacity-100", "translate-y-0")
      dialog.classList.add("opacity-0", "translate-y-4")
    }

    // Hide dialog after animation
    setTimeout(() => {
      this.element.classList.remove("opacity-100", "pointer-events-auto")
      this.element.classList.add("opacity-0", "pointer-events-none")

      // Restore body scrolling
      document.body.style.overflow = ""

      this.isOpen = false
      this.options.onClose()
    }, 300)
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }
}

// Initialize dialog system
document.addEventListener("DOMContentLoaded", () => {
  window.Dialog = Dialog

  // Initialize dialogs with data-dialog attribute
  const dialogTriggers = document.querySelectorAll("[data-dialog]")
  dialogTriggers.forEach((trigger) => {
    const dialogId = trigger.dataset.dialog
    const dialogElement = document.getElementById(dialogId)

    if (dialogElement) {
      const dialog = new Dialog({
        id: dialogId,
        title: dialogElement.dataset.title || "",
        description: dialogElement.dataset.description || "",
        content: dialogElement.innerHTML,
        closeOnOverlayClick: dialogElement.dataset.closeOnOverlayClick !== "false",
      })

      // Hide the original element
      dialogElement.style.display = "none"

      // Add click event to trigger
      trigger.addEventListener("click", (e) => {
        e.preventDefault()
        dialog.open()
      })
    }
  })
})

