'use client'
import { X as Close } from '@phosphor-icons/react'

interface ModalProps {
  isOpen: boolean
  setOpen: (o: boolean) => void
  children: React.ReactNode
  title?: string
}

export function Modal({ children, title, isOpen, setOpen }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-90 flex justify-center items-center" >
      <div className=" flex flex-col items-center justify-between">
        {title &&
          <div className="z-20 bg-green-900 h-7 w-full flex items-center justify-between p-1">
            <span className="flex-1 text-white text-center text-sm font-semibold px-2">{title}</span>
            <button className="text-gray-200" onClick={() => setOpen(false)} >
              <Close size={18} />
            </button>
          </div>
        }
        <div className='rounded-b-xl'>
          {children}
        </div>
      </div>
    </div>
  )
}