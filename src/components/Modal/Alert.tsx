import { Modal, Button } from '@/components'
import {ArrowLeft} from '@phosphor-icons/react'

interface AlertProps {
  title?: string
  isOpen: boolean
  setOpen: (o: boolean) => void
  message?: string
}

export function Alert({title, isOpen, setOpen, message}: AlertProps) {
  return (
    <Modal title={title} isOpen={isOpen} setOpen={setOpen}>
      <div className='z-50 w-72 h-40 py-5 px-2 rounded-b-md bg-gray-200 text-black flex flex-col items-center justify-between'>
        <h1>{message}</h1>
        <div className='px-10 mb-4'>
          <Button onClick={() => setOpen(false)} variant='proceed' size='small' iconleft={<ArrowLeft size={18}/>}>Voltar</Button>
        </div>
      </div>
    </Modal>
  )
}