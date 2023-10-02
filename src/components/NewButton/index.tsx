import { LucideProps } from 'lucide-react'
import { ButtonHTMLAttributes, ForwardRefExoticComponent, ReactElement, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'deafult' | 'transparent' | 'submmit' | 'proceed' | 'cancel'

}

export const NewButton = (props: ButtonProps) => {
  const { variant } = props

  switch (variant) {
    case 'transparent':
      
      break;
  
    default:
      break;
  }
  return <DefaultButton {...props} />
}

export const DefaultButton = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className='rounded-md font-bold flex justify-center items-center gap-3 p-2 border-2 border-gray-500 text-white text-2xl w-full'
    >
      {props.children}
    </button>
  )
}