'use client'

import { ReactNode} from "react"

interface MenuItemProps {
  onClick?: () => void
  icon: ReactNode
  text: string
}

export function Item({ icon, onClick, text }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between text-md p-2 text-gray-100 bg-gray-300 hover:bg-gray-600"
    >
      {icon}
      <span>{text}</span>
    </div>
  )
}