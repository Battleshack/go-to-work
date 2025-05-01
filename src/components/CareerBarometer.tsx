'use client'

import { Z_INDEX } from '../constants/zIndex'

interface CareerBarometerProps {
  level: number
}

export function CareerBarometer({ level }: CareerBarometerProps) {
  const totalLevels = 15
  const bars = Array.from({ length: totalLevels }, (_, i) => totalLevels - i)

  return (
    <div className="h-full p-2" style={{ position: 'relative', zIndex: Z_INDEX.BAROMETER }}>
      <div id="career-barometer" className="h-full relative">
        <div className="barometer-border" />
        <div className="barometer-cell-container">
          {bars.map((barLevel) => (
            <div
              key={barLevel}
              className={`barometer-cell ${barLevel <= level ? 'barometer-cell-filled' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 