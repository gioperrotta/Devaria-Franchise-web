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
        <Button> Entrar</Button>
        <Button iconleft={<CheckCircle size={32}/>}> Entrar</Button>
        <Button size='small'> Entrar</Button>
        <Button size='small' variant='transparent' iconleft={<CheckCircle size={32}/>}>Transparente</Button>
        <Button variant='submit' iconleft={<CheckCircle size={32}/>}>Submit</Button>
        <Button variant='proceed' iconleft={<CheckCircle size={32}/>}>Avançar</Button>
        <Button variant='cancel' iconleft={<CheckCircle size={32}/>}>Cancelar</Button>
      </div>
      <button
        onClick={() => setIsOpenModal(true)}
        className="bg-red-400 p-4 mt-20"
      >Abrir Modal</button>
      <Modal title="Teste teste teste" isOpen={isOpenModal} setIsOpen={setIsOpenModal}  >
        <div className="w-96 h-72">
          <h1> DENTRO DO MODAL   aaaaaaaaaaaaaaaaaaa</h1>
          <h1> DENTRO DO MODAL</h1><h1> DENTRO DO MODAL</h1><h1> DENTRO DO MODAL</h1>
        </div>
      </Modal>

      <button
        onClick={MostrarLoader}
        className="bg-red-400 p-4 mt-20"
      >Abrir Loader</button>
      <Spinner isOpen={isLoading} />

    </div>
  )
}