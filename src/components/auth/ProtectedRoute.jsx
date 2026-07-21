import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Spinner } from '@/components/ui/Spinner'
import { ROLES } from '@/config/constants'

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, userProfile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!currentUser) {
    // Save location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userProfile?.role)) {
    // Redirect based on current role
    if (userProfile?.role === ROLES.SUPER_ADMIN || userProfile?.role === ROLES.ADMIN) {
      return <Navigate to="/dashboard/admin" replace />
    } else if (userProfile?.role === ROLES.BUSINESS_OWNER) {
      return <Navigate to="/dashboard/owner" replace />
    } else {
      return <Navigate to="/dashboard/visitor" replace />
    }
  }

  return children
}
