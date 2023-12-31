'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


import LogoA21 from '../../../public/images/A21-Logo-500.png'


import { Alert, Button, InputBox, Spinner } from '@/components'


import { useAuthContext } from '@/contexts'

const LoginSchema = z.object({
  email: z.string().nonempty({
    message: 'O e-mail é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }).toLowerCase(),
  password: z.string().nonempty({
    message: 'A senha é obrigatória',
  }).min(6, {
    message: 'A senha precisa ter no mínimo 6 caracteres',
  }),
})

interface SessionProps {
  id: string
  email: string
  name: string
  token: string
}

type LoginData = z.infer<typeof LoginSchema>

export default function Login() {
  const [message, setMessage] = useState('')
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const { setUserTokenCookies } = useAuthContext()

  const router = useRouter()

  const userLoginForm = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  })

  async function userLogin({ email, password }: LoginData) {
    try {
      setIsLoading(true)
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setIsLoading(false)
        if (result?.error.includes('ECONNREFUSED')) {
          setMessage(`Erro de conexão com o servidor - ${result?.error}`)
        } else {
          setMessage('Usuário ou senha incorretos verifique.')
        }
        setIsAlertErrorOpen(true)
        return
      }

      setUserTokenCookies()

      setIsLoading(false)
      router.replace('/dashboard')
    } catch (error) {
      setIsLoading(false)
      setMessage(`CATCH ERROR => ${error}`)
      setIsAlertErrorOpen(true)
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control
  } = userLoginForm



  return (
    <div className="min-h-screen flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-gray-800 text-gray-100 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-40 w-auto"
          src={LogoA21}
          alt="Logo Armazem 21"
          priority
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...userLoginForm}>
          <form className="space-y-6" onSubmit={handleSubmit(userLogin)}>
            <InputBox disabled={isSubmitting} theme='dark' onFocus={() => setMessage('')} type='text' field='email' label='E-mail' />
            <InputBox disabled={isSubmitting} theme='dark' onFocus={() => setMessage('')} type='password' field='password' label='Senha' />
            <Button variant='submit' size='full' >Entrar</Button>
          </form>
        </FormProvider>

      </div>
      <Alert
        isOpen={isAlertErrorOpen}
        setOpen={setIsAlertErrorOpen}
        title='Erro ao tentar fazer login'
        message={message}
      />
      <Spinner isOpen={isLoading} />
    </div>
  )
}
