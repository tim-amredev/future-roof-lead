interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export default function ProgressRing({ progress, size = 120, strokeWidth = 8, className = "" }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative ${className}`}>
      <svg className="progress-ring -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-white/5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle with gradient */}
        <circle
          className="transition-all duration-500 ease-out"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(14, 165, 233)" /> {/* sky-500 */}
            <stop offset="50%" stopColor="rgb(59, 130, 246)" /> {/* blue-500 */}
            <stop offset="100%" stopColor="rgb(45, 212, 191)" /> {/* teal-400 */}
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
          {progress}%
        </span>
      </div>
    </div>
  )
}

