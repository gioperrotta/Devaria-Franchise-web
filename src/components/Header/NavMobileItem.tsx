import { ReactNode } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useNavMobileContext } from '@/contexts'

interface NavMobileItemProps {
  to: string
  children: ReactNode
}

export function NavMobileItem({ to, children }: NavMobileItemProps) {
  const { setIsVisible } = useNavMobileContext()
  const router = useRouter()

  function handleClick() {
    if (!to) {
      return
    }
    setIsVisible(prev => !prev)
    router.push(to)
  }

  return (
    <div
      onClick={handleClick}
      className='w-full flex items-center justify-between text-md p-2 text-gray-100 bg-gray-300 hover:bg-gray-600 '
    >
      {children}
    </div>
  )
}