'use client'

interface CareerTitleProps {
  title: string
}

export function CareerTitle({ title }: CareerTitleProps) {
  return (
    <div id="career-title" className="w-fit">
      <h2 className="game-text text-white">
        {title}
      </h2>
    </div>
  )
} 