'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Alert, Button, InputBox, Spinner, UploadImage } from '@/components'

import { ImageType } from '@/types/image.types'
import DeafultAvatar from '../../../../../public/images/default-user-avatar.png'

import { useAuthContext } from '@/contexts'
import { updateUserProfile, } from '@/services/userService'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 500 * 1024  // 500K


const EditProfileSchema = z.object({
  name: z.string()
  .nonempty({message: 'O nome é obrigaório'})
  .min(2, { message: 'O nome precisa ter no mínimo 2 caracteres'}),
})

type EditProfileData = z.infer<typeof EditProfileSchema>

export default function EditProfile() {
  const [message, setMessage] = useState('')
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { userAuthenticated } = useAuthContext()
  const initialAvatar : ImageType = {
    preview: userAuthenticated?.avatarUrl || DeafultAvatar.src,
    file: null
  } 
  const [image, setImage] = useState<ImageType>(initialAvatar);

  const router = useRouter()

  const editProfileForm = useForm<EditProfileData>({
    resolver: zodResolver(EditProfileSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
    reset
  } = editProfileForm
  
  const handleReset = () => reset()

  async function onSubmit(data: EditProfileData) {
    try {
      const requestData = new FormData()
         requestData.append('name', data.name)
      if (image?.file) {
        requestData.append('file', image.file)
      }
 
      console.log('ESTOU em on Submit requestData=>',requestData)

      if (userAuthenticated?.id) {
        updateUserProfile(userAuthenticated?.id, requestData)
      }


     
      // 
      // const result = await changeUserPassword({ password, newPassword })
      // if (result.status === 200) {
      //   setIsLoading(false)
      //   setMessage('Sua senha foi alterada com sucesso')
      //   setIsAlertErrorOpen(true)
      //   handleReset()
      // }
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
        <h1 className='block text-gray-50 text-xl font-semibold mt-4'>
          Alterar seus dados
        </h1>
        <FormProvider {...editProfileForm}>
          <form onSubmit={handleSubmit(onSubmit)} className='my-10 w-8/12 flex flex-col gap-4 ' >
            <div className='w-full flex justify-center mb-6'>
              <div className='border-4 w-32 h-32 rounded-full overflow-hidden border-green-500'>
                <UploadImage
                  setImage={setImage}
                  imagePreview={image.preview}
                />
              </div>
            </div>
              
            <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='name' label='Nome do usuário' />
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