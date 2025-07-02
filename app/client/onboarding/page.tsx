'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  FileText, 
  Calendar, 
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ClientOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    idDocument: null,
    preferredMeetingType: 'in-person',
    availability: '',
    estatePlanning: {
      hasWill: false,
      hasProperty: false,
      hasChildren: false,
      estimatedValue: ''
    }
  })

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Document Upload', icon: FileText },
    { number: 3, title: 'Initial Questionnaire', icon: CheckCircle },
    { number: 4, title: 'Appointment Booking', icon: Calendar }
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/client/dashboard')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">FK</span>
          </div>
          <span className="font-semibold text-xl text-gray-900">Forbes Kirby</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={cn(
                    'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                    isActive && 'bg-primary text-white',
                    isCompleted && 'bg-green-100 text-green-700',
                    !isActive && !isCompleted && 'bg-gray-100 text-gray-400'
                  )}>
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      isActive && 'bg-white text-primary',
                      isCompleted && 'bg-green-600 text-white',
                      !isActive && !isCompleted && 'bg-gray-300 text-gray-600'
                    )}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="hidden md:block">
                      <p className="font-medium">{step.title}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'flex-1 h-0.5 mx-4',
                      isCompleted ? 'bg-green-300' : 'bg-gray-200'
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Personal Information
                </h1>
                <p className="text-gray-600">
                  Please provide your basic information to get started
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="07123 456789"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Identity Verification
                </h1>
                <p className="text-gray-600">
                  Upload a photo of your ID document for verification
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload ID Document
                </h3>
                <p className="text-gray-600 mb-6">
                  Drag and drop your passport, driving licence, or other photo ID here
                </p>
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  Select File
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-1">Accepted Documents</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• UK/EU Passport</li>
                  <li>• UK Driving Licence</li>
                  <li>• National Identity Card</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Estate Planning Questionnaire
                </h1>
                <p className="text-gray-600">
                  Help us understand your estate planning needs
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Current Situation</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-primary"
                        checked={formData.estatePlanning.hasWill}
                        onChange={(e) => updateFormData('estatePlanning', { 
                          ...formData.estatePlanning, 
                          hasWill: e.target.checked 
                        })}
                      />
                      <span className="text-gray-700">I currently have a will</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-primary"
                        checked={formData.estatePlanning.hasProperty}
                        onChange={(e) => updateFormData('estatePlanning', { 
                          ...formData.estatePlanning, 
                          hasProperty: e.target.checked 
                        })}
                      />
                      <span className="text-gray-700">I own property (house, flat, land)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-primary"
                        checked={formData.estatePlanning.hasChildren}
                        onChange={(e) => updateFormData('estatePlanning', { 
                          ...formData.estatePlanning, 
                          hasChildren: e.target.checked 
                        })}
                      />
                      <span className="text-gray-700">I have children under 18</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Estate Value
                  </label>
                  <select 
                    value={formData.estatePlanning.estimatedValue}
                    onChange={(e) => updateFormData('estatePlanning', { 
                      ...formData.estatePlanning, 
                      estimatedValue: e.target.value 
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="under-100k">Under £100,000</option>
                    <option value="100k-250k">£100,000 - £250,000</option>
                    <option value="250k-500k">£250,000 - £500,000</option>
                    <option value="500k-1m">£500,000 - £1,000,000</option>
                    <option value="over-1m">Over £1,000,000</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Book Your Consultation
                </h1>
                <p className="text-gray-600">
                  Schedule your initial consultation with one of our solicitors
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Meeting Preference</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="meetingType"
                        value="in-person"
                        checked={formData.preferredMeetingType === 'in-person'}
                        onChange={(e) => updateFormData('preferredMeetingType', e.target.value)}
                        className="w-5 h-5 text-primary"
                      />
                      <div>
                        <p className="font-medium text-gray-900">In-Person Meeting</p>
                        <p className="text-sm text-gray-600">Meet at our office</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="meetingType"
                        value="video-call"
                        checked={formData.preferredMeetingType === 'video-call'}
                        onChange={(e) => updateFormData('preferredMeetingType', e.target.value)}
                        className="w-5 h-5 text-primary"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Video Call</p>
                        <p className="text-sm text-gray-600">Meet online via video conference</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Available Times</h3>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Calendar integration would appear here</p>
                    <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                      Select Time Slot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={cn(
                'flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors',
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <span>{currentStep === 4 ? 'Complete' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}