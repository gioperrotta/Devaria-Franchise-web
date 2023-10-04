'use client'
import { useState } from "react";
import { Modal, Button, Spinner } from "@/components";

import { CheckCircle } from '@phosphor-icons/react'

export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function MostrarLoader() {
    setIsLoading(true)
    setTimeout(()=> {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="text-blue-950 py-6 flex flex-col items-center justify-center">
      <div className="w-96 flex flex-col items-center gap-3">
        <h1 className="text-green-950 text-5xl">DASHBOARD</h1>
        <Button variant='submit' iconleft={<CheckCircle size={32}/>}>Submit</Button>
        <Button variant='proceed' iconleft={<CheckCircle size={32}/>}>Avançar</Button>
        <Button variant='cancel' iconleft={<CheckCircle size={32}/>}>Cancelar</Button>
      </div>
    </div>
  )
}