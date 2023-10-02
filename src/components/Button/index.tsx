'use client'
import { ButtonHTMLAttributes, useState } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  label: string
}

export function Button(props: ButtonProps) {
  const {color, label} = props
  const classButton = `${color} hover:opacity-100 cursor-pointer flex w-full justify-center rounded-md px-3 py-2.5 text-lg font-semibold leading-8 text-white`
  return (
    <button
       className={`tracking-widest opacity-80 ${classButton}` }
    {...props}
    >
      {label}
    </button>
  )
}