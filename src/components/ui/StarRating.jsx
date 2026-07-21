import React from 'react'
import { FiStar } from 'react-icons/fi'

export const StarRating = ({
  rating,
  maxRating = 5,
  size = 18,
  onRatingChange,
  interactive = false,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = React.useState(null)

  const handleMouseEnter = (index) => {
    if (interactive) setHoverRating(index)
  }

  const handleMouseLeave = () => {
    if (interactive) setHoverRating(null)
  }

  const handleClick = (index) => {
    if (interactive && onRatingChange) onRatingChange(index)
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1
        const isFilled = hoverRating !== null ? starValue <= hoverRating : starValue <= rating
        
        return (
          <button
            key={i}
            type="button"
            className={`${interactive ? 'cursor-pointer transition-transform hover:scale-110 active:scale-95' : 'cursor-default'}`}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            disabled={!interactive}
          >
            <FiStar
              size={size}
              className={isFilled ? 'star-filled' : 'star-empty'}
            />
          </button>
        )
      })}
    </div>
  )
}
