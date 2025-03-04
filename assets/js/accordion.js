// Accordion functionality
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll("[data-accordion]")

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll("[data-accordion-item]")
    const isCollapsible = accordion.dataset.collapsible !== "false"
    const allowMultiple = accordion.dataset.allowMultiple === "true"

    items.forEach((item) => {
      const trigger = item.querySelector("[data-accordion-trigger]")
      const content = item.querySelector("[data-accordion-content]")

      if (!trigger || !content) return

      // Set initial state
      const isOpen = item.dataset.open === "true"
      updateItemState(item, isOpen)

      // Toggle accordion item
      trigger.addEventListener("click", () => {
        const isCurrentlyOpen = trigger.getAttribute("aria-expanded") === "true"

        // Close other open items if not allowing multiple
        if (!allowMultiple && !isCurrentlyOpen) {
          items.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherTrigger = otherItem.querySelector("[data-accordion-trigger]")
              if (otherTrigger && otherTrigger.getAttribute("aria-expanded") === "true") {
                updateItemState(otherItem, false)
              }
            }
          })
        }

        // Toggle current item
        if (isCollapsible || !isCurrentlyOpen) {
          updateItemState(item, !isCurrentlyOpen)
        }
      })

      // Add keyboard navigation
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          trigger.click()
        }
      })
    })

    function updateItemState(item, isOpen) {
      const trigger = item.querySelector("[data-accordion-trigger]")
      const content = item.querySelector("[data-accordion-content]")
      const icon = trigger.querySelector("[data-accordion-icon]")

      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false")
      content.setAttribute("aria-hidden", isOpen ? "false" : "true")

      if (isOpen) {
        content.style.maxHeight = `${content.scrollHeight}px`
        item.classList.add("open")

        if (icon) {
          icon.classList.add("rotate-180")
        }
      } else {
        content.style.maxHeight = "0"
        item.classList.remove("open")

        if (icon) {
          icon.classList.remove("rotate-180")
        }
      }
    }
  })
})

