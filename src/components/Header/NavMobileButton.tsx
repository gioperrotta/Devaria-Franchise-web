'use client'

import { ReactNode } from 'react'

interface NavMobileButtonProps {
  children: ReactNode
}


export function NavMobileButton({ children }: NavMobileButtonProps) {
  return (
    <button
      type="button"
      className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
    >
     {children}
    </button>
  )
}