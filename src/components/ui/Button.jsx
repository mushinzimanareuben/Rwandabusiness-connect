import React from 'react'

export const Button = React.forwardRef(({
  children,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon,
  type = 'button',
  ...props
}, ref) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-glow-primary',
    secondary: 'bg-white dark:bg-dark-600 hover:bg-gray-50 dark:hover:bg-dark-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-dark-400 shadow-sm',
    gold: 'bg-gold-500 hover:bg-gold-600 text-white shadow-md hover:shadow-glow-gold',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-800 dark:text-gray-200',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  return (
    <button
      ref={ref}
      type={type}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
