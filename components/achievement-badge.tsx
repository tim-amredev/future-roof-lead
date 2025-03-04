import { Trophy } from "lucide-react"

interface AchievementBadgeProps {
  title: string
  description: string
  unlocked?: boolean
}

export default function AchievementBadge({ title, description, unlocked = false }: AchievementBadgeProps) {
  return (
    <div
      className={`
        card-future relative overflow-hidden transition-all duration-300
        ${unlocked ? "achievement-unlock" : "opacity-50"}
      `}
    >
      {/* Animated border effect for unlocked achievements */}
      {unlocked && (
        <div className="absolute inset-0 animate-border">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-xl" />
        </div>
      )}

      <div className="relative p-4 rounded-xl flex items-center gap-4 z-10">
        <div
          className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${unlocked ? "bg-primary/20" : "bg-white/5"}
        `}
        >
          <Trophy
            className={`
            w-6 h-6
            ${unlocked ? "text-primary" : "text-white/20"}
          `}
          />
        </div>
        <div>
          <h3
            className={`
            font-semibold
            ${unlocked ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent" : ""}
          `}
          >
            {title}
          </h3>
          <p className={unlocked ? "text-foreground/80" : "text-foreground/40"}>{description}</p>
        </div>
      </div>
    </div>
  )
}

