import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiGlobe, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { useAppStore } from '@/store/useAppStore'
import { useTranslation } from '@/hooks/useTranslation'
import { NAV_LINKS } from '@/config/constants'
import { Button } from '@/components/ui/Button'

export const Navbar = () => {
  const { t, language } = useTranslation()
  const { currentUser, logout, isAdmin, isBusinessOwner } = useAuth()
  const navigate = useNavigate()

  const { isDarkMode, toggleDarkMode, setLanguage } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setUserDropdownOpen(false)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'rw' : 'en')
  }

  const getDashboardPath = () => {
    if (isAdmin) return '/dashboard/admin'
    if (isBusinessOwner) return '/dashboard/owner'
    return '/dashboard/visitor'
  }

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'navbar-scrolled border-b border-gray-100/80 dark:border-dark-400/80 bg-white/98 dark:bg-dark-900/98 backdrop-blur-xl h-14'
          : 'border-b border-gray-100 dark:border-dark-400 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl h-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600 shadow-md">
              <span className="text-white font-black text-sm leading-none">RW</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black tracking-tight text-gradient-primary">RBC</span>
              <span className="hidden sm:block text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Business Connect
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {language === 'rw' ? link.labelRw : link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 hover:text-gray-800 dark:hover:text-gray-100 transition-all border border-transparent hover:border-gray-200 dark:hover:border-dark-400"
              title="Change Language"
            >
              <FiGlobe size={14} />
              {language === 'en' ? '🇷🇼 RW' : '🇺🇸 EN'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-dark-400"
              title="Toggle Theme"
            >
              {isDarkMode
                ? <FiSun size={16} className="text-gold-400" />
                : <FiMoon size={16} />
              }
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl border border-gray-200 dark:border-dark-400 hover:border-primary-400 dark:hover:border-primary-600 transition-all bg-white dark:bg-dark-800 shadow-sm"
                >
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.displayName} className="h-7 w-7 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-xs shadow-sm">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 max-w-[80px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  <FiChevronDown size={12} className={`text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 z-20 rounded-2xl border border-gray-100 dark:border-dark-400 bg-white dark:bg-dark-900 p-1.5 shadow-2xl dropdown-animate">
                      <div className="px-3 py-2.5 border-b border-gray-100 dark:border-dark-700 mb-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold truncate text-gray-800 dark:text-gray-100 mt-0.5">
                          {currentUser.displayName || currentUser.email}
                        </p>
                      </div>

                      <Link
                        to={getDashboardPath()}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-xl transition-all"
                      >
                        <FiUser size={15} />
                        {t('nav.dashboard')}
                      </Link>

                      <div className="h-px bg-gray-100 dark:bg-dark-700 my-1" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                      >
                        <FiLogOut size={15} />
                        {t('nav.logout')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="shadow-md shadow-primary-500/20">
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Controls ── */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-all"
            >
              <FiGlobe size={18} />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-all"
            >
              {isDarkMode ? <FiSun size={18} className="text-gold-400" /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-all"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-dark-400 bg-white/98 dark:bg-dark-900/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 rounded-xl transition-all"
            >
              {language === 'rw' ? link.labelRw : link.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 dark:border-dark-400 pt-4 mt-3 space-y-2">
            {currentUser ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-sm flex items-center justify-center">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{currentUser.displayName || 'User'}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                  </div>
                </div>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-xl transition-all"
                >
                  <FiUser size={16} />
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                >
                  <FiLogOut size={16} />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">{t('nav.login')}</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">{t('nav.register')}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
