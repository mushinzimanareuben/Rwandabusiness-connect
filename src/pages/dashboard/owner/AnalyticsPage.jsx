import React from 'react'
import { Card } from '@/components/ui/Card'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts'
import { FiTrendingUp, FiEye, FiMousePointer, FiArrowUpRight } from 'react-icons/fi'

// Mock timeline chart dataset
const viewsTimeline = [
  { date: 'Jul 01', Views: 120, Clicks: 15 },
  { date: 'Jul 02', Views: 150, Clicks: 22 },
  { date: 'Jul 03', Views: 190, Clicks: 30 },
  { date: 'Jul 04', Views: 220, Clicks: 45 },
  { date: 'Jul 05', Views: 280, Clicks: 64 },
  { date: 'Jul 06', Views: 340, Clicks: 82 },
  { date: 'Jul 07', Views: 410, Clicks: 98 },
]

const categoryShares = [
  { name: 'Kigali Pharmacy', views: 800, clicks: 120 },
  { name: 'Virunga Inn', views: 1200, clicks: 230 },
]

export const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-805 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Perform depth reviews on traffic channels, listing click-through-rates, and customer conversion.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-400">Monthly Traffic Growth</span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-555 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-lg">
              <FiArrowUpRight /> +18.4%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-gray-855 dark:text-gray-100">1,420</h3>
            <p className="text-xs text-gray-450 mt-1 font-semibold">Total impressions across all listings</p>
          </div>
        </Card>

        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-400">Listing Click Through (CTR)</span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-555 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-lg">
              <FiArrowUpRight /> +2.1%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-gray-855 dark:text-gray-100">12.8%</h3>
            <p className="text-xs text-gray-450 mt-1 font-semibold">Conversion from views to click actions</p>
          </div>
        </Card>

        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-400">Total Leads Generated</span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-555 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-lg">
              <FiArrowUpRight /> +12.4%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-gray-855 dark:text-gray-100">182</h3>
            <p className="text-xs text-gray-450 mt-1 font-semibold">WhatsApp & call tap actions combined</p>
          </div>
        </Card>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Chart */}
        <Card className="lg:col-span-2 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400">
          <h3 className="text-lg font-bold text-gray-805 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-dark-400">
            Performance Over Time
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsTimeline}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#37415110" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="Views" stroke="#16a34a" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                <Area type="monotone" dataKey="Clicks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorClicks)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Listings bar comparison */}
        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400">
          <h3 className="text-lg font-bold text-gray-855 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-dark-400">
            Impressions by Listing
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryShares}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#37415110" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
