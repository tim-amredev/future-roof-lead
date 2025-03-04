"use client"

import type { UseFormRegister } from "react-hook-form"
import { Check } from "lucide-react"

interface MultiSelectOptionsProps {
  options: string[]
  name: string
  register: UseFormRegister<any>
}

export default function MultiSelectOptions({ options, name, register }: MultiSelectOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options.map((option) => (
        <label
          key={option}
          className="group relative flex items-center card-future p-4 rounded-xl cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
        >
          <input type="checkbox" value={option} {...register(name)} className="peer sr-only" />
          <div className="w-6 h-6 mr-3 rounded border border-white/10 flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary">
            <Check className="w-4 h-4 text-background opacity-0 transition-opacity peer-checked:opacity-100" />
          </div>
          <span className="text-foreground/80 group-hover:text-foreground transition-colors">{option}</span>
        </label>
      ))}
    </div>
  )
}

