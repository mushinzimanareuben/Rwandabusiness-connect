import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { BusinessForm } from '@/components/business/BusinessForm'
import toast from 'react-hot-toast'
import { db } from '@/config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const AdminAddBusinessPage = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleAddSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'businesses'), {
        ...data,
        ownerId: currentUser.uid,
        status: 'approved',
        verified: true,
        featured: false,
        premium: false,
        views: 0,
        clicks: 0,
        whatsappClicks: 0,
        rating: 0,
        reviewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      toast.success('Business listing created and approved!')
      navigate('/dashboard/admin/businesses')
    } catch (e) {
      console.error('Create business error:', e)
      let message = e.message || 'Failed to create business listing.'
      if (message.includes('permission') || message.includes('Missing')) {
        message = 'Firestore permission denied. Please update your Firestore rules in the Firebase Console to allow authenticated users to create businesses.'
      }
      toast.error(message, { duration: 6000 })
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
          Add New Business
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Create a new business listing on behalf of a client. It will be auto-approved.
        </p>
      </div>

      <BusinessForm onSubmit={handleAddSubmit} submitLabel="Create & Approve Listing" />
    </div>
  )
}
