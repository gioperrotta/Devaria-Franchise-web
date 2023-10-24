'use client'

import { ButtonHTMLAttributes,  ReactNode} from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  iconleft?: ReactNode
  iconright?: ReactNode
  variant?: 'default' | 'transparent' | 'submit' | 'proceed' | 'cancel'
  defaultstyle?: string
  size?: 'default' | 'small' | 'full'
}

export function Button(props: ButtonProps) {
  const { variant } = props
  const style = "rounded-md font-normal  flex items-center justify-center gap-5 p-2 "
  switch (variant) {
    case 'transparent':
      return <TransperentButton defaultstyle={style} {...props} size={props?.size ?? 'default'} />
    case 'submit':
      return <SubmitButton defaultstyle={style} {...props} size={props?.size ?? 'default'} />
    case 'proceed':
      return <ProceedButton defaultstyle={style} {...props} size={props?.size ?? 'default'} />
    case 'cancel':
      return <CancelButton defaultstyle={style} {...props} size={props?.size ?? 'default'} />
    default:
      return <DefaultButton defaultstyle={style} {...props} size={props?.size ?? 'default'} />
  }
}


export function DefaultButton(props: ButtonProps) {
  let { children, iconright, iconleft, defaultstyle, size } = props

  if (size === 'default') defaultstyle += ' w-52'
  if (size === 'full') defaultstyle += ' w-full'

  return (
    <button
      {...props}
      className={`${defaultstyle}  border-2 border-gray-500 text-white text-2xl`} >
      {iconleft}
      <span className="text-center my-auto">{children}</span>
      {iconright}
    </button>
  )
}

export function TransperentButton(props: ButtonProps) {
  let { children, iconright, iconleft, defaultstyle, size } = props

  if (size === 'default') defaultstyle += ' w-52'
  if (size === 'full') defaultstyle += ' w-full'

  return (
    <button
      {...props}
      className={`${defaultstyle} text-black text-xl`} >
      {iconleft}
      <span className="text-center my-auto">{children}</span>
      {iconright}
    </button>
  )
}
export function SubmitButton(props: ButtonProps) {
  let { children, iconright, iconleft, defaultstyle, size } = props

  if (size === 'default') defaultstyle += ' w-52'
  if (size === 'full') defaultstyle += ' w-full'

  return (
    <button
      {...props}
      className={`${defaultstyle} border-1 border-green-500 bg-green-700 text-white text-2xl hover:bg-green-800 shadow-md shadow-gray-400`} >
      {iconleft}
      <span className="text-center my-auto">{children}</span>
      {iconright}
    </button>
  )
}
export function ProceedButton(props: ButtonProps) {
  let { children, iconright, iconleft, defaultstyle, size } = props

  if (size === 'default') defaultstyle += ' w-52'
  if (size === 'full') defaultstyle += ' w-full'

  return (
    <button
      {...props}
      className={`${defaultstyle} border-2 border-green-900 text-black text-xl px-6`} >
      {iconleft}
      <span className="text-center my-auto">{children}</span>
      {iconright}
    </button>
  )
}
export function CancelButton(props: ButtonProps) {
  let { children, iconright, iconleft, defaultstyle, size } = props

  if (size === 'default') defaultstyle += ' w-52'
  if (size === 'full') defaultstyle += ' w-full'

  return (
    <button
      {...props}
      className={`${defaultstyle} bg-red-700 text-white text-xl`} >
      {iconleft}
      <span className="text-center my-auto">{children}</span>
      {iconright}
    </button>
  )
}
