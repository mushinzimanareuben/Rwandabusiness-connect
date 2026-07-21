import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBusiness, updateBusiness } from '@/services/businessService'
import { BusinessForm } from '@/components/business/BusinessForm'
import { Spinner } from '@/components/ui/Spinner'
import toast from 'react-hot-toast'

export const EditBusinessPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBusiness(id)
        if (data) setBusiness(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleEditSubmit = async (data) => {
    try {
      await updateBusiness(id, data)
      toast.success('Listing updated successfully!')
      navigate('/dashboard/owner/businesses')
    } catch (e) {
      console.error(e)
      toast.error('Failed to update business listing.')
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!business) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-bold">Business listing not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-805 dark:text-white">
          Edit Business Listing
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Modify your listing data. Some modifications may trigger re-verification.
        </p>
      </div>

      <BusinessForm
        initialData={business}
        onSubmit={handleEditSubmit}
        submitLabel="Save Changes"
      />
    </div>
  )
}
