'use client'
import { Logo, Nav } from '@/components'

export function Header() {
  return (
    <div className="w-full h-20 bg-gray-600 border-b-4 border-green-700 shadow-sm">
      <div className="w-full h-full  px-4 max-w-7xl m-auto flex items-center justify-between">
        <Logo />
        <Nav />
     </div>

    </div >
  )
}