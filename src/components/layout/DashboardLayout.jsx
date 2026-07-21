import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiPlusSquare, FiBriefcase, FiTrendingUp, FiCreditCard, FiUsers,
  FiAlertCircle, FiSettings, FiMenu, FiX, FiLogOut, FiHome, FiAward, FiBell, FiCalendar
} from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { ROLES } from '@/config/constants'

export const DashboardLayout = () => {
  const { t, language } = useTranslation()
  const { userProfile, logout, isAdmin, isSuperAdmin, isBusinessOwner } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  // Define sidebar links based on user role
  const getSidebarLinks = () => {
    if (isAdmin || isSuperAdmin) {
      return [
        { path: '/dashboard/admin', label: 'Overview', labelRw: 'Ikibaho', icon: FiGrid },
        { path: '/dashboard/admin/businesses', label: 'Businesses', labelRw: 'Ubucuruzi', icon: FiBriefcase },
        { path: '/dashboard/admin/businesses/add', label: 'Add Business', labelRw: 'Ongeraho ubucuruzi', icon: FiPlusSquare },
        { path: '/dashboard/admin/users', label: 'Users', labelRw: 'Abakoresha', icon: FiUsers },
        { path: '/dashboard/admin/revenue', label: 'Revenue', labelRw: 'Ayinjiye', icon: FiCreditCard },
        { path: '/dashboard/admin/reports', label: 'Reports', labelRw: 'Impuruza', icon: FiAlertCircle },
      ]
    }

    if (isBusinessOwner) {
      return [
        { path: '/dashboard/owner', label: 'Overview', labelRw: 'Ikibaho', icon: FiGrid },
        { path: '/dashboard/owner/businesses', label: 'My Businesses', labelRw: 'Ubucuruzi bwanjye', icon: FiBriefcase },
        { path: '/dashboard/owner/add', label: 'Add Business', labelRw: 'Ongeraho ubucuruzi', icon: FiPlusSquare },
        { path: '/dashboard/owner/analytics', label: 'Analytics', labelRw: 'Isesengura', icon: FiTrendingUp },
        { path: '/dashboard/owner/subscription', label: 'Subscription', labelRw: 'Ubwunganire', icon: FiCreditCard },
      ]
    }

    // Default Visitor / Customer Dashboard
    return [
      { path: '/dashboard/visitor', label: 'Overview', labelRw: 'Ikibaho', icon: FiGrid },
      { path: '/dashboard/visitor/bookmarks', label: 'Bookmarks', labelRw: 'Ibibitswe', icon: FiAward },
    ]
  }

  const links = getSidebarLinks()

  const getRoleLabel = () => {
    if (isSuperAdmin) return 'Super Admin'
    if (isAdmin) return 'Admin'
    if (isBusinessOwner) return 'Partner Owner'
    return 'Visitor'
  }

  const getRoleColor = () => {
    if (isSuperAdmin || isAdmin) return 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
    if (isBusinessOwner) return 'bg-gold-50 text-gold-700 dark:bg-gold-950/20 dark:text-gold-400'
    return 'bg-gray-100 text-gray-600 dark:bg-dark-800 dark:text-gray-400'
  }

  // Get current date formatted for Rwanda local time
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex transition-colors h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 border-r border-gray-150 dark:border-dark-800 bg-white dark:bg-dark-900 p-4 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 md:static md:h-screen shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col gap-6">
          {/* Header/Logo */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-800">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-gradient-primary">RBC</span>
              <span className="text-xs font-bold text-gray-450 uppercase tracking-widest">Dashboard</span>
            </Link>
            <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800" onClick={() => setSidebarOpen(false)}>
              <FiX size={18} />
            </button>
          </div>

          {/* User Profile Summary */}
          <div className="flex flex-col gap-2 p-3 rounded-2xl bg-gray-50/50 dark:bg-dark-800/20 border border-gray-100 dark:border-dark-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-750 text-white flex items-center justify-center font-black shadow-sm shrink-0">
                {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black truncate text-gray-800 dark:text-gray-100 leading-tight">
                  {userProfile?.displayName || 'User'}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold truncate mt-0.5">
                  {userProfile?.email}
                </p>
              </div>
            </div>
            {/* User Role Badge */}
            <span className={`inline-block text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-lg text-center ${getRoleColor()}`}>
              {getRoleLabel()}
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800/40 hover:text-gray-800 dark:hover:text-gray-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="sidebar-active-pill" />}
                      <Icon size={16} />
                      <span>{language === 'rw' ? link.labelRw : link.label}</span>
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-1 pt-4 border-t border-gray-100 dark:border-dark-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800/40 hover:text-gray-800"
          >
            <FiHome size={16} />
            <span>{language === 'rw' ? 'Guhagarara' : 'Back to Website'}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-650 hover:bg-red-50 dark:hover:bg-red-950/10"
          >
            <FiLogOut size={16} />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex h-16 items-center justify-between px-6 border-b border-gray-150 dark:border-dark-800 bg-white dark:bg-dark-900 shrink-0">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl border border-gray-250 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800 md:hidden"
          >
            <FiMenu size={18} />
          </button>

          {/* Date Indicator (Hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            <FiCalendar size={14} />
            <span>{formattedDate}</span>
          </div>

          <span className="text-sm font-black text-gray-800 dark:text-gray-100 md:hidden">RBC Dashboard</span>

          {/* Actions: Notifications & Quick Access */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors relative">
              <FiBell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white dark:border-dark-900" />
            </button>
            <div className="w-px h-6 bg-gray-100 dark:bg-dark-800" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary-100 dark:bg-primary-950/30 text-primary-600 text-xs font-bold flex items-center justify-center">
                {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
