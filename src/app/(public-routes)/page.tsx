'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


import LogoA21 from '../../../public/images/A21-Logo-500.png'


import {Alert,  Button, InputBox, Spinner } from '@/components'


import { useAuthContext } from '@/contexts'

import { SignIn } from '@phosphor-icons/react'

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
  const { setUserTokenCookies } = useAuthContext()
  
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)


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
        setIsAlertErrorOpen(true)
        return
      }

      setUserTokenCookies()

      setIsLoading(false)
      router.replace('/dashboard')
    } catch (error) {
      console.log('Login error => ', error)
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
            <InputBox disabled={isSubmitting} onFocus={() => setMessage('')} type='text' field='email' label='E-mail' />
            <InputBox disabled={isSubmitting} onFocus={() => setMessage('')} type='password' field='password' label='Senha' />
            <Button variant='submit' size='full' iconright={<SignIn size={32}/>}>Entrar</Button>
          </form>
        </FormProvider>
  
      </div>
      <Alert
          isOpen={isAlertErrorOpen}
          setIsOpen={setIsAlertErrorOpen}
          title='Erro ao tentar fazer login'
          message='Usuário, E-mail ou Senha inválidos !' 
        />
        <Spinner isOpen={isLoading} />
    </div>
  )
}
