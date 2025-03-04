// Multi-select options functionality
document.addEventListener("DOMContentLoaded", () => {
  const multiSelects = document.querySelectorAll(".multi-select")

  multiSelects.forEach((multiSelect) => {
    const checkboxes = multiSelect.querySelectorAll('input[type="checkbox"]')

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const label = checkbox.closest("label")

        if (checkbox.checked) {
          label.classList.add("ring-2")
          label.classList.add("ring-primary")
          label.classList.add("ring-offset-2")
          label.classList.add("ring-offset-background")

          const checkIcon = label.querySelector(".check-icon")
          if (checkIcon) {
            checkIcon.classList.remove("opacity-0")
          }
        } else {
          label.classList.remove("ring-2")
          label.classList.remove("ring-primary")
          label.classList.remove("ring-offset-2")
          label.classList.remove("ring-offset-background")

          const checkIcon = label.querySelector(".check-icon")
          if (checkIcon) {
            checkIcon.classList.add("opacity-0")
          }
        }
      })
    })
  })
})

