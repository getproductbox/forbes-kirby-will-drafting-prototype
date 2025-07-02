'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import Navigation from '@/components/Navigation'
import { mockClients, mockWillDraft } from '@/lib/data/mockData'
import { 
  FileText, 
  Brain,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Send,
  X,
  Shield,
  Scale,
  Book
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ParalegalDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedDraft, setSelectedDraft] = useState<string | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'paralegal') {
      router.push('/')
    }
  }, [user, router])

  if (!user || user.role !== 'paralegal') return null

  const reviewQueue = [
    {
      id: 'draft-1',
      clientId: 'client-1',
      clientName: 'Sarah Thompson',
      solicitor: 'Michael Chen',
      priority: 'high',
      complexity: 'medium',
      draftVersion: 2,
      submittedDate: '2024-12-26',
      aiChecks: 12,
      aiFlags: 2
    },
    {
      id: 'draft-2',
      clientId: 'client-2',
      clientName: 'Robert Johnson',
      solicitor: 'Michael Chen',
      priority: 'medium',
      complexity: 'low',
      draftVersion: 1,
      submittedDate: '2024-12-27',
      aiChecks: 8,
      aiFlags: 0
    }
  ]

  const completedReviews = [
    {
      id: 'draft-3',
      clientName: 'David Brown',
      completedDate: '2024-12-20',
      status: 'approved',
      reviewTime: '45 minutes'
    }
  ]

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700'
  }

  const complexityColors = {
    high: 'bg-purple-100 text-purple-700',
    medium: 'bg-blue-100 text-blue-700',
    low: 'bg-gray-100 text-gray-700'
  }

  const qualityChecks = [
    { id: 1, category: 'Clause Verification', status: 'passed', details: 'All clauses match precedent library' },
    { id: 2, category: 'Legal Compliance', status: 'passed', details: 'Complies with Wills Act 1837' },
    { id: 3, category: 'Beneficiary Details', status: 'warning', details: 'Consider adding more specific address details' },
    { id: 4, category: 'Executor Provisions', status: 'passed', details: 'Executor details complete and valid' },
    { id: 5, category: 'Tax Implications', status: 'review', details: 'May benefit from inheritance tax planning' },
    { id: 6, category: 'Witness Requirements', status: 'passed', details: 'Witness clause properly drafted' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Paralegal Dashboard
          </h1>
          <p className="text-gray-600">
            Review AI-generated drafts and ensure quality compliance
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{reviewQueue.length}</h3>
            <p className="text-sm text-gray-600">Pending Reviews</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">18</h3>
            <p className="text-sm text-gray-600">Completed This Month</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">32 min</h3>
            <p className="text-sm text-gray-600">Avg Review Time</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">94%</h3>
            <p className="text-sm text-gray-600">AI Accuracy</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Review Queue */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm" id="queue">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Review Queue</h2>
                  <div className="flex space-x-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <Filter className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {reviewQueue.map((draft) => (
                  <div 
                    key={draft.id}
                    onClick={() => setSelectedDraft(draft.id)}
                    className={cn(
                      'p-4 cursor-pointer hover:bg-gray-50 transition-colors',
                      selectedDraft === draft.id && 'bg-blue-50 border-r-4 border-primary'
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{draft.clientName}</h3>
                      <div className="flex space-x-1">
                        <span className={cn(
                          'px-2 py-1 text-xs font-medium rounded-full',
                          priorityColors[draft.priority as keyof typeof priorityColors]
                        )}>
                          {draft.priority}
                        </span>
                        <span className={cn(
                          'px-2 py-1 text-xs font-medium rounded-full',
                          complexityColors[draft.complexity as keyof typeof complexityColors]
                        )}>
                          {draft.complexity}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Solicitor: {draft.solicitor}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>v{draft.draftVersion}</span>
                      <span>{draft.aiChecks} checks • {draft.aiFlags} flags</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted: {new Date(draft.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Reviews */}
            <div className="bg-white rounded-lg shadow-sm mt-6" id="completed">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Recent Completions</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {completedReviews.map((review) => (
                  <div key={review.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{review.clientName}</h3>
                        <p className="text-sm text-gray-600">{review.status}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.completedDate).toLocaleDateString()} • {review.reviewTime}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Interface */}
          <div className="lg:col-span-2">
            {selectedDraft ? (
              <div className="space-y-6">
                {/* Document Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Draft Review</h2>
                      <p className="text-sm text-gray-600">
                        Will for {reviewQueue.find(d => d.id === selectedDraft)?.clientName} • Version {reviewQueue.find(d => d.id === selectedDraft)?.draftVersion}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Full Document</span>
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Quality Checks */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="w-5 h-5 text-primary mr-2" />
                    AI Quality Assessment
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {qualityChecks.map((check) => (
                      <div key={check.id} className={cn(
                        'p-4 rounded-lg border-l-4',
                        check.status === 'passed' && 'bg-green-50 border-green-400',
                        check.status === 'warning' && 'bg-yellow-50 border-yellow-400',
                        check.status === 'review' && 'bg-orange-50 border-orange-400'
                      )}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 flex items-center">
                              {check.category}
                              {check.status === 'passed' && <CheckCircle className="w-4 h-4 text-green-600 ml-2" />}
                              {check.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600 ml-2" />}
                              {check.status === 'review' && <AlertCircle className="w-4 h-4 text-orange-600 ml-2" />}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{check.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Sections */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Book className="w-5 h-5 text-primary mr-2" />
                    Document Sections Review
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Testator Information</h4>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">All testator details verified and complete</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Executors & Trustees</h4>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Executor appointments properly drafted with alternates</p>
                    </div>

                    <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Beneficiary Provisions</h4>
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      </div>
                      <p className="text-sm text-gray-600">Consider clarifying contingent beneficiary provisions</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Specific Gifts</h4>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Specific bequests clearly defined</p>
                    </div>
                  </div>
                </div>

                {/* Review Notes */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Review Notes</h3>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add your review notes and recommendations..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve Draft</span>
                      </button>
                      <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Request Changes</span>
                      </button>
                      <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2">
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Contact Solicitor</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Draft to Review</h3>
                <p className="text-gray-600">Choose a document from the review queue to begin your assessment</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}