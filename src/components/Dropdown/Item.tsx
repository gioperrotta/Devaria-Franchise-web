'use client'

import { ReactNode} from "react"

interface MenuItemProps {
  onClick?: () => void
  children: ReactNode
}

export function Item({ onClick, children }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between text-md p-2 text-gray-100 bg-gray-300 hover:bg-gray-600 hover:cursor-pointer"
    >
      {children}
    </div>
  )
}