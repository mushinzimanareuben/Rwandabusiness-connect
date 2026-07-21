import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { ROLES } from '@/config/constants'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import toast from 'react-hot-toast'

export const RegisterPage = () => {
  const { t } = useTranslation()
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      role: ROLES.VISITOR
    }
  })

  const password = watch('password')

  const onSubmit = async (data) => {
    setIsLoading(true)
    setAuthError('')
    try {
      await registerUser(data.email, data.password, data.fullName, data.role)
      toast.success('Account created successfully!')
      // Redirect to correct dashboard based on role
      if (data.role === ROLES.BUSINESS_OWNER) {
        navigate('/dashboard/owner')
      } else {
        navigate('/dashboard/visitor')
      }
    } catch (e) {
      console.error('Registration error:', e)
      let message = e.message || 'Registration failed.'
      if (message.includes('auth/email-already-in-use')) {
        message = 'This email is already registered. Please sign in instead.'
      } else if (message.includes('auth/operation-not-allowed')) {
        message = 'Email/password sign up is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method.'
      } else if (message.includes('auth/weak-password')) {
        message = 'Password is too weak. Use at least 6 characters.'
      } else if (message.includes('auth/invalid-email')) {
        message = 'Invalid email address.'
      }
      setAuthError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const roleOptions = [
    { value: ROLES.VISITOR, label: t('auth.visitor') },
    { value: ROLES.BUSINESS_OWNER, label: t('auth.businessOwner') },
  ]

  const bullets = [
    'Free to list your first business with basic info',
    'Get a blue verified checkmark to establish trust',
    'Access traffic analytics and direct WhatsApp leads'
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
            Join RBC Today!
          </h2>
          <p className="text-gray-300 text-lg mb-8 font-medium">
            List your business, reach thousands of customers across Rwanda&apos;s 30 districts, and grow your revenue.
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
            Join thousands of small and large businesses connected across Rwanda.
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
              {t('auth.register')}
            </h2>
            <p className="text-sm font-semibold text-gray-400 dark:text-gray-505 mt-1">
              Join the Rwanda Business network today
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={t('auth.fullName')}
              placeholder="John Doe"
              error={errors.fullName}
              {...register('fullName', { required: 'Full name is required' })}
            />

            <Input
              label={t('auth.email')}
              type="email"
              placeholder="john@example.com"
              error={errors.email}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <Select
              label={t('auth.role')}
              options={roleOptions}
              error={errors.role}
              {...register('role', { required: 'Role is required' })}
            />

            <Input
              label={t('auth.password')}
              type="password"
              placeholder="Minimum 6 characters"
              error={errors.password}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <Input
              label={t('auth.confirmPassword')}
              type="password"
              placeholder="Re-enter password"
              error={errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === password || 'Passwords do not match',
              })}
            />

            <Button type="submit" className="w-full mt-2 py-3 animate-pulse-slow" isLoading={isLoading}>
              {t('auth.register')}
            </Button>
          </form>

          {/* Switch to Login */}
          <p className="text-center text-sm text-gray-400 dark:text-gray-505 mt-6 font-semibold">
            {t('auth.hasAccount')}{' '}
            <Link
              to="/login"
              className="font-bold text-primary-605 hover:text-primary-705 dark:text-primary-400 transition-colors hover:underline"
            >
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
