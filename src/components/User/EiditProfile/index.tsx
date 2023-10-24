'use client'
import { useState } from 'react'
import { SignIn } from '@phosphor-icons/react'

import { Button, InputBox, Modal, UploadImage } from '@/components'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import DeafultAvatar from '../../../../public/images/default-user-avatar.png'
import { File } from 'buffer'
import { ImageType } from '@/types/image.types'

interface ChangePasswordProps {
  isOpen: boolean
  setOpen: (o: boolean) => void
}

const ChangePasswordSchema = z.object({
  name: z.string().nonempty({
    message: 'O nome é obrigaório',
  }).min(2, {
    message: 'O nome precisa ter no mínimo 2 caracteres',
  }),
})

type ChangePasswordData = z.infer<typeof ChangePasswordSchema>

export function EditProfile({ isOpen, setOpen }: ChangePasswordProps) {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<ImageType>({
    preview: null,
    file: null
  });

  
  const changePasswordForm = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title='Alterar dados do perfil'>
      <div className='w-96 flex justify-center bg-gray-200 text-gray-950 rounded-b-2xl'>
        <FormProvider {...changePasswordForm}>
          <form className='my-10 w-8/12 flex flex-col gap-8 ' >
            <UploadImage
              setImage={setImage}
              imagePreview={image?.preview || DeafultAvatar.src}
            />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='name' label='Nome do usuário' />
            <div className='flex items-center justify-center mt-10'>
              <Button variant='submit' size='default' >Enviar</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  )
}