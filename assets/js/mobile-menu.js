// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("mobile-menu-button")
  const closeButton = document.getElementById("mobile-menu-close")
  const mobileMenu = document.getElementById("mobile-menu")
  const overlay = document.getElementById("mobile-menu-overlay")

  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove("-translate-x-full")
      mobileMenu.classList.add("translate-x-0")
    }

    if (overlay) {
      overlay.classList.remove("opacity-0", "pointer-events-none")
      overlay.classList.add("opacity-100", "pointer-events-auto")
    }

    // Prevent body scrolling
    document.body.style.overflow = "hidden"
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove("translate-x-0")
      mobileMenu.classList.add("-translate-x-full")
    }

    if (overlay) {
      overlay.classList.remove("opacity-100", "pointer-events-auto")
      overlay.classList.add("opacity-0", "pointer-events-none")
    }

    // Restore body scrolling
    document.body.style.overflow = ""
  }

  // Add event listeners
  if (menuButton) {
    menuButton.addEventListener("click", openMenu)
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeMenu)
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu)
  }

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu()
    }
  })

  // Close menu when clicking on a menu link
  const menuLinks = document.querySelectorAll("#mobile-menu a")
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu)
  })
})

