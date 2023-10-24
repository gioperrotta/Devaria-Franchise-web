'use client'
import { ReactNode} from "react"

interface DropdownHeaderProps {
  children?: ReactNode
  headerText?: string
  image?: string
  isVisible: boolean
  setVisible: (o: boolean) => void
  isVisibleIcon?: ReactNode
  isInvisibleIcon?: ReactNode
}

export function Header({ children, headerText, image, isVisible, setVisible, isVisibleIcon, isInvisibleIcon }: DropdownHeaderProps) {

  function handleClick() {
    const prev = isVisible
    setVisible(!prev)
  }

  return (
    <div className="flex justify-end items-center md:ml-6 py-2 lg:py-0">
      <div className="relative ml-3">
        <div
          onClick={handleClick}
          className=" relative flex max-w-xs  items-center rounded-full bg-gray-800 p-1 text-sm hover:cursor-pointer focus:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-offset-1 hover:ring-offset-gray-800 "
        >
          {headerText && <span className="hidden lg:block  text-gray-100 mr-8 pl-1">{headerText?.split(' ')[0]}</span>}
          {image && <img className="h-8 w-8 rounded-full" src={image} alt='' />}
          <div className=" rounded-full text-gray-400 hover:text-gray-200">
            {isVisible ? isVisibleIcon : isInvisibleIcon}
          </div>
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