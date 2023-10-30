'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Alert, Button, InputBox, Spinner } from '@/components'
import { changeUserPassword } from '@/services/userService'

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

export default function ChangePassword() {
  const [message, setMessage] = useState('')
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const changePasswordForm = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
    reset
  } = changePasswordForm

  const handleReset = () => reset()

  async function onSubmit({ password, newPassword, confirmNewPassword }: ChangePasswordData) {
    try {
      setIsLoading(true)
      const result = await changeUserPassword({ password, newPassword })
      if (result.status === 200) {
        setIsLoading(false)
        setMessage('Sua senha foi alterada com sucesso')
        setIsAlertErrorOpen(true)
        handleReset()
      }
    } catch (error) {
      setIsLoading(false)
      setMessage(`Erro ao conectar com o servidor - ${error}`)
      setIsAlertErrorOpen(true)
    }
  }

  function handleCancel() {
    handleReset()
    router.back()
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-96 flex flex-col items-center mt-10 bg-gray-700 text-gray-200 rounded-2xl'>
        <h1 className='block text-gray-50 text-xl font-semibold mt-4'>Alteração de Senha</h1>
        <FormProvider {...changePasswordForm}>
          <form onSubmit={handleSubmit(onSubmit)} className='my-10 w-8/12 flex flex-col gap-4 ' >
            <InputBox disabled={false} onFocus={() => setMessage('')} type='password' field='password' label='Senha' />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='password' field='newPassword' label='Nova senha' />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='password' field='confirmNewPassword' label='Confirme a nova senha' />
            <div className=' flex items-center justify-center mt-7 gap-3'>
              <div className='bg-gray-200 rounded-md w-full'>
                <Button type='button' onClick={handleCancel} variant='proceed' size='full'>Voltar</Button>
              </div>
              <div className='w-full'>
                <Button type='submit' variant='submit' size='full'>Enviar</Button>
              </div>
            </div>
          </form>
        </FormProvider>
        <Alert
          isOpen={isAlertErrorOpen}
          setOpen={setIsAlertErrorOpen}
          title='Erro ao tentar trocar a senha'
          message={message}
        />
        <Spinner isOpen={isLoading} />
      </div>
    </div>
  )
}