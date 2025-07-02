'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User, UserRole } from '@/types'
import { mockUsers, mockDemoAccounts } from '@/lib/data/mockData'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string): boolean => {
    const account = mockDemoAccounts.find(acc => acc.email === email && acc.password === password)
    if (account) {
      const userData = mockUsers.find(u => u.role === account.role)
      if (userData) {
        setUser(userData)
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (role: UserRole) => {
    const newUser = mockUsers.find(u => u.role === role)
    if (newUser) {
      setUser(newUser)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}