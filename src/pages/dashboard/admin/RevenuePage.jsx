import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { FiDollarSign, FiSmartphone, FiCalendar, FiUsers, FiTrendingUp } from 'react-icons/fi'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

// Mock transactional records
const transactionLogs = [
  { id: 'TXN-101', plan: 'Premium', amount: 35000, provider: 'MTN MoMo', phone: '0788123456', date: 'Jul 08, 2026', status: 'SUCCESS' },
  { id: 'TXN-102', plan: 'Standard', amount: 15000, provider: 'Airtel Money', phone: '0733987654', date: 'Jul 07, 2026', status: 'SUCCESS' },
  { id: 'TXN-103', plan: 'Premium', amount: 35000, provider: 'MTN MoMo', phone: '0788444333', date: 'Jul 06, 2026', status: 'SUCCESS' },
  { id: 'TXN-104', plan: 'Standard', amount: 15000, provider: 'MTN MoMo', phone: '0788777123', date: 'Jul 04, 2026', status: 'SUCCESS' },
  { id: 'TXN-105', plan: 'Premium', amount: 35000, provider: 'Airtel Money', phone: '0733111222', date: 'Jul 02, 2026', status: 'SUCCESS' },
]

// Revenue breakdown (MTN vs Airtel)
const chartData = [
  { month: 'Feb', mtn: 120000, airtel: 30000 },
  { month: 'Mar', mtn: 180000, airtel: 40000 },
  { month: 'Apr', mtn: 240000, airtel: 70000 },
  { month: 'May', mtn: 200000, airtel: 90000 },
  { month: 'Jun', mtn: 350000, airtel: 100000 },
  { month: 'Jul', mtn: 500000, airtel: 120000 },
]

export const RevenuePage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-805 dark:text-white">
          Revenue Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Monitor subscriptions, transaction references, channel splits, and MoMo/Airtel cashflow.
        </p>
      </div>

      {/* KPI recap row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 shadow-sm">
          <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <FiDollarSign size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">620,000 RWF</h3>
            <p className="text-sm font-semibold text-gray-400">Total Cashflow</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 shadow-sm">
          <div className="p-3.5 rounded-2xl bg-gold-100 dark:bg-gold-950/30 text-gold-600 dark:text-gold-400">
            <FiSmartphone size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">MTN MoMo</h3>
            <p className="text-sm font-semibold text-gray-400">Top Channel</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 shadow-sm">
          <div className="p-3.5 rounded-2xl bg-rwBlue-100 dark:bg-rwBlue-950/30 text-rwBlue-600 dark:text-rwBlue-400">
            <FiCalendar size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">Premium</h3>
            <p className="text-sm font-semibold text-gray-400">Top Plan</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 shadow-sm">
          <div className="p-3.5 rounded-2xl bg-purple-100 dark:bg-purple-950/30 text-purple-650 dark:text-purple-400">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100">23 Subscriptions</h3>
            <p className="text-sm font-semibold text-gray-400">Active Licenses</p>
          </div>
        </Card>
      </div>

      {/* Recharts Area Chart */}
      <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-805 dark:text-gray-100 mb-6 pb-2 border-b border-gray-100 dark:border-dark-700">
          Monthly Revenue Breakdown (MTN MoMo vs Airtel Money)
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMtn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAirtel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#37415115" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #37415120' }} />
              <Area type="monotone" name="MTN MoMo" dataKey="mtn" stroke="#f59e0b" fillOpacity={1} fill="url(#colorMtn)" strokeWidth={2} />
              <Area type="monotone" name="Airtel Money" dataKey="airtel" stroke="#ef4444" fillOpacity={1} fill="url(#colorAirtel)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Transaction table */}
      <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 overflow-hidden p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-800 border-b border-gray-100 dark:border-dark-700 text-xs font-bold uppercase tracking-wider text-gray-450">
                <th className="p-4 pl-6">Txn Reference</th>
                <th className="p-4">Upgrade Plan</th>
                <th className="p-4">Paid Amount</th>
                <th className="p-4">Billing Channel</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Transaction Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-800 text-sm font-semibold text-gray-700 dark:text-gray-250">
              {transactionLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-800/20">
                  <td className="p-4 pl-6">
                    <span className="font-bold text-gray-900 dark:text-gray-100">{log.id}</span>
                  </td>
                  <td className="p-4">{log.plan}</td>
                  <td className="p-4 font-bold text-primary-650 dark:text-primary-400">
                    {log.amount.toLocaleString()} RWF
                  </td>
                  <td className="p-4">
                    <Badge variant={log.provider.includes('MTN') ? 'gold' : 'danger'}>
                      {log.provider}
                    </Badge>
                  </td>
                  <td className="p-4">{log.phone}</td>
                  <td className="p-4">
                    <Badge variant="success">
                      {log.status}
                    </Badge>
                  </td>
                  <td className="p-4 pr-6 text-right text-xs text-gray-400">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
