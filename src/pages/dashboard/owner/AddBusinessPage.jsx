import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createBusiness } from '@/services/businessService'
import { useAuth } from '@/contexts/AuthContext'
import { BusinessForm } from '@/components/business/BusinessForm'
import toast from 'react-hot-toast'

export const AddBusinessPage = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleAddSubmit = async (data) => {
    try {
      await createBusiness(data, currentUser.uid)
      toast.success('Business submitted successfully! Pending approval.')
      navigate('/dashboard/owner/businesses')
    } catch (e) {
      console.error(e)
      toast.error('Failed to create business listing.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-805 dark:text-white">
          Add New Business
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Provide your business coordinates, contact details, opening hours, and photos.
        </p>
      </div>

      <BusinessForm onSubmit={handleAddSubmit} submitLabel="Submit Listing" />
    </div>
  )
}
