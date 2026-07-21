import React from 'react'

export const Badge = ({
  children,
  variant = 'gray', // 'gray' | 'primary' | 'gold' | 'blue' | 'purple' | 'danger' | 'success'
  className = '',
}) => {
  const styles = {
    gray: 'bg-gray-100 text-gray-700 dark:bg-dark-500 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    gold: 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',
    blue: 'bg-rwBlue-100 text-rwBlue-700 dark:bg-rwBlue-900/30 dark:text-rwBlue-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
