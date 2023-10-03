'use client'

import { useNavMobileContext } from "@/contexts"
import { ReactNode, useState } from "react"

interface DropdownHeaderProps {
  children?: ReactNode
  headerText?: string
  icon?: ReactNode
  image?: string
}

export function Header({ children, headerText, icon, image }: DropdownHeaderProps) {
  const { isVisible, setIsVisible } = useNavMobileContext()

  return (
    <div className="flex justify-end items-center md:ml-6 py-2 lg:py-0">
      <div className="relative ml-3">
        <div
          onClick={()=> setIsVisible(prev => !prev)}
          
          className=" relative flex max-w-xs items-center  bg-gray-800 text-sm "
          id="user-menu-button"
        >
          {headerText && <span className="hidden lg:block  text-gray-100 mr-8 pl-1">{headerText?.split(' ')[0]}</span>}
          {image && <img className="h-8 w-8 rounded-full" src={image} alt='' />}
          {icon && <div>{icon}</div>}
        </div>

        {isVisible &&
          <div className='absolute right-0 z-10 mt-2  w-72 origin-top-right rounded-md bg-gray-800 py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className="bg-gray-400  rounded-b-lg flex flex-col gap-1" >
              {children}
            </div>
          </div>
        }

      </div>
    </div>
  )

}