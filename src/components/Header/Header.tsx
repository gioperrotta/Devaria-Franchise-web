'use client'
import { Logo, NavMobileButton, NavMobile, Nav } from '@/components'


import { X as Close, List as Hamburguer } from '@phosphor-icons/react'
import { useNavMobileContext } from '@/contexts'

export function Header() {
  const { isVisible, setIsVisible } = useNavMobileContext()
 
  return (
    <div className="w-full h-20 bg-gray-600 border-b-4 border-green-700 shadow-sm">
      <div className="w-full h-full  px-4 max-w-7xl m-auto flex items-center justify-between">
        <Logo />
        <Nav />
        <div className='flex lg:hidden'>
          <div onClick={() => setIsVisible(prev => !prev)}>
            {isVisible ? (
              <NavMobileButton><Close size={32} /></NavMobileButton>
            ) : (
              <NavMobileButton><Hamburguer size={32} /></NavMobileButton>
            )}
          </div>
        </div>
      </div>
      {isVisible && <NavMobile />}
    </div >
  )
}