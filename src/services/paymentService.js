// Payment Service — MTN MoMo + Airtel Money
// Currently in STUB mode — wire real API keys to activate

export const PAYMENT_PROVIDERS = {
  MTN: 'mtn_momo',
  AIRTEL: 'airtel_money',
}

/**
 * Initiate MTN MoMo payment (STUB)
 * In production: call MTN MoMo Collections API
 */
export const initiateMTNPayment = async ({ phone, amount, planId, userId }) => {
  console.log('[MTN MoMo] Initiating payment:', { phone, amount, planId, userId })
  // TODO: Replace with real MTN MoMo API call
  // POST https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay
  await new Promise((r) => setTimeout(r, 2000)) // Simulate network
  return { referenceId: `MTN-${Date.now()}`, status: 'PENDING' }
}

/**
 * Check MTN payment status (STUB)
 */
export const checkMTNPaymentStatus = async (referenceId) => {
  console.log('[MTN MoMo] Checking status:', referenceId)
  await new Promise((r) => setTimeout(r, 1500))
  return { status: 'SUCCESSFUL', referenceId }
}

/**
 * Initiate Airtel Money payment (STUB)
 */
export const initiateAirtelPayment = async ({ phone, amount, planId, userId }) => {
  console.log('[Airtel Money] Initiating payment:', { phone, amount, planId, userId })
  await new Promise((r) => setTimeout(r, 2000))
  return { transactionId: `AIRTEL-${Date.now()}`, status: 'PENDING' }
}

/**
 * Check Airtel payment status (STUB)
 */
export const checkAirtelPaymentStatus = async (transactionId) => {
  console.log('[Airtel Money] Checking status:', transactionId)
  await new Promise((r) => setTimeout(r, 1500))
  return { status: 'SUCCESSFUL', transactionId }
}

/**
 * Save payment record to Firestore
 */
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/config/firebase'

export const savePaymentRecord = async ({ userId, planId, amount, provider, referenceId, status }) => {
  const ref = await addDoc(collection(db, 'payments'), {
    userId, planId, amount, provider, referenceId, status,
    createdAt: serverTimestamp(),
  })
  return ref.id
}
