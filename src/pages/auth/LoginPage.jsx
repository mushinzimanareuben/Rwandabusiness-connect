import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiMail, FiLock, FiAlertCircle, FiCheck } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ROLES } from '@/config/constants'
import toast from 'react-hot-toast'

export const LoginPage = () => {
  const { t } = useTranslation()
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const from = location.state?.from?.pathname || '/'

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setAuthError('')
    try {
      const { profile } = await login(data.email, data.password)
      toast.success(t('common.success'))
      
      let targetPath = from
      if (from === '/') {
        if (profile?.role === ROLES.SUPER_ADMIN || profile?.role === ROLES.ADMIN) {
          targetPath = '/dashboard/admin'
        } else if (profile?.role === ROLES.BUSINESS_OWNER) {
          targetPath = '/dashboard/owner'
        } else {
          targetPath = '/dashboard/visitor'
        }
      }
      navigate(targetPath, { replace: true })
    } catch (e) {
      console.error(e)
      setAuthError('Invalid email or password. Please try again.')
      toast.error('Authentication failed.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setAuthError('')
    try {
      const { profile } = await loginWithGoogle()
      toast.success(t('common.success'))
      
      let targetPath = from
      if (from === '/') {
        if (profile?.role === ROLES.SUPER_ADMIN || profile?.role === ROLES.ADMIN) {
          targetPath = '/dashboard/admin'
        } else if (profile?.role === ROLES.BUSINESS_OWNER) {
          targetPath = '/dashboard/owner'
        } else {
          targetPath = '/dashboard/visitor'
        }
      }
      navigate(targetPath, { replace: true })
    } catch (e) {
      console.error(e)
      setAuthError('Failed to sign in with Google.')
      toast.error('Google sign in failed.')
    } finally {
      setIsLoading(false)
    }
  }

  const bullets = [
    'Access your personal business dashboard',
    'Track monthly listing views & WhatsApp leads',
    'Manage listings, subscriptions & MoMo billing'
  ]

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-900 transition-colors">
      {/* Left panel (Decorative, Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden flex-col items-center justify-center p-12 text-white">
        {/* Floating glow orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full hero-glow animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full hero-glow-blue animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-md w-full">
          <Link to="/" className="text-5xl font-black text-gradient-primary block mb-8 tracking-tight">
            RBC
          </Link>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight leading-tight">
            Welcome Back!
          </h2>
          <p className="text-gray-300 text-lg mb-8 font-medium">
            Sign in to manage your Rwanda business directory listings and connect with customers.
          </p>

          <ul className="space-y-4 mb-12">
            {bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-gray-200 font-semibold text-sm">
                <span className="w-5 h-5 rounded-full bg-primary-600/35 border border-primary-500/50 flex items-center justify-center text-primary-400 text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-400 font-semibold">
            Trusted by 5,000+ businesses across Rwanda&apos;s 30 districts.
          </p>
        </div>
      </div>

      {/* Right panel (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile-only branding logo */}
          <div className="text-center lg:hidden mb-2">
            <Link to="/" className="inline-block text-4xl font-black text-gradient-primary tracking-tight">
              RBC
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
              {t('auth.login')}
            </h2>
            <p className="text-sm font-semibold text-gray-400 dark:text-gray-505 mt-1">
              Connect to Rwanda&apos;s digital marketplace
            </p>
          </div>

          {/* Form Error */}
          {authError && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-150 text-red-750 dark:text-red-400 text-sm">
              <FiAlertCircle size={18} className="shrink-0" />
              <span className="font-semibold">{authError}</span>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label={t('auth.email')}
              type="email"
              placeholder="Enter your email"
              error={errors.email}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <Input
              label={t('auth.password')}
              type="password"
              placeholder="Enter your password"
              error={errors.password}
              rightLabel={
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  {t('auth.forgotPassword')}
                </Link>
              }
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <Button type="submit" className="w-full py-3" isLoading={isLoading}>
              {t('auth.signIn')}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-dark-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-dark-900 px-3 text-gray-400 dark:text-gray-500 font-semibold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            variant="secondary"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-3"
            disabled={isLoading}
          >
            <FcGoogle size={18} />
            <span>{t('auth.googleLogin')}</span>
          </Button>

          {/* Switch to Register */}
          <p className="text-center text-sm text-gray-400 dark:text-gray-505 mt-8 font-semibold">
            {t('auth.noAccount')}{' '}
            <Link
              to="/register"
              className="font-bold text-primary-605 hover:text-primary-705 dark:text-primary-400 transition-colors hover:underline"
            >
              {t('auth.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
