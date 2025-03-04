"use client"

import { useState } from "react"
import type { UseFormRegister } from "react-hook-form"

interface RangeSelectorProps {
  min: number
  max: number
  step: number
  name: string
  register: UseFormRegister<any>
  required?: boolean
  unit?: string
}

export default function RangeSelector({
  min,
  max,
  step,
  name,
  register,
  required = false,
  unit = "",
}: RangeSelectorProps) {
  const [value, setValue] = useState<number>(min)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
        {...register(name, { required })}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  )
}

