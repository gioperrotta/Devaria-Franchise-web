'use client'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, InputBox } from '@/components'
import { useCep } from './useCep'

export default function CepForm() {
  const [message, setMessage] = useState('')

const {cepForm, handleSubmit, handleFormSubmit}  = useCep()
  return (
    <div className='py-6 flex flex-col items-center justify-center'>
      <div className="w-96 flex flex-col items-center gap-3">
        <h1 className="text-green-950 text-5xl">C E P</h1>
        <FormProvider {...cepForm}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='my-10 w-8/12 flex flex-col gap-4 ' >
            <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='zipCode' label='CEP' maxLength={9} />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='street' label='Rua, Praça ou Avenida' />
            <div className='flex items-center gap-4'>
              <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='number' label='Número' />
              <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='complement' label='Complemento' />
            </div>

            <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='district' label='Bairro' />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='city' label='Cidade' />
            <InputBox disabled={false} onFocus={() => setMessage('')} type='text' field='state' label='Estado' />
            <div className=' flex items-center justify-center mt-7 gap-3'>
              <div className='bg-gray-200 rounded-md w-full'>
                <Button type='button' variant='proceed' size='full'>Voltar</Button>
              </div>
              <div className='w-full'>
                <Button type='submit' variant='submit' size='full'>Enviar</Button>
              </div>
            </div>
          </form>
        </FormProvider>

      </div>

    </div>
  )
}


