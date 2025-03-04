// Theme switcher functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Set initial theme
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add("dark")
    if (themeToggle) themeToggle.checked = true
  }

  // Toggle theme when the switch is clicked
  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        htmlElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        htmlElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Listen for system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        htmlElement.classList.add("dark")
        if (themeToggle) themeToggle.checked = true
      } else {
        htmlElement.classList.remove("dark")
        if (themeToggle) themeToggle.checked = false
      }
    }
  })
})

