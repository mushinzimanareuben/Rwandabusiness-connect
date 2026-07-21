import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllBusinesses, updateBusiness } from '@/services/businessService'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FiCheck, FiX, FiAward, FiCheckCircle, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'

// Mock fallbacks
const mockAdminList = [
  { id: 'demo-1', name: 'Kigali Heights Pharmacy', category: 'pharmacies', city: 'Kigali', status: 'approved', verified: true, featured: false },
  { id: 'demo-2', name: 'Virunga Inn Resort & Spa', category: 'hotels', city: 'Musanze', status: 'pending', verified: false, featured: true },
  { id: 'demo-3', name: 'Heaven Restaurant Kigali', category: 'restaurants', city: 'Kigali', status: 'approved', verified: true, featured: true },
  { id: 'demo-4', name: 'Huye Coffee Roasters', category: 'agriculture', city: 'Huye', status: 'rejected', verified: false, featured: false },
]

export const ManageBusinessesPage = () => {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getAllBusinesses()
      setBusinesses(data.length > 0 ? data : mockAdminList)
    } catch (e) {
      console.warn('Firebase query failed', e)
      setBusinesses(mockAdminList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleAction = async (id, field, value) => {
    try {
      if (id && !id.startsWith('demo-')) {
        await updateBusiness(id, { [field]: value })
      }
      // Optimistic update locally
      setBusinesses(
        businesses.map((b) => (b.id === id ? { ...b, [field]: value } : b))
      )
      toast.success('Listing updated successfully!')
    } catch (e) {
      console.error(e)
      toast.error('Failed to update status.')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Manage Businesses
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Approve listing submissions, award blue verification checks, or flag spam.
          </p>
        </div>
        <Link to="/dashboard/admin/businesses/add">
          <Button className="flex items-center gap-2 shadow-md shadow-primary-500/20">
            <FiPlus />
            <span>Add Business</span>
          </Button>
        </Link>
      </div>

      <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-800 border-b border-gray-100 dark:border-dark-700 text-xs font-bold uppercase tracking-wider text-gray-450">
                <th className="p-4 pl-6">Business Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Features</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-800 text-sm font-semibold text-gray-700 dark:text-gray-250">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">Loading listings...</td>
                </tr>
              ) : (
                businesses.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-800/20">
                    <td className="p-4 pl-6">
                      <span className="font-bold text-gray-900 dark:text-gray-100">{b.name}</span>
                    </td>
                    <td className="p-4 capitalize">{b.category}</td>
                    <td className="p-4">{b.city}</td>
                    <td className="p-4">
                      <Badge variant={b.status === 'approved' ? 'success' : b.status === 'rejected' ? 'danger' : 'gold'}>
                        {b.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {b.verified && (
                          <Badge variant="primary" className="flex items-center gap-0.5">
                            <FiCheckCircle size={10} /> Verified
                          </Badge>
                        )}
                        {b.featured && (
                          <Badge variant="gold" className="flex items-center gap-0.5">
                            <FiAward size={10} /> Featured
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      {/* Approve / Reject */}
                      {b.status !== 'approved' && (
                        <button
                          onClick={() => handleAction(b.id, 'status', 'approved')}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-650 dark:bg-emerald-950/20 dark:text-emerald-400"
                          title="Approve Listing"
                        >
                          <FiCheck size={16} />
                        </button>
                      )}
                      {b.status !== 'rejected' && (
                        <button
                          onClick={() => handleAction(b.id, 'status', 'rejected')}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 dark:bg-red-950/20 dark:text-red-400"
                          title="Reject Listing"
                        >
                          <FiX size={16} />
                        </button>
                      )}
                      {/* Toggles */}
                      <button
                        onClick={() => handleAction(b.id, 'verified', !b.verified)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          b.verified ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-200 text-gray-400 dark:border-dark-400'
                        }`}
                        title="Toggle Verification Check"
                      >
                        <FiCheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleAction(b.id, 'featured', !b.featured)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          b.featured ? 'bg-gold-555 border-gold-555 text-white' : 'border-gray-200 text-gray-400 dark:border-dark-400'
                        }`}
                        title="Toggle Featured Spot"
                      >
                        <FiAward size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
