'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserContextType {
  email: string | null
  setEmail: (email: string) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const STORAGE_KEY = 'receitas-gaps:userEmail'

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmailState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY)
    if (savedEmail) {
      setEmailState(savedEmail)
    }
    setIsLoading(false)
  }, [])

  const setEmail = (newEmail: string) => {
    setEmailState(newEmail)
    localStorage.setItem(STORAGE_KEY, newEmail)
  }

  return (
    <UserContext.Provider value={{ email, setEmail, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context.email
}

export function useSetUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useSetUser must be used within UserProvider')
  }
  return context.setEmail
}
