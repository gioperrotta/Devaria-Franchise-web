'use client'
import { useState } from 'react'

import { Button, InputBox, Modal } from '@/components'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { changeUserPassword } from '@/services/userService'

interface ChangePasswordProps {
  isOpen: boolean
  setOpen: (o: boolean) => void
}

const ChangePasswordSchema = z.object({
  password: z.string()
    .nonempty({ message: 'A senha é obrigatória', })
    .min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' }),
  newPassword: z.string()
    .nonempty({ message: 'A senha é obrigatória', })
    .min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' }),
  confirmNewPassword: z.string()
    .nonempty({ message: 'Confirmação da senha é obrigatória', })
})
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: 'Confirmação da senha inválida',
    path: ['confirmNewPassword']
  })

type ChangePasswordData = z.infer<typeof ChangePasswordSchema>

export function ChangePassword({ isOpen, setOpen }: ChangePasswordProps) {
  const [message, setMessage] = useState('')

  const changePasswordForm = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  async function changePassword({ password, newPassword, confirmNewPassword }: ChangePasswordData) {
    try {
      const result =  await changeUserPassword({password, newPassword})
      if (result.status === 200) {
        alert('TROCA EFETUADA COM SUCESSO')
      }
    } catch (error) {
      alert(error)

    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control
  } = changePasswordForm

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title='Trocar sua senha'>
      <div className='w-96 flex justify-center bg-gray-200 text-gray-200 rounded-b-2xl'>
        <FormProvider {...changePasswordForm}>
          <form onSubmit={handleSubmit(changePassword)} className='my-10 w-8/12 flex flex-col gap-8 ' >
            <InputBox disabled={false} onFocus={() => setMessage('')} type='password' field='password' label='Senha' />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='password' field='newPassword' label='Nova senha' />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='password' field='confirmNewPassword' label='Confirme a nova senha' />
            <div className='flex items-center justify-center mt-10'>
              <Button variant='submit' size='default'>Enviar</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  )
}