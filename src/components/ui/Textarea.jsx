import React from 'react'

export const Textarea = React.forwardRef(({
  label,
  error,
  className = '',
  id,
  rows = 4,
  ...props
}, ref) => {
  const generatedId = React.useId()
  const textareaId = id || generatedId

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-dark-400'}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs font-semibold text-red-500 mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'
