import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormSchema } from "./schema"
import { AddreessProps, FormData } from "./types"
import axios from "axios"

export const useCep = () => {

    const cepForm = useForm<FormData>({
      criteriaMode: 'all',
      mode: 'all',
      resolver: zodResolver(FormSchema),
    })

    const {
      handleSubmit,
      formState: { isSubmitting, errors },
      watch,
      setValue,
      control,
      reset,
    } = cepForm


    function zipCodeMask(zipCode: string): string {
      if (zipCode !== '') {
        const numberOnly = zipCode.replace(/[^\d]/g, '')
        return numberOnly.substring(0, 5) + '-' + numberOnly.substring(5, 10)
      }
      return zipCode
    }

    const handleFormSubmit = (data: FormData) => {
      console.log('handleFormSubmit data=>', data)
    }

    const handleSetDataAddreess = useCallback((data: AddreessProps) => {
      setValue('street', data.logradouro)
      setValue('district', data.bairro)
      setValue('city', data.localidade)
      setValue('state', data.uf)
    }, [setValue])

    const handleFetchAddreess = useCallback(async (zipCode: string) => {
      const numberOnly = zipCode.replace(/[^\d]/g, '')
      const cepAPI = axios.create({
        baseURL: process.env.NEXT_PUBLIC_CEP_API || 'https://viacep.com.br/ws',
      })
      const { data } = await cepAPI.get(`/${numberOnly}/json/`)
      handleSetDataAddreess(data)
    }, [handleSetDataAddreess])

    const zipCode = watch('zipCode')
    
    useEffect(() => {
      const zipCode = watch('zipCode')
      setValue('zipCode', zipCodeMask(zipCode))
      if (zipCode.length !== 9) return
      handleFetchAddreess(zipCode)
    }, [handleFetchAddreess, setValue, zipCode])

    return {
      cepForm,
      handleSubmit,
      handleFormSubmit,
    }

  }


