'use client'

import { ReactNode, useState } from "react"



interface ProfileMenuProps {
  children?: ReactNode
  userName?: string
  avatarUrl?: string
}

export function Header({ userName, avatarUrl, children }: ProfileMenuProps) {
  const [hiddenCalss, setHiddenClass] = useState('hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none')

  function toggleHidenClass() {
    const arrayClass = hiddenCalss.split(' ')
    const indexHidden = arrayClass.indexOf('hidden')
    if (indexHidden >= 0) {
      arrayClass.splice(indexHidden, 1)
      arrayClass.push('absolute')
    } else {
      const indexAbsolute = arrayClass.indexOf('absolute')
      arrayClass.splice(indexAbsolute, 1)
      arrayClass.push('hidden')
    }
    setHiddenClass(arrayClass.join(' '))
  }

  return (
    <div className= "flex justify-end items-center md:ml-6 py-2 lg:py-0">
      <div className="relative ml-3">
        <div>
          <button
            onClick={toggleHidenClass}
            type="button"
            className=" relative flex max-w-xs items-center rounded-full bg-gray-800 p-1 text-sm focus:outline-none hover:ring-1 hover:ring-white hover:ring-offset-1 hover:ring-offset-gray-800 "
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="absolute -inset-1.5"></span>
            <span className="text-gray-100 mr-8 pl-1">{userName?.split(' ')[0]}</span>
            <img className="h-8 w-8 rounded-full" src={avatarUrl} alt="Avatar do usuário ativo" />
          </button>
        </div>
        <div className={hiddenCalss}>
          <div className="bg-gray-400  rounded-lg flex flex-col gap-1" >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}



