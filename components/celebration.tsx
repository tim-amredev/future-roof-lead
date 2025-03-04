"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

interface CelebrationProps {
  trigger: boolean
}

export default function Celebration({ trigger }: CelebrationProps) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [trigger])

  return null
}

