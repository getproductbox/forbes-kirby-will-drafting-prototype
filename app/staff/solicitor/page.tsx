'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import Navigation from '@/components/Navigation'
import { mockClients, mockWillDraft, mockAppointments } from '@/lib/data/mockData'
import { 
  Users, 
  Calendar, 
  FileText, 
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Edit,
  Eye,
  Send,
  Plus,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SolicitorDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  useEffect(() => {
    if (!user || user.role !== 'solicitor') {
      router.push('/')
    }
  }, [user, router])

  if (!user || user.role !== 'solicitor') return null

  const myClients = mockClients.filter(client => 
    client.assignedTo === user.name && client.status !== 'completed'
  )
  const todayAppointments = mockAppointments.filter(apt => 
    apt.solicitorId === user.id && apt.status === 'scheduled'
  )

  const statusColors = {
    new: 'bg-gray-100 text-gray-700',
    onboarding: 'bg-blue-100 text-blue-700',
    meeting_scheduled: 'bg-purple-100 text-purple-700',
    drafting: 'bg-yellow-100 text-yellow-700',
    review: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Solicitor Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your clients and review AI-generated drafts
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{myClients.length}</h3>
            <p className="text-sm text-gray-600">Active Clients</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{todayAppointments.length}</h3>
            <p className="text-sm text-gray-600">Today's Meetings</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">3</h3>
            <p className="text-sm text-gray-600">Pending Reviews</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2</h3>
            <p className="text-sm text-gray-600">AI Drafts Ready</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm" id="clients">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">My Clients</h2>
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {myClients.map((client) => (
                  <div 
                    key={client.id}
                    onClick={() => setSelectedClient(client.id)}
                    className={cn(
                      'p-4 cursor-pointer hover:bg-gray-50 transition-colors',
                      selectedClient === client.id && 'bg-blue-50 border-r-4 border-primary'
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {client.firstName} {client.lastName}
                      </h3>
                      <span className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full capitalize',
                        statusColors[client.status]
                      )}>
                        {client.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{client.email}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{client.progress}%</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(client.lastActivity).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Will Draft Review */}
            {selectedClient && (
              <div className="bg-white rounded-lg shadow-sm" id="drafts">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">Will Draft Review</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        AI-generated draft for {mockClients.find(c => c.id === selectedClient)?.firstName} {mockClients.find(c => c.id === selectedClient)?.lastName}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Preview</span>
                      </button>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center space-x-2">
                        <Edit className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* AI Suggestions */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Brain className="w-5 h-5 text-primary mr-2" />
                      AI Suggestions
                    </h3>
                    <div className="space-y-3">
                      {mockWillDraft.aiSuggestions?.map((suggestion) => (
                        <div key={suggestion.id} className={cn(
                          'p-4 rounded-lg border-l-4',
                          suggestion.severity === 'important' && 'bg-red-50 border-red-400',
                          suggestion.severity === 'warning' && 'bg-yellow-50 border-yellow-400',
                          suggestion.severity === 'info' && 'bg-blue-50 border-blue-400'
                        )}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                                Accept
                              </button>
                              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Draft Content Preview */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Draft Content</h3>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm">
                      <h4 className="font-medium mb-2">LAST WILL AND TESTAMENT</h4>
                      <p className="mb-2">
                        <strong>Testator:</strong> {mockWillDraft.content.testator.fullName}
                      </p>
                      <p className="mb-2">
                        <strong>Address:</strong> {mockWillDraft.content.testator.address}
                      </p>
                      <p className="mb-4">
                        <strong>Date of Birth:</strong> {new Date(mockWillDraft.content.testator.dateOfBirth).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        I, {mockWillDraft.content.testator.fullName}, hereby revoke all former wills and testamentary dispositions made by me and declare this to be my last will and testament...
                      </p>
                      <div className="mt-4 p-3 bg-white rounded border text-center text-gray-500">
                        [Complete document preview available in edit mode]
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve for Review</span>
                      </button>
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2">
                        <Edit className="w-4 h-4" />
                        <span>Request Changes</span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Message Client</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Today's Appointments */}
            <div className="bg-white rounded-lg shadow-sm" id="appointments">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Today's Appointments</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Meeting</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {todayAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => {
                      const client = mockClients.find(c => c.id === appointment.clientId)
                      return (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {client?.firstName} {client?.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">{appointment.notes}</p>
                            <p className="text-xs text-gray-500 capitalize">
                              {appointment.type.replace('_', ' ')} • {appointment.time}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                              Join
                            </button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No appointments scheduled for today</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}