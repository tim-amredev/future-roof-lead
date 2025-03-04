// Main JavaScript file for the site
document.addEventListener("DOMContentLoaded", () => {
  // Add current year to copyright text
  const yearElements = document.querySelectorAll(".current-year")
  const currentYear = new Date().getFullYear()
  yearElements.forEach((element) => {
    element.textContent = currentYear
  })

  console.log("Instant Roofing site initialized")

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for fixed header
          behavior: "smooth",
        })
      }
    })
  })

  // Initialize animations for elements with data-animate attribute
  const animatedElements = document.querySelectorAll("[data-animate]")

  if (animatedElements.length > 0) {
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target
            const animation = element.dataset.animate
            const delay = element.dataset.delay || 0

            setTimeout(() => {
              element.classList.add("animated", animation)
              element.classList.remove("opacity-0")
            }, delay)

            // Unobserve after animation
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    // Observe elements
    animatedElements.forEach((element) => {
      element.classList.add("opacity-0")
      observer.observe(element)
    })
  }

  // Add mobile menu toggle functionality if needed
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }
})

