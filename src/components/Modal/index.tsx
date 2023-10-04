'use client'
import { X as Close } from '@phosphor-icons/react'

interface ModalProps {
  isOpen: boolean
  setIsOpen: (o:boolean) => void
  children: React.ReactNode
  title?: string
}


export function Modal({ children, title, isOpen, setIsOpen }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-green-950 bg-opacity-50 flex justify-center items-center" >
      <div className="bg-gray-100 text-black rounded-b-xl flex flex-col items-center justify-between">
      {title &&
        <div className="bg-green-900 h-6 w-full flex items-center justify-between p-1">
          <span className="text-white text-xs px-2">{title}</span>
          <button className="text-gray-200" onClick={() => setIsOpen(false)} >
            <Close size={18} />
          </button>
        </div>
        }
        {children}
      </div>
    </div>
  )
}