'use client'
import { SessionProvider } from 'next-auth/react'
import { VisibleComponentsProvider, AuthContextProvider } from '@/contexts'


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        <VisibleComponentsProvider>
          {children}
        </VisibleComponentsProvider>
      </AuthContextProvider>
    </SessionProvider>
  )
}