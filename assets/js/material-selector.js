// Material selector functionality
document.addEventListener("DOMContentLoaded", () => {
  const materialSelectors = document.querySelectorAll(".material-selector")

  materialSelectors.forEach((selector) => {
    const radioInputs = selector.querySelectorAll('input[type="radio"]')
    const materialCards = selector.querySelectorAll(".material-card")

    radioInputs.forEach((input) => {
      input.addEventListener("change", () => {
        const selectedValue = input.value

        materialCards.forEach((card) => {
          const cardValue = card.dataset.value

          if (cardValue === selectedValue) {
            card.classList.add("selected")
            card.classList.add("ring-2")
            card.classList.add("ring-primary")
            card.classList.add("ring-offset-2")
            card.classList.add("ring-offset-background")
            card.classList.add("scale-105")

            const label = card.querySelector(".material-label")
            if (label) {
              label.classList.add("text-transparent")
              label.classList.add("bg-clip-text")
              label.classList.add("bg-gradient-to-r")
              label.classList.add("from-primary")
              label.classList.add("via-secondary")
              label.classList.add("to-accent")
            }

            const overlay = card.querySelector(".material-overlay")
            if (overlay) {
              overlay.classList.add("opacity-50")
              overlay.classList.remove("opacity-0")
            }
          } else {
            card.classList.remove("selected")
            card.classList.remove("ring-2")
            card.classList.remove("ring-primary")
            card.classList.remove("ring-offset-2")
            card.classList.remove("ring-offset-background")
            card.classList.remove("scale-105")

            const label = card.querySelector(".material-label")
            if (label) {
              label.classList.remove("text-transparent")
              label.classList.remove("bg-clip-text")
              label.classList.remove("bg-gradient-to-r")
              label.classList.remove("from-primary")
              label.classList.remove("via-secondary")
              label.classList.remove("to-accent")
            }

            const overlay = card.querySelector(".material-overlay")
            if (overlay) {
              overlay.classList.remove("opacity-50")
              overlay.classList.add("opacity-0")
            }
          }
        })
      })
    })

    // Add hover effects
    materialCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (!card.classList.contains("selected")) {
          card.classList.add("scale-105")

          const overlay = card.querySelector(".material-overlay")
          if (overlay) {
            overlay.classList.add("opacity-30")
            overlay.classList.remove("opacity-0")
          }
        }
      })

      card.addEventListener("mouseleave", () => {
        if (!card.classList.contains("selected")) {
          card.classList.remove("scale-105")

          const overlay = card.querySelector(".material-overlay")
          if (overlay) {
            overlay.classList.remove("opacity-30")
            overlay.classList.add("opacity-0")
          }
        }
      })
    })
  })
})

