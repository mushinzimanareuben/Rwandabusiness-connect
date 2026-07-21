import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FiAlertCircle, FiXCircle, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

const initialReports = [
  { id: 'rep-1', businessName: 'Virunga Inn Resort', reason: 'Incorrect hours of operation listed', reporter: 'Jean Paul', date: 'Jul 08, 2026', status: 'pending' },
  { id: 'rep-2', businessName: 'Huye Coffee Roasters', reason: 'Phone line is inactive', reporter: 'Grace U.', date: 'Jul 06, 2026', status: 'pending' },
  { id: 'rep-3', businessName: 'Kigali Tech Hub', reason: 'Duplicate listing detected in same district', reporter: 'Admin Review', date: 'Jul 05, 2026', status: 'pending' },
  { id: 'rep-4', businessName: 'MTN Center Nyarugenge', reason: 'Business has permanently closed', reporter: 'Patrick N.', date: 'Jul 04, 2026', status: 'resolved' },
  { id: 'rep-5', businessName: 'Remera Beauty Salon', reason: 'Contact number belongs to different business', reporter: 'Diane K.', date: 'Jul 03, 2026', status: 'pending' }
]

export const ReportsPage = () => {
  const [reports, setReports] = useState(initialReports)
  const [filter, setFilter] = useState('all') // 'all' | 'pending' | 'resolved'

  const handleResolve = (id) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r))
    toast.success('Complaint marked as resolved.')
  }

  const handleDisable = (id) => {
    setReports(reports.filter(r => r.id !== id))
    toast.success('Business listing has been disabled.')
  }

  const filteredReports = reports.filter(r => {
    if (filter === 'all') return true
    return r.status === filter
  })

  const pendingCount = reports.filter(r => r.status === 'pending').length
  const resolvedCount = reports.filter(r => r.status === 'resolved').length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-855 dark:text-white">
          Complaint Reports
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Review complaints filed by platform visitors regarding outdated business data or spam.
        </p>
      </div>

      {/* Stats recap row */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="text-center p-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 shadow-sm">
          <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">{reports.length}</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">Total Filed</p>
        </Card>
        <Card className="text-center p-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 shadow-sm">
          <h3 className="text-2xl font-black text-red-500">{pendingCount}</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">Pending Action</p>
        </Card>
        <Card className="text-center p-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 shadow-sm">
          <h3 className="text-2xl font-black text-emerald-500">{resolvedCount}</h3>
          <p className="text-xs font-semibold text-gray-400 mt-1">Resolved</p>
        </Card>
      </div>

      {/* Tabs bar */}
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-dark-700 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/20'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            filter === 'pending'
              ? 'bg-red-500 text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            filter === 'resolved'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
          }`}
        >
          Resolved ({resolvedCount})
        </button>
      </div>

      {/* Reports feed */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <p className="text-sm font-semibold italic text-gray-450 dark:text-gray-500 text-center py-12">
            No complaints found matching this filter.
          </p>
        ) : (
          filteredReports.map((rep) => (
            <Card
              key={rep.id}
              className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${rep.status === 'resolved' ? 'bg-emerald-100 text-emerald-650 dark:bg-emerald-950/20' : 'bg-red-100 text-red-650 dark:bg-red-950/20'}`}>
                  <FiAlertCircle size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-gray-805 dark:text-gray-100">{rep.businessName}</h3>
                    <Badge variant={rep.status === 'resolved' ? 'success' : 'danger'}>
                      {rep.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-gray-400 mt-1">
                    Reported by: <span className="text-gray-600 dark:text-gray-300">{rep.reporter}</span> • <span className="text-xs text-gray-405">{rep.date}</span>
                  </p>
                  <p className="text-sm text-red-500 font-semibold mt-2.5 bg-red-50/50 dark:bg-red-950/10 px-3 py-2 rounded-lg border border-red-100/55 dark:border-red-900/10">
                    {rep.reason}
                  </p>
                </div>
              </div>

              {rep.status === 'pending' && (
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleResolve(rep.id)}
                    className="text-xs flex items-center gap-1 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600"
                  >
                    <FiCheckCircle /> Mark Resolved
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDisable(rep.id)}
                    className="text-xs flex items-center gap-1"
                  >
                    <FiXCircle /> Disable Listing
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
