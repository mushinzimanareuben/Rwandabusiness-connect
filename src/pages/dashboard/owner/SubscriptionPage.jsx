import React, { useState } from 'react'
import { PLANS } from '@/config/constants'
import { initiateMTNPayment, initiateAirtelPayment, checkMTNPaymentStatus, savePaymentRecord } from '@/services/paymentService'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { FiCheckCircle, FiPhone, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export const SubscriptionPage = () => {
  const { currentUser } = useAuth()
  const { language } = useTranslation()

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [payMethod, setPayMethod] = useState('') // 'mtn' | 'airtel'
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan)
    setPayMethod('mtn')
    setSuccess(false)
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()
    if (!phone) {
      toast.error('Please enter your phone number.')
      return
    }

    setIsLoading(true)
    try {
      let response
      if (payMethod === 'mtn') {
        response = await initiateMTNPayment({
          phone,
          amount: selectedPlan.price,
          planId: selectedPlan.id,
          userId: currentUser.uid,
        })
      } else {
        response = await initiateAirtelPayment({
          phone,
          amount: selectedPlan.price,
          planId: selectedPlan.id,
          userId: currentUser.uid,
        })
      }

      // Simulate polling status
      const check = await checkMTNPaymentStatus(response.referenceId || response.transactionId)
      
      // Save record to DB
      await savePaymentRecord({
        userId: currentUser.uid,
        planId: selectedPlan.id,
        amount: selectedPlan.price,
        provider: payMethod,
        referenceId: check.referenceId || check.transactionId,
        status: check.status,
      })

      setSuccess(true)
      toast.success('Payment completed successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Payment initiation failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-805 dark:text-white">
          Listing Subscription Plans
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Upgrade your listings to Standard or Premium to gain higher visibility, verify markers, and lead generations.
        </p>
      </div>

      {!selectedPlan ? (
        /* Plan Selector */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`
                flex flex-col justify-between p-6 rounded-3xl border bg-white dark:bg-dark-900 border-gray-150 dark:border-dark-400 transition-all duration-300 hover:shadow-lg
                ${plan.popular ? 'ring-2 ring-primary-500/20 border-primary-500' : ''}
              `}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {language === 'rw' ? plan.nameRw : plan.name}
                  </h3>
                  {plan.popular && <Badge variant="primary">Popular</Badge>}
                </div>
                
                <h4 className="text-2xl font-black text-gray-850 dark:text-gray-100">
                  {plan.price === 0 ? 'Free' : `${plan.price.toLocaleString()} RWF`}
                </h4>
                <p className="text-2xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
                  billed per {plan.period}
                </p>

                <div className="border-t border-gray-100 dark:border-dark-400 my-4" />

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="text-xs font-semibold text-gray-500 dark:text-gray-450 flex items-center gap-1.5">
                      <span className="text-primary-500">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {plan.price > 0 ? (
                <Button className="w-full py-2.5" onClick={() => handleSubscribeClick(plan)}>
                  Upgrade Listing
                </Button>
              ) : (
                <Button variant="secondary" className="w-full py-2.5" disabled>
                  Active Plan
                </Button>
              )}
            </Card>
          ))}
        </div>
      ) : (
        /* Checkout flow */
        <Card className="max-w-xl mx-auto bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-8">
          {success ? (
            <div className="text-center space-y-4">
              <span className="text-5xl block animate-bounce-slow">🎉</span>
              <h2 className="text-2xl font-extrabold text-gray-855 dark:text-white">Payment Successful!</h2>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Your business subscription has been upgraded to <span className="text-primary-600 font-bold uppercase">{selectedPlan.name}</span>.
              </p>
              <Button variant="secondary" onClick={() => setSelectedPlan(null)} className="mt-4">
                Back to Plans
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div className="pb-4 border-b border-gray-100 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Upgrade to {selectedPlan.name}
                </h3>
                <p className="text-xs font-semibold text-gray-400 mt-1">
                  Amount due: <span className="text-gray-800 dark:text-gray-200 font-bold">{selectedPlan.price.toLocaleString()} RWF</span>
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Select Mobile Money Provider
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setPayMethod('mtn')}
                    className={`
                      p-4 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95
                      ${payMethod === 'mtn' ? 'border-gold-500 bg-gold-500/10' : 'border-gray-200 dark:border-dark-400'}
                    `}
                  >
                    <span className="text-lg font-black text-gray-800 dark:text-gray-250">MTN MoMo</span>
                  </div>
                  <div
                    onClick={() => setPayMethod('airtel')}
                    className={`
                      p-4 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95
                      ${payMethod === 'airtel' ? 'border-red-500 bg-red-500/10' : 'border-gray-200 dark:border-dark-400'}
                    `}
                  >
                    <span className="text-lg font-black text-gray-800 dark:text-gray-250">Airtel Money</span>
                  </div>
                </div>
              </div>

              {/* Mobile Phone Input */}
              <Input
                label="Enter Phone Number for Push Prompt"
                type="tel"
                placeholder="e.g. 0788123456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!phone ? 'Phone is required for payment request' : ''}
              />

              {/* Push Warning Alert */}
              <div className="flex gap-2.5 p-4 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-150 dark:border-dark-400 text-xs font-semibold text-gray-500 leading-relaxed">
                <FiPhone className="text-primary-500 shrink-0" size={18} />
                <span>
                  After clicking &quot;Complete Payment&quot;, verify your phone screen and confirm with your Mobile Money PIN.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-dark-400 justify-end">
                <Button variant="secondary" onClick={() => setSelectedPlan(null)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  Complete Payment
                </Button>
              </div>
            </form>
          )}
        </Card>
      )}
    </div>
  )
}
