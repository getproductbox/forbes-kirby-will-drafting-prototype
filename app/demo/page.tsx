'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/context/AuthContext'
import { mockDemoAccounts } from '@/lib/data/mockData'
import { 
  User, 
  Shield, 
  Briefcase, 
  UserCheck,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react'

export default function DemoPage() {
  const { login } = useAuth()

  const demoFeatures = [
    {
      role: 'client',
      icon: User,
      title: 'Client Experience',
      features: [
        'Simple online registration and onboarding',
        'Document upload for ID verification',
        'Real-time progress tracking',
        'Draft will review and approval',
        'Secure messaging with solicitors',
        'Appointment booking and management'
      ],
      path: '/client/dashboard'
    },
    {
      role: 'admin',
      icon: Shield,
      title: 'Administrative Dashboard',
      features: [
        'Client management overview',
        'Appointment scheduling system',
        'Performance metrics and reporting',
        'Staff workload management',
        'System analytics and insights',
        'Automated workflow tracking'
      ],
      path: '/staff/admin'
    },
    {
      role: 'solicitor',
      icon: Briefcase,
      title: 'Solicitor Workflow',
      features: [
        'Client case management',
        'AI-generated draft review',
        'Meeting notes and consultation tracking',
        'Client communication tools',
        'Document approval workflow',
        'Time tracking and billing integration'
      ],
      path: '/staff/solicitor'
    },
    {
      role: 'paralegal',
      icon: UserCheck,
      title: 'Quality Assurance',
      features: [
        'AI draft quality assessment',
        'Clause verification against precedents',
        'Legal compliance checking',
        'Review workflow management',
        'Quality metrics tracking',
        'Automated error detection'
      ],
      path: '/staff/paralegal'
    }
  ]

  const handleQuickLogin = (email: string, path: string) => {
    const account = mockDemoAccounts.find(acc => acc.email === email)
    if (account && login(account.email, account.password)) {
      window.location.href = path
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">FK</span>
            </div>
            <span className="font-semibold text-xl text-gray-900">Forbes Kirby</span>
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Interactive Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore the Forbes Kirby will drafting workflow from different user perspectives. 
            Each demo showcases key features and capabilities of the platform.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Play className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Live Demo</span>
            </div>
            <p className="text-blue-700 text-sm">
              This is a functional prototype demonstrating the proposed workflow. 
              All interactions are simulated with realistic data.
            </p>
          </div>
        </div>

        {/* Demo Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {demoFeatures.map((demo) => {
            const Icon = demo.icon
            const account = mockDemoAccounts.find(acc => acc.role === demo.role)
            
            return (
              <div key={demo.role} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{demo.title}</h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {account?.name} • {demo.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {demo.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleQuickLogin(account?.email || '', demo.path)}
                  className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <span>Launch {demo.title} Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Highlights</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">End-to-End Workflow</h3>
                <p className="text-sm text-gray-600">
                  Complete client journey from registration to final will execution
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Assistance</h3>
                <p className="text-sm text-gray-600">
                  Intelligent draft generation and quality checking throughout the process
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional Interface</h3>
                <p className="text-sm text-gray-600">
                  Designed for legal professionals with efficiency and compliance in mind
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">For Demonstration</h4>
              <p className="text-gray-600">
                Click any demo card above to instantly access that role's interface with pre-loaded data
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Role Switching</h4>
              <p className="text-gray-600">
                Use the role switcher in the navigation to quickly move between different user perspectives
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}