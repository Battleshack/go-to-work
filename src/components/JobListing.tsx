'use client'

interface JobListingProps {
  title: string
  description: string
  type: 'promotion' | 'lateral' | 'special' | 'training'
}

export function JobListing({ title, description, type }: JobListingProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'promotion':
        return 'game-card game-card-promotion'
      case 'lateral':
      case 'special':
      case 'training':
        return 'game-card game-card-action'
    }
  }

  return (
    <div className={`w-[17.5rem] h-[14rem] ${getTypeStyles()}`}>
      <div className="flex flex-col justify-center items-center h-full">
        <h3 className="game-text mb-2">
          {title}
        </h3>
        <p className="text-lg text-game-text text-center">
          {description}
        </p>
      </div>
    </div>
  )
} 