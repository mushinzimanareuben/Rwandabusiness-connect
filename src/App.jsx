import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAppStore } from '@/store/useAppStore'
import { ROLES } from '@/config/constants'

// Public Pages
import { LandingPage } from '@/pages/public/LandingPage'
import { BusinessListPage } from '@/pages/public/BusinessListPage'
import { BusinessDetailPage } from '@/pages/public/BusinessDetailPage'
import { CategoriesPage } from '@/pages/public/CategoriesPage'
import { CitiesPage } from '@/pages/public/CitiesPage'
import { PricingPage } from '@/pages/public/PricingPage'
import { ContactPage } from '@/pages/public/ContactPage'

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'

// Visitor Dashboard
import { VisitorDashboard } from '@/pages/dashboard/visitor/VisitorDashboard'

// Owner Dashboard
import { OwnerDashboard } from '@/pages/dashboard/owner/OwnerDashboard'
import { MyBusinessesPage } from '@/pages/dashboard/owner/MyBusinessesPage'
import { AddBusinessPage } from '@/pages/dashboard/owner/AddBusinessPage'
import { EditBusinessPage } from '@/pages/dashboard/owner/EditBusinessPage'
import { AnalyticsPage } from '@/pages/dashboard/owner/AnalyticsPage'
import { SubscriptionPage } from '@/pages/dashboard/owner/SubscriptionPage'

// Admin Dashboard
import { AdminDashboard } from '@/pages/dashboard/admin/AdminDashboard'
import { ManageBusinessesPage } from '@/pages/dashboard/admin/ManageBusinessesPage'
import { AdminAddBusinessPage } from '@/pages/dashboard/admin/AdminAddBusinessPage'
import { ManageUsersPage } from '@/pages/dashboard/admin/ManageUsersPage'
import { RevenuePage } from '@/pages/dashboard/admin/RevenuePage'
import { ReportsPage } from '@/pages/dashboard/admin/ReportsPage'

// Toaster notifications
import { Toaster } from 'react-hot-toast'

export default function App() {
  const isDarkMode = useAppStore((s) => s.isDarkMode)
  const initTheme = useAppStore((s) => s.initTheme)

  React.useEffect(() => {
    initTheme(isDarkMode)
  }, [isDarkMode, initTheme])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/businesses" element={<BusinessListPage />} />
          <Route path="/businesses/:id" element={<BusinessDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Visitor Dashboard Routes */}
          <Route
            path="/dashboard/visitor"
            element={
              <ProtectedRoute allowedRoles={[ROLES.VISITOR]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VisitorDashboard />} />
            <Route path="bookmarks" element={<VisitorDashboard />} />
          </Route>

          {/* Business Owner Dashboard Routes */}
          <Route
            path="/dashboard/owner"
            element={
              <ProtectedRoute allowedRoles={[ROLES.BUSINESS_OWNER]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<OwnerDashboard />} />
            <Route path="businesses" element={<MyBusinessesPage />} />
            <Route path="add" element={<AddBusinessPage />} />
            <Route path="edit/:id" element={<EditBusinessPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
          </Route>

          {/* Administrator / Super Admin Dashboard Routes */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="businesses" element={<ManageBusinessesPage />} />
            <Route path="businesses/add" element={<AdminAddBusinessPage />} />
            <Route path="users" element={<ManageUsersPage />} />
            <Route path="revenue" element={<RevenuePage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      
      {/* Global Notifications Handler */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-dark-900 dark:text-gray-100 dark:border dark:border-dark-400 font-semibold',
          duration: 3500,
        }}
      />
    </AuthProvider>
  )
}
