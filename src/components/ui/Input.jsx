import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export const Input = React.forwardRef(({
  label,
  rightLabel,
  error,
  type = 'text',
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = React.useId()
  const inputId = id || generatedId
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const currentType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || rightLabel) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
          )}
          {rightLabel}
        </div>
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          id={inputId}
          type={currentType}
          className={`
            w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200
            ${isPassword ? 'pr-11' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-dark-400'}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-250 transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs font-semibold text-red-500 mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'
