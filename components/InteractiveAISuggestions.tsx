'use client'

import { useState } from 'react'
import { mockWillDraft } from '@/lib/data/mockData'
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  Eye,
  AlertTriangle,
  Lightbulb,
  Scale,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AISuggestionEnhanced {
  id: string
  type: 'tax' | 'clause' | 'structure' | 'legal'
  title: string
  description: string
  severity: 'info' | 'warning' | 'important'
  accepted?: boolean
  beforeText: string
  afterText: string
  impact: 'high' | 'medium' | 'low'
  timeToImplement: string
  confidence: number
}

const enhancedSuggestions: AISuggestionEnhanced[] = [
  {
    id: 'ai-1',
    type: 'tax',
    title: 'Inheritance Tax Optimization',
    description: 'The estate value may exceed the nil-rate band. Consider adding a charitable donation clause to reduce IHT liability.',
    severity: 'important',
    accepted: false,
    beforeText: 'I GIVE, DEVISE AND BEQUEATH all the rest, residue and remainder of my estate to be divided equally between my children Emily Thompson and Oliver Thompson.',
    afterText: 'I GIVE £50,000 to Cancer Research UK (Charity Registration Number 1089464), and I GIVE, DEVISE AND BEQUEATH all the rest, residue and remainder of my estate to be divided equally between my children Emily Thompson and Oliver Thompson.',
    impact: 'high',
    timeToImplement: '2 minutes',
    confidence: 94
  },
  {
    id: 'ai-2',
    type: 'clause',
    title: 'Digital Assets Provision',
    description: 'Consider adding provisions for digital assets including online accounts, cryptocurrency, and digital media collections.',
    severity: 'info',
    accepted: true,
    beforeText: '[No digital assets clause present]',
    afterText: 'I GIVE to my Executors full power and authority to access, manage, and distribute my digital assets including but not limited to online accounts, social media profiles, digital photographs, cryptocurrency holdings, and any other digital property or data.',
    impact: 'medium',
    timeToImplement: '1 minute',
    confidence: 88
  },
  {
    id: 'ai-3',
    type: 'structure',
    title: 'Trust Structure for Minors',
    description: 'Given the age conditions for your children, a formal trust structure might provide better protection and tax efficiency.',
    severity: 'warning',
    accepted: false,
    beforeText: 'To receive upon reaching age 25',
    afterText: 'To be held in trust until reaching age 25, with power for Trustees to advance income and capital for education, maintenance, and benefit',
    impact: 'high',
    timeToImplement: '5 minutes',
    confidence: 91
  },
  {
    id: 'ai-4',
    type: 'legal',
    title: 'Survivorship Clause Enhancement',
    description: 'Add a 30-day survivorship clause to prevent complications if beneficiaries die shortly after the testator.',
    severity: 'warning',
    accepted: false,
    beforeText: 'To Emily Thompson (Daughter) - 40%',
    afterText: 'To Emily Thompson (Daughter), provided she survives me by 30 days - 40%',
    impact: 'medium',
    timeToImplement: '1 minute',
    confidence: 96
  }
]

const typeIcons = {
  tax: TrendingUp,
  clause: Brain,
  structure: Scale,
  legal: AlertTriangle
}

const severityColors = {
  important: 'border-red-200 bg-red-50',
  warning: 'border-yellow-200 bg-yellow-50',
  info: 'border-blue-200 bg-blue-50'
}

const impactColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700'
}

export default function InteractiveAISuggestions() {
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null)
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<Set<string>>(
    new Set(enhancedSuggestions.filter(s => s.accepted).map(s => s.id))
  )
  const [rejectedSuggestions, setRejectedSuggestions] = useState<Set<string>>(new Set())
  const [showPreview, setShowPreview] = useState<string | null>(null)

  const handleAccept = (suggestionId: string) => {
    setAcceptedSuggestions(prev => new Set([...prev, suggestionId]))
    setRejectedSuggestions(prev => {
      const newSet = new Set(prev)
      newSet.delete(suggestionId)
      return newSet
    })
  }

  const handleReject = (suggestionId: string) => {
    setRejectedSuggestions(prev => new Set([...prev, suggestionId]))
    setAcceptedSuggestions(prev => {
      const newSet = new Set(prev)
      newSet.delete(suggestionId)
      return newSet
    })
  }

  const toggleExpanded = (suggestionId: string) => {
    setExpandedSuggestion(prev => prev === suggestionId ? null : suggestionId)
  }

  const acceptedCount = acceptedSuggestions.size
  const totalSuggestions = enhancedSuggestions.length

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Enhancement Suggestions</h3>
              <p className="text-sm text-gray-600">
                {acceptedCount} of {totalSuggestions} suggestions implemented
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {Math.round((acceptedCount / totalSuggestions) * 100)}% Complete
              </p>
              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(acceptedCount / totalSuggestions) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="divide-y divide-gray-200">
        {enhancedSuggestions.map((suggestion) => {
          const Icon = typeIcons[suggestion.type as keyof typeof typeIcons] || Brain
          const isExpanded = expandedSuggestion === suggestion.id
          const isAccepted = acceptedSuggestions.has(suggestion.id)
          const isRejected = rejectedSuggestions.has(suggestion.id)
          
          return (
            <div key={suggestion.id} className="p-6">
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                  suggestion.severity === 'important' && 'bg-red-100 text-red-600',
                  suggestion.severity === 'warning' && 'bg-yellow-100 text-yellow-600',
                  suggestion.severity === 'info' && 'bg-blue-100 text-blue-600'
                )}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                        <span className={cn(
                          'px-2 py-1 text-xs font-medium rounded-full',
                          impactColors[suggestion.impact]
                        )}>
                          {suggestion.impact} impact
                        </span>
                        <span className="text-xs text-gray-500">
                          {suggestion.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                      
                      {/* Quick stats */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{suggestion.timeToImplement}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Brain className="w-3 h-3" />
                          <span className="capitalize">{suggestion.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {!isAccepted && !isRejected && (
                        <>
                          <button
                            onClick={() => handleReject(suggestion.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAccept(suggestion.id)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      {isAccepted && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">Applied</span>
                        </div>
                      )}
                      
                      {isRejected && (
                        <div className="flex items-center space-x-2 text-gray-400">
                          <XCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">Dismissed</span>
                        </div>
                      )}
                      
                      <button
                        onClick={() => toggleExpanded(suggestion.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 space-y-4">
                      {/* Before/After Comparison */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                            Current Text
                          </h5>
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-gray-700 font-mono leading-relaxed">
                              {suggestion.beforeText}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            Suggested Text
                          </h5>
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-gray-700 font-mono leading-relaxed">
                              {suggestion.afterText}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {!isAccepted && !isRejected && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <button
                            onClick={() => setShowPreview(suggestion.id)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Preview in Document</span>
                          </button>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleReject(suggestion.id)}
                              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Dismiss
                            </button>
                            <button
                              onClick={() => handleAccept(suggestion.id)}
                              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                            >
                              Apply Suggestion
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{acceptedCount}</span> suggestions applied
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{rejectedSuggestions.size}</span> dismissed
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{totalSuggestions - acceptedCount - rejectedSuggestions.size}</span> pending
            </div>
          </div>
          
          {acceptedCount > 0 && (
            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
              Regenerate Document
            </button>
          )}
        </div>
      </div>
    </div>
  )
}