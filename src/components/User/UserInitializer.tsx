'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@/context/UserContext'

export function UserInitializer() {
  const router = useRouter()
  const pathname = usePathname()
  const email = useUser()

  useEffect(() => {
    // If no email and not already on login page, redirect to login
    if (!email && pathname !== '/login') {
      router.push('/login')
    }
  }, [email, pathname, router])

  return null
}
