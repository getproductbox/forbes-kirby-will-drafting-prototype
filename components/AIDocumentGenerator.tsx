'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, 
  FileText, 
  CheckCircle, 
  Loader2,
  Sparkles,
  Clock,
  Users,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Eye,
  Download
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface GenerationStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  status: 'pending' | 'processing' | 'completed' | 'error'
  duration: number
  details?: string[]
}

const generationSteps: GenerationStep[] = [
  {
    id: 'analysis',
    title: 'Client Data Analysis',
    description: 'Analyzing consultation notes and client information',
    icon: Brain,
    status: 'pending',
    duration: 3000,
    details: [
      'Processing 47 data points from consultation',
      'Identifying estate complexity: Medium',
      'Extracting key relationships and beneficiaries',
      'Analyzing tax implications'
    ]
  },
  {
    id: 'structure',
    title: 'Document Structure Planning',
    description: 'Determining optimal will structure and clauses',
    icon: FileText,
    status: 'pending',
    duration: 2500,
    details: [
      'Selecting appropriate will template',
      'Planning clause sequence and dependencies',
      'Identifying required legal provisions',
      'Structuring gift distributions'
    ]
  },
  {
    id: 'drafting',
    title: 'Clause Generation',
    description: 'Generating personalized legal clauses',
    icon: Scale,
    status: 'pending',
    duration: 4000,
    details: [
      'Drafting testator declaration',
      'Creating executor appointment clauses',
      'Generating specific gift provisions',
      'Composing residuary estate clauses'
    ]
  },
  {
    id: 'validation',
    title: 'Legal Compliance Check',
    description: 'Validating against legal requirements and precedents',
    icon: ShieldCheck,
    status: 'pending',
    duration: 2000,
    details: [
      'Checking compliance with Wills Act 1837',
      'Validating against 2,847 precedent cases',
      'Ensuring proper witnessing requirements',
      'Verifying tax optimization opportunities'
    ]
  },
  {
    id: 'review',
    title: 'Quality Assurance',
    description: 'Final review and optimization suggestions',
    icon: CheckCircle,
    status: 'pending',
    duration: 1500,
    details: [
      'Generating improvement suggestions',
      'Checking for potential ambiguities',
      'Optimizing language clarity',
      'Preparing review notes'
    ]
  }
]

interface AIDocumentGeneratorProps {
  isGenerating: boolean
  onComplete?: () => void
  clientName?: string
}

export default function AIDocumentGenerator({ 
  isGenerating, 
  onComplete,
  clientName = "Sarah Thompson" 
}: AIDocumentGeneratorProps) {
  const [steps, setSteps] = useState<GenerationStep[]>(generationSteps)
  const [currentStep, setCurrentStep] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isGenerating && !startTime) {
      setStartTime(new Date())
      setSteps(generationSteps.map(step => ({ ...step, status: 'pending' })))
      setCurrentStep(0)
      setIsComplete(false)
    }
  }, [isGenerating, startTime])

  useEffect(() => {
    if (!isGenerating || isComplete) return

    const processStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setIsComplete(true)
        onComplete?.()
        return
      }

      // Start processing current step
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === stepIndex ? 'processing' : 
                index < stepIndex ? 'completed' : 'pending'
      })))

      // Complete current step after duration
      setTimeout(() => {
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index <= stepIndex ? 'completed' : 'pending'
        })))
        
        setCurrentStep(stepIndex + 1)
        
        // Start next step
        setTimeout(() => {
          processStep(stepIndex + 1)
        }, 500)
      }, steps[stepIndex].duration)
    }

    if (currentStep === 0 && steps[0].status === 'pending') {
      processStep(0)
    }
  }, [isGenerating, currentStep, steps, isComplete, onComplete])

  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0)
  const elapsedTime = startTime ? Date.now() - startTime.getTime() : 0
  const progress = Math.min((elapsedTime / totalDuration) * 100, 100)

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    return `${seconds}s`
  }

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
              <h3 className="text-lg font-semibold text-gray-900">
                AI Will Generation
              </h3>
              <p className="text-sm text-gray-600">
                Generating personalized will for {clientName}
              </p>
            </div>
          </div>
          
          {isGenerating && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {formatTime(elapsedTime)} / {formatTime(totalDuration)}
                </p>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generation Steps */}
      <div className="p-6">
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.status === 'processing'
            const isCompleted = step.status === 'completed'
            const isPending = step.status === 'pending'
            
            return (
              <div key={step.id} className="relative">
                <div className="flex items-start space-x-4">
                  {/* Step Icon */}
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300',
                    isActive && 'bg-blue-100 text-blue-600 animate-pulse',
                    isCompleted && 'bg-green-100 text-green-600',
                    isPending && 'bg-gray-100 text-gray-400'
                  )}>
                    {isActive ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={cn(
                        'font-medium transition-colors',
                        isActive && 'text-blue-900',
                        isCompleted && 'text-green-900',
                        isPending && 'text-gray-500'
                      )}>
                        {step.title}
                      </h4>
                      
                      {isActive && (
                        <span className="text-xs text-blue-600 font-medium">
                          Processing...
                        </span>
                      )}
                      
                      {isCompleted && (
                        <span className="text-xs text-green-600 font-medium">
                          Complete
                        </span>
                      )}
                    </div>
                    
                    <p className={cn(
                      'text-sm mt-1 transition-colors',
                      isActive && 'text-blue-700',
                      isCompleted && 'text-green-700',
                      isPending && 'text-gray-500'
                    )}>
                      {step.description}
                    </p>

                    {/* Step Details (show when active or just completed) */}
                    {(isActive || (isCompleted && index === currentStep - 1)) && step.details && (
                      <div className="mt-3 space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <div className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              isActive ? 'bg-blue-400' : 'bg-green-400'
                            )} />
                            <span className="text-xs text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={cn(
                    'absolute left-5 top-10 w-0.5 h-6 transition-colors',
                    isCompleted ? 'bg-green-300' : 'bg-gray-200'
                  )} />
                )}
              </div>
            )
          })}
        </div>

        {/* Completion State */}
        {isComplete && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">
                    Will Generation Complete
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Generated in {formatTime(totalDuration)} • Ready for review
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Preview</span>
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Draft</span>
                </button>
              </div>
            </div>
            
            {/* Generation Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-green-200">
              <div className="text-center">
                <p className="text-lg font-semibold text-green-900">2,847</p>
                <p className="text-xs text-green-600">Precedents Analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-900">94%</p>
                <p className="text-xs text-green-600">Confidence Score</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-900">12</p>
                <p className="text-xs text-green-600">Clauses Generated</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-900">3</p>
                <p className="text-xs text-green-600">Optimization Suggestions</p>
              </div>
            </div>
          </div>
        )}

        {/* Start Generation Button */}
        {!isGenerating && !isComplete && (
          <div className="mt-6 text-center">
            <button 
              onClick={() => setStartTime(new Date())}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 flex items-center space-x-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Will with AI</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}