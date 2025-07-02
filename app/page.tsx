'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { mockDemoAccounts, mockStats } from '@/lib/data/mockData'
import { 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Zap,
  Award,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Home() {
  const router = useRouter()
  const { login } = useAuth()
  const [selectedDemo, setSelectedDemo] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleDemoLogin = async (email: string) => {
    setIsLoggingIn(true)
    const account = mockDemoAccounts.find(acc => acc.email === email)
    if (account && login(account.email, account.password)) {
      const redirectMap: Record<string, string> = {
        'client@demo.com': '/client/dashboard',
        'admin@demo.com': '/staff/admin',
        'solicitor@demo.com': '/staff/solicitor',
        'paralegal@demo.com': '/staff/paralegal'
      }
      setTimeout(() => {
        router.push(redirectMap[email])
      }, 500)
    }
  }

  const features = [
    {
      icon: Clock,
      title: 'Save 65% Time',
      description: 'Reduce administrative tasks and focus on what matters'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'End-to-end encryption with full legal compliance'
    },
    {
      icon: Zap,
      title: 'AI-Powered Drafting',
      description: 'Intelligent document generation with precedent matching'
    },
    {
      icon: Users,
      title: 'Client Self-Service',
      description: 'Empower clients with online booking and document upload'
    }
  ]

  const workflowSteps = [
    {
      step: 1,
      title: 'Client Registration',
      description: 'Clients register online and upload verification documents',
      time: '5 minutes'
    },
    {
      step: 2,
      title: 'Initial Consultation',
      description: 'Automated booking and pre-meeting questionnaires',
      time: '30 minutes'
    },
    {
      step: 3,
      title: 'AI Draft Generation',
      description: 'Intelligent will drafting based on consultation notes',
      time: '2 minutes'
    },
    {
      step: 4,
      title: 'Review & Approval',
      description: 'Paralegal review with AI assistance and client approval',
      time: '1 day'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">FK</span>
            </div>
            <span className="font-semibold text-xl text-gray-900">Forbes Kirby</span>
          </div>
          <div className="text-sm text-gray-600">
            Will Drafting Workflow Prototype
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Estate Planning Practice
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline client intake, automate will drafting, and deliver exceptional service 
            with our AI-powered workflow system
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3">
              <div className="text-2xl font-bold text-primary">{mockStats.timeSaved}</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3">
              <div className="text-2xl font-bold text-primary">{mockStats.averageCompletionTime}</div>
              <div className="text-sm text-gray-600">Avg Completion</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3">
              <div className="text-2xl font-bold text-primary">{mockStats.clientSatisfaction}/5</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Login Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Experience the Workflow</h2>
          <p className="text-gray-600 text-center mb-8">
            Select a demo account to explore different perspectives
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {mockDemoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => handleDemoLogin(account.email)}
                disabled={isLoggingIn}
                className={cn(
                  'p-6 rounded-lg border-2 transition-all text-left group',
                  'hover:border-primary hover:shadow-md',
                  isLoggingIn && 'opacity-50 cursor-not-allowed',
                  selectedDemo === account.email && 'border-primary bg-primary/5'
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg capitalize">{account.role}</h3>
                    <p className="text-sm text-gray-600">{account.name}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-gray-500">
                  {account.role === 'client' && 'Track your will progress and communicate with solicitors'}
                  {account.role === 'admin' && 'Manage clients, appointments, and system overview'}
                  {account.role === 'solicitor' && 'Review cases, conduct meetings, and approve drafts'}
                  {account.role === 'paralegal' && 'Review AI-generated drafts and ensure quality'}
                </p>
              </button>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-6">
            Demo accounts use simplified authentication. Click any role to begin.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 rounded-3xl">
        <h2 className="text-3xl font-bold text-center mb-4">Streamlined Workflow</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          From initial contact to executed will in record time
        </p>
        
        <div className="max-w-4xl mx-auto">
          {workflowSteps.map((step, index) => (
            <div key={step.step} className="flex items-start mb-8 last:mb-0">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="w-0.5 h-16 bg-gray-300 mx-6 my-2" />
                )}
              </div>
              <div className="ml-6 flex-1">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <span className="text-sm text-primary font-medium">{step.time}</span>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-600">
        <p className="mb-2">Forbes Kirby Will Drafting Workflow Prototype</p>
        <p className="text-sm">
          This is a demonstration prototype showcasing the proposed workflow system
        </p>
      </footer>
    </div>
  )
}
