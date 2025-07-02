'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/context/AuthContext'
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut,
  User,
  Shield,
  Briefcase,
  UserCheck
} from 'lucide-react'
import { UserRole } from '@/types'

const roleIcons: Record<UserRole, React.ReactNode> = {
  client: <User className="w-4 h-4" />,
  admin: <Shield className="w-4 h-4" />,
  solicitor: <Briefcase className="w-4 h-4" />,
  paralegal: <UserCheck className="w-4 h-4" />
}

const navigation = {
  client: [
    { name: 'Dashboard', href: '/client/dashboard', icon: Home },
    { name: 'Documents', href: '/client/dashboard#documents', icon: FileText },
    { name: 'Appointments', href: '/client/dashboard#appointments', icon: Calendar },
  ],
  admin: [
    { name: 'Dashboard', href: '/staff/admin', icon: Home },
    { name: 'Clients', href: '/staff/admin#clients', icon: Users },
    { name: 'Appointments', href: '/staff/admin#appointments', icon: Calendar },
    { name: 'Reports', href: '/staff/admin#reports', icon: FileText },
  ],
  solicitor: [
    { name: 'Dashboard', href: '/staff/solicitor', icon: Home },
    { name: 'My Clients', href: '/staff/solicitor#clients', icon: Users },
    { name: 'Draft Wills', href: '/staff/solicitor#drafts', icon: FileText },
    { name: 'Appointments', href: '/staff/solicitor#appointments', icon: Calendar },
  ],
  paralegal: [
    { name: 'Dashboard', href: '/staff/paralegal', icon: Home },
    { name: 'Review Queue', href: '/staff/paralegal#queue', icon: FileText },
    { name: 'Completed Reviews', href: '/staff/paralegal#completed', icon: FileText },
  ]
}

export default function Navigation() {
  const pathname = usePathname()
  const { user, logout, switchRole } = useAuth()

  if (!user) return null

  const userNavigation = navigation[user.role] || []

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role)
    const defaultPaths: Record<UserRole, string> = {
      client: '/client/dashboard',
      admin: '/staff/admin',
      solicitor: '/staff/solicitor',
      paralegal: '/staff/paralegal'
    }
    window.location.href = defaultPaths[role]
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">FK</span>
              </div>
              <span className="font-semibold text-gray-900">Forbes Kirby</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {userNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Demo Mode:</span>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {(['client', 'admin', 'solicitor', 'paralegal'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={cn(
                      'flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize',
                      user.role === role
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {roleIcons[role]}
                    <span>{role}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                alt={user.name}
              />
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}