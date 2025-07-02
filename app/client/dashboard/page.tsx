'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/lib/context/AuthContext'
import Navigation from '@/components/Navigation'
import WillDocumentPreview from '@/components/WillDocumentPreview'
import { mockClients, mockDocuments, mockWillDraft, mockTimeline, mockAppointments } from '@/lib/data/mockData'
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  MessageSquare,
  ChevronRight,
  Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ClientDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [showDocumentPreview, setShowDocumentPreview] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'client') {
      router.push('/')
    }
  }, [user, router])

  if (!user || user.role !== 'client') return null

  const client = mockClients[0] // Sarah Thompson
  const clientDocuments = mockDocuments.filter(doc => doc.clientId === client.id)
  const timeline = mockTimeline
  const nextAppointment = mockAppointments.find(apt => apt.clientId === client.id && apt.status === 'scheduled')

  const statusColors = {
    new: 'bg-gray-100 text-gray-700',
    onboarding: 'bg-blue-100 text-blue-700',
    meeting_scheduled: 'bg-purple-100 text-purple-700',
    drafting: 'bg-yellow-100 text-yellow-700',
    review: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700'
  }

  const documentStatusIcons = {
    verified: <CheckCircle className="w-4 h-4 text-green-600" />,
    approved: <CheckCircle className="w-4 h-4 text-green-600" />,
    pending: <AlertCircle className="w-4 h-4 text-yellow-600" />,
    rejected: <AlertCircle className="w-4 h-4 text-red-600" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {client.firstName}
          </h1>
          <p className="text-gray-600">
            Track your will drafting progress and manage your documents
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Progress</h2>
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium capitalize',
              statusColors[client.status]
            )}>
              {client.status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
              <div 
                style={{ width: `${client.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
              />
            </div>
            <p className="text-sm text-gray-600">
              {client.progress}% complete • Estimated completion in 2-3 days
            </p>
          </div>
        </div>

        {/* Next Appointment */}
        {nextAppointment && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Upcoming Appointment</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(nextAppointment.date + 'T' + nextAppointment.time).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {nextAppointment.time}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{nextAppointment.notes}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Reschedule
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Timeline</h2>
              <div className="space-y-4">
                {timeline.events.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center',
                        event.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      )}>
                        {event.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      {index < timeline.events.length - 1 && (
                        <div className={cn(
                          'w-0.5 h-16 mx-4 -mb-8',
                          event.completed ? 'bg-green-200' : 'bg-gray-200'
                        )} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(event.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents & Actions */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm p-6" id="documents">
              <h2 className="text-xl font-semibold mb-4">Documents</h2>
              <div className="space-y-3">
                {clientDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(doc.uploadedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {documentStatusIcons[doc.status]}
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload Document</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowDocumentPreview(true)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">View Draft Will</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Message Solicitor</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Book Appointment</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Document Preview Modal */}
      {showDocumentPreview && (
        <WillDocumentPreview 
          willDraft={mockWillDraft}
          isFullscreen={true}
          onClose={() => setShowDocumentPreview(false)}
          clientName={`${client.firstName} ${client.lastName}`}
        />
      )}
    </div>
  )
}