// Form validation functionality
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("[data-validate-form]")

  forms.forEach((form) => {
    const submitButton = form.querySelector('[type="submit"]')
    const fields = form.querySelectorAll("[data-validate]")

    // Add validation to fields
    fields.forEach((field) => {
      const validationType = field.dataset.validate
      const errorElement = document.getElementById(`${field.name}-error`)

      field.addEventListener("blur", () => validateField(field, validationType, errorElement))
      field.addEventListener("input", () => validateField(field, validationType, errorElement))
    })

    // Form submission
    form.addEventListener("submit", (e) => {
      let isValid = true

      // Validate all fields
      fields.forEach((field) => {
        const validationType = field.dataset.validate
        const errorElement = document.getElementById(`${field.name}-error`)

        if (!validateField(field, validationType, errorElement)) {
          isValid = false
        }
      })

      // Prevent submission if form is invalid
      if (!isValid) {
        e.preventDefault()

        // Focus first invalid field
        const firstInvalidField = Array.from(fields).find((field) => !field.validity.valid)
        if (firstInvalidField) {
          firstInvalidField.focus()
        }
      }
    })

    // Validate field based on type
    function validateField(field, validationType, errorElement) {
      let isValid = true
      let errorMessage = ""

      // Clear previous error
      field.classList.remove("border-red-500", "focus:ring-red-500")
      if (errorElement) {
        errorElement.textContent = ""
        errorElement.style.display = "none"
      }

      // Required validation
      if (field.hasAttribute("required") && !field.value.trim()) {
        isValid = false
        errorMessage = "This field is required"
      }

      // Email validation
      if (validationType === "email" && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(field.value)) {
          isValid = false
          errorMessage = "Please enter a valid email address"
        }
      }

      // Phone validation
      if (validationType === "phone" && field.value.trim()) {
        const phoneRegex = /^$$?([0-9]{3})$$?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if (!phoneRegex.test(field.value)) {
          isValid = false
          errorMessage = "Please enter a valid phone number"
        }
      }

      // Zip code validation
      if (validationType === "zipcode" && field.value.trim()) {
        const zipRegex = /^\d{5}(-\d{4})?$/
        if (!zipRegex.test(field.value)) {
          isValid = false
          errorMessage = "Please enter a valid ZIP code"
        }
      }

      // Password validation
      if (validationType === "password" && field.value.trim()) {
        if (field.value.length < 8) {
          isValid = false
          errorMessage = "Password must be at least 8 characters"
        }
      }

      // Password confirmation validation
      if (validationType === "password-confirm" && field.value.trim()) {
        const passwordField = document.getElementById(field.dataset.matchPassword)
        if (passwordField && field.value !== passwordField.value) {
          isValid = false
          errorMessage = "Passwords do not match"
        }
      }

      // Custom validation
      if (validationType === "custom" && field.dataset.customValidation) {
        try {
          const customValidationFn = new Function("value", field.dataset.customValidation)
          const customResult = customValidationFn(field.value)

          if (customResult !== true) {
            isValid = false
            errorMessage = typeof customResult === "string" ? customResult : "Invalid input"
          }
        } catch (error) {
          console.error("Custom validation error:", error)
        }
      }

      // Show error if invalid
      if (!isValid) {
        field.classList.add("border-red-500", "focus:ring-red-500")

        if (errorElement) {
          errorElement.textContent = errorMessage
          errorElement.style.display = "block"
        }
      }

      return isValid
    }
  })
})

