"use client"

import Image from "next/image"
import { useState } from "react"
import type { UseFormRegister } from "react-hook-form"

interface RoofTypeOption {
  value: string
  label: string
  image: string
}

interface RoofTypeSelectorProps {
  options: RoofTypeOption[]
  name: string
  register: UseFormRegister<any>
  required?: boolean
}

export default function RoofTypeSelector({ options, name, register, required = false }: RoofTypeSelectorProps) {
  const [selectedValue, setSelectedValue] = useState<string>("")

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
            card-future p-4 rounded-xl transition-all duration-300
            ${
              selectedValue === option.value
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
            }
          `}
          >
            <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
              <Image
                src={option.image || "/placeholder.svg"}
                alt={option.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay gradient */}
              <div
                className={`
                absolute inset-0 transition-opacity duration-300
                bg-gradient-to-t from-background/80 to-transparent
                ${selectedValue === option.value ? "opacity-50" : "opacity-0 group-hover:opacity-30"}
              `}
              />
            </div>
            <div
              className={`
              text-center font-medium transition-colors duration-300
              ${
                selectedValue === option.value
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
                  : "text-foreground/80"
              }
            `}
            >
              {option.label}
            </div>
          </div>
        </label>
      ))}
    </div>
  )
}

