"use client"

import { type ReactNode, useState } from "react"
import type { UseFormRegister } from "react-hook-form"

interface ContactMethodOption {
  value: string
  label: string
  icon: ReactNode
}

interface ContactMethodSelectorProps {
  options: ContactMethodOption[]
  name: string
  register: UseFormRegister<any>
  required?: boolean
}

export default function ContactMethodSelector({
  options,
  name,
  register,
  required = false,
}: ContactMethodSelectorProps) {
  const [selectedValue, setSelectedValue] = useState<string>("")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            relative group cursor-pointer transition-all duration-300
            ${selectedValue === option.value ? "scale-105" : "hover:scale-105"}
          `}
        >
          <input
            type="radio"
            value={option.value}
            className="sr-only"
            {...register(name, { required })}
            onChange={() => setSelectedValue(option.value)}
          />
          <div
            className={`
            card-future p-6 rounded-xl transition-all duration-300 flex flex-col items-center gap-3
            ${
              selectedValue === option.value
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
            }
          `}
          >
            <div
              className={`
              w-12 h-12 rounded-lg flex items-center justify-center transition-colors
              ${selectedValue === option.value ? "bg-primary/20" : "bg-white/5"}
            `}
            >
              <div className={selectedValue === option.value ? "text-primary" : "text-foreground/60"}>
                {option.icon}
              </div>
            </div>
            <span
              className={`
              font-medium text-center transition-colors
              ${
                selectedValue === option.value
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
                  : "text-foreground/80"
              }
            `}
            >
              {option.label}
            </span>
          </div>
        </label>
      ))}
    </div>
  )
}

