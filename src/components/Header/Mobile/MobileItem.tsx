import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useVisibleComponentsContext } from '@/contexts'

interface NavMobileItemProps {
  to: string
  children: ReactNode
  setVisible: (o: boolean) => void
}

export function MobileItem({ to, children, setVisible }: NavMobileItemProps) {
  const { setIsNavVisible } = useVisibleComponentsContext()
  const router = useRouter()

  function handleClick() {
    if (!to) {
      return
    }
    setVisible(false)
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