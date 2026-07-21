import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import toast from 'react-hot-toast'

export const ForgotPasswordPage = () => {
  const { t } = useTranslation()
  const { resetPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    try {
      await resetPassword(data.email)
      setSuccessMsg('Check your inbox for password reset instructions!')
      toast.success('Password reset email sent!')
    } catch (e) {
      console.error(e)
      setErrorMsg(e.message || 'Failed to send password reset email.')
      toast.error('Failed to send reset request.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 px-4 py-12 transition-colors">
      <Card className="w-full max-w-md p-8 border border-gray-150 dark:border-dark-400 bg-white dark:bg-dark-900/60 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block text-3xl font-black text-gradient-primary mb-2">
            RBC
          </Link>
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
            {t('auth.resetPassword')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            We will email you a link to reset your password
          </p>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-150 text-red-700 dark:text-red-400 text-sm">
            <FiAlertCircle size={18} className="shrink-0" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {/* Success notification */}
        {successMsg && (
          <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 text-emerald-700 dark:text-emerald-400 text-sm">
            <FiCheckCircle size={18} className="shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            {t('auth.resetPassword')}
          </Button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          <Link
            to="/login"
            className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Back to Sign In
          </Link>
        </p>
      </Card>
    </div>
  )
}
