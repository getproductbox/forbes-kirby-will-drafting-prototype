'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import Navigation from '@/components/Navigation'
import { mockClients, mockStats, mockAppointments } from '@/lib/data/mockData'
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Download,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') return null

  const statusColors = {
    new: 'bg-gray-100 text-gray-700',
    onboarding: 'bg-blue-100 text-blue-700',
    meeting_scheduled: 'bg-purple-100 text-purple-700',
    drafting: 'bg-yellow-100 text-yellow-700',
    review: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700'
  }

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'scheduled')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            System overview and client management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
              <span className="flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalClients}</h3>
            <p className="text-sm text-gray-600">Total Clients</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-primary" />
              <span className="flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.activeClients}</h3>
            <p className="text-sm text-gray-600">Active Cases</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-primary" />
              <span className="flex items-center text-sm text-red-600">
                <ArrowDown className="w-4 h-4 mr-1" />
                65%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.averageCompletionTime}</h3>
            <p className="text-sm text-gray-600">Avg Completion Time</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <span className="flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.clientSatisfaction}/5</h3>
            <p className="text-sm text-gray-600">Client Satisfaction</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Clients Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm" id="clients">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Clients</h2>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Client</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Activity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{client.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize',
                            statusColors[client.status]
                          )}>
                            {client.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${client.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{client.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.assignedTo || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(client.lastActivity).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm p-6" id="appointments">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => {
                  const client = mockClients.find(c => c.id === appointment.clientId)
                  return (
                    <div key={appointment.id} className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium text-gray-900">
                        {client?.firstName} {client?.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {appointment.type.replace('_', ' ')}
                      </p>
                    </div>
                  )
                })}
                <button className="w-full text-center text-sm text-primary hover:text-primary-dark font-medium">
                  View All Appointments
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6" id="reports">
              <h2 className="text-xl font-semibold mb-4">This Month</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Clients</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed Wills</span>
                  <span className="font-semibold">{mockStats.completedThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Documents Processed</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-semibold">£24,580</span>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}