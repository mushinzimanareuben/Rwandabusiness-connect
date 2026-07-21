import React from 'react'

export const Select = React.forwardRef(({
  label,
  options = [], // [{ value: '...', label: '...' }]
  error,
  className = '',
  id,
  placeholder = 'Select option...',
  ...props
}, ref) => {
  const generatedId = React.useId()
  const selectId = id || generatedId

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`
          w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-dark-400'}
        `}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs font-semibold text-red-500 mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  )
})

Select.displayName = 'Select'
