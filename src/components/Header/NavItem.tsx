'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  useEffect, useState, ReactNode } from "react"

interface MenuItemProps {
  href: string
  children: ReactNode
}

export function NavItem({href, children}: MenuItemProps) {
  const path = usePathname()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(href === path)
  }, [path])

  return (
    <Link
      className={` ${isActive ? 'bg-gray-900' : 'bg-gray-400'} rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white`}
      href={href}
    >
      {children}
    </Link>
  )
}