import { Modal, Button } from '@/components'
import {ArrowLeft} from '@phosphor-icons/react'

interface AlertProps {
  title?: string
  isOpen: boolean
  setIsOpen: (o: boolean) => void
  message?: string
}

export function Alert({title, isOpen, setIsOpen, message}: AlertProps) {
  return (
    <Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='w-72 h-40 py-5 px-2 flex flex-col items-center justify-between'>
        <h1>{message}</h1>
        <div className='px-10 mb-4'>
          <Button onClick={() => setIsOpen(false)} variant='proceed' size='small' iconleft={<ArrowLeft size={32}/>}>Voltar</Button>
        </div>
      </div>
    </Modal>
  )
}