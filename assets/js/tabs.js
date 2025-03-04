// Tabs functionality
document.addEventListener("DOMContentLoaded", () => {
  const tabsContainers = document.querySelectorAll("[data-tabs]")

  tabsContainers.forEach((container) => {
    const tabsList = container.querySelector("[data-tabs-list]")
    const tabButtons = container.querySelectorAll("[data-tab]")
    const tabPanels = container.querySelectorAll("[data-tab-panel]")

    if (!tabsList || !tabButtons.length || !tabPanels.length) return

    // Set initial active tab
    let activeTab = container.dataset.defaultTab || tabButtons[0].dataset.tab

    // Initialize tabs
    updateActiveTabs(activeTab)

    // Add click event to tab buttons
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeTab = button.dataset.tab
        updateActiveTabs(activeTab)

        // Update URL hash if enabled
        if (container.dataset.tabsUrlHash === "true") {
          window.location.hash = activeTab
        }
      })

      // Add keyboard navigation
      button.addEventListener("keydown", (e) => {
        let index = Array.from(tabButtons).indexOf(button)

        if (e.key === "ArrowRight") {
          index = (index + 1) % tabButtons.length
          tabButtons[index].focus()
          tabButtons[index].click()
        } else if (e.key === "ArrowLeft") {
          index = (index - 1 + tabButtons.length) % tabButtons.length
          tabButtons[index].focus()
          tabButtons[index].click()
        }
      })
    })

    // Check URL hash on load if enabled
    if (container.dataset.tabsUrlHash === "true" && window.location.hash) {
      const hash = window.location.hash.substring(1)
      const tabButton = container.querySelector(`[data-tab="${hash}"]`)

      if (tabButton) {
        activeTab = hash
        updateActiveTabs(activeTab)
      }
    }

    function updateActiveTabs(tabId) {
      // Update tab buttons
      tabButtons.forEach((btn) => {
        const isActive = btn.dataset.tab === tabId

        btn.setAttribute("aria-selected", isActive ? "true" : "false")
        btn.setAttribute("tabindex", isActive ? "0" : "-1")

        if (isActive) {
          btn.classList.add("active", "border-primary", "text-primary")
          btn.classList.remove("border-transparent", "text-foreground/60", "hover:text-foreground/80")
        } else {
          btn.classList.remove("active", "border-primary", "text-primary")
          btn.classList.add("border-transparent", "text-foreground/60", "hover:text-foreground/80")
        }
      })

      // Update tab panels
      tabPanels.forEach((panel) => {
        const isActive = panel.dataset.tabPanel === tabId

        panel.setAttribute("aria-hidden", isActive ? "false" : "true")
        panel.style.display = isActive ? "block" : "none"
      })
    }
  })
})

