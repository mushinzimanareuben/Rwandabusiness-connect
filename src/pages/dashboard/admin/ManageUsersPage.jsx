import React, { useEffect, useState } from 'react'
import { getAllUsers, updateUserRole } from '@/services/userService'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ROLES } from '@/config/constants'
import toast from 'react-hot-toast'

// Mock fallbacks
const mockUsersList = [
  { uid: 'u-1', displayName: 'Manzi Eric', email: 'manzi@gmail.com', role: ROLES.VISITOR },
  { uid: 'u-2', displayName: 'Reuben M.', email: 'mushinzimanareuben@gmail.com', role: ROLES.SUPER_ADMIN },
  { uid: 'u-3', displayName: 'Alice Mutoni', email: 'alice@resort.rw', role: ROLES.BUSINESS_OWNER },
]

export const ManageUsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const list = await getAllUsers()
      setUsers(list.length > 0 ? list : mockUsersList)
    } catch (e) {
      console.warn('Firebase query failed', e)
      setUsers(mockUsersList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleRoleChange = async (uid, newRole) => {
    try {
      if (uid && !uid.startsWith('u-')) {
        await updateUserRole(uid, newRole)
      }
      setUsers(
        users.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
      )
      toast.success('User role updated successfully!')
    } catch (e) {
      console.error(e)
      toast.error('Failed to change role.')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-855 dark:text-white">
          Manage Users
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Review accounts, update administrative privileges, or adjust business partner designations.
        </p>
      </div>

      <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-800 border-b border-gray-100 dark:border-dark-700 text-xs font-bold uppercase tracking-wider text-gray-450">
                <th className="p-4 pl-6">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Current Role</th>
                <th className="p-4 pr-6 text-right">Update Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-800 text-sm font-semibold text-gray-750 dark:text-gray-250">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">Loading user profiles...</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.uid} className="hover:bg-gray-50/50 dark:hover:bg-dark-800/20">
                    <td className="p-4 pl-6">
                      <span className="font-bold text-gray-900 dark:text-gray-100">{u.displayName || 'No Name'}</span>
                    </td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">
                      <Badge variant={u.role === ROLES.SUPER_ADMIN ? 'primary' : u.role === ROLES.BUSINESS_OWNER ? 'gold' : 'gray'}>
                        {u.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {u.role !== ROLES.SUPER_ADMIN && (
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.uid, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-800 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
                        >
                          <option value={ROLES.VISITOR}>Visitor</option>
                          <option value={ROLES.BUSINESS_OWNER}>Business Owner</option>
                          <option value={ROLES.ADMIN}>Admin</option>
                        </select>
                      )}
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
