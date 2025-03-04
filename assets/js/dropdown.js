// Dropdown menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll("[data-dropdown]")

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("[data-dropdown-trigger]")
    const menu = dropdown.querySelector("[data-dropdown-menu]")

    if (!trigger || !menu) return

    let isOpen = false

    // Toggle dropdown
    function toggleDropdown(event) {
      event.preventDefault()
      event.stopPropagation()

      if (isOpen) {
        closeDropdown()
      } else {
        openDropdown()
      }
    }

    // Open dropdown
    function openDropdown() {
      if (isOpen) return

      // Close other open dropdowns
      document.querySelectorAll('[data-dropdown-menu][aria-hidden="false"]').forEach((openMenu) => {
        if (openMenu !== menu) {
          openMenu.setAttribute("aria-hidden", "true")
          openMenu.classList.add("opacity-0", "scale-95")
          openMenu.classList.remove("opacity-100", "scale-100")
        }
      })

      // Show this dropdown
      menu.setAttribute("aria-hidden", "false")
      menu.classList.remove("opacity-0", "scale-95")
      menu.classList.add("opacity-100", "scale-100")

      isOpen = true

      // Add global click listener to close dropdown when clicking outside
      setTimeout(() => {
        document.addEventListener("click", documentClickHandler)
      }, 0)
    }

    // Close dropdown
    function closeDropdown() {
      if (!isOpen) return

      menu.setAttribute("aria-hidden", "true")
      menu.classList.add("opacity-0", "scale-95")
      menu.classList.remove("opacity-100", "scale-100")

      isOpen = false

      // Remove global click listener
      document.removeEventListener("click", documentClickHandler)
    }

    // Handle clicks outside the dropdown
    function documentClickHandler(event) {
      if (!dropdown.contains(event.target)) {
        closeDropdown()
      }
    }

    // Add event listeners
    trigger.addEventListener("click", toggleDropdown)

    // Close on Escape key
    dropdown.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) {
        closeDropdown()
      }
    })

    // Initialize menu state
    menu.setAttribute("aria-hidden", "true")
    menu.classList.add("opacity-0", "scale-95")
    menu.classList.remove("opacity-100", "scale-100")
  })
})

