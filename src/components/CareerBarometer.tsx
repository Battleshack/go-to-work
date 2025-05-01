'use client'

interface CareerBarometerProps {
  level: number
}

export function CareerBarometer({ level }: CareerBarometerProps) {
  const totalLevels = 15
  const bars = Array.from({ length: totalLevels }, (_, i) => totalLevels - i)

  return (
    <div className="p-2">
      <div id="career-barometer">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-[1rem] border-8 border-game-primary pointer-events-none" />
          <div className="w-full h-full flex flex-col gap-1">
            {bars.map((barLevel) => (
              <div
                key={barLevel}
                className={`barometer-cell ${barLevel <= level ? 'barometer-cell-filled' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 