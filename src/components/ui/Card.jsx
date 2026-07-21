import React from 'react'

export const Card = React.forwardRef(({
  children,
  className = '',
  hover = false,
  glass = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        rounded-2xl border border-gray-100 dark:border-dark-400 bg-white dark:bg-dark-900/40 p-6 shadow-sm
        ${hover ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1' : ''}
        ${glass ? 'backdrop-blur-xl bg-white/70 dark:bg-dark-900/40 border-white/20 dark:border-white/5' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'
