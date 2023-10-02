'use client'
import { SessionProvider } from 'next-auth/react'
import { NavMobileProvider, AuthContextProvider } from '@/contexts'


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        <NavMobileProvider>
          {children}
        </NavMobileProvider>
      </AuthContextProvider>
    </SessionProvider>
  )
}