'use client'
import { ImageType } from '@/types/image.types'
import { Dispatch,  SetStateAction, useRef } from 'react'

import { Camera } from '@phosphor-icons/react'

interface UploadImageProps {
  imagePreview: any
  setImage: Dispatch<SetStateAction<ImageType>>
}


export function UploadImage({ imagePreview, setImage }: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleClickPreview() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onloadend = () => {
        const result = fileReader.result
        if (typeof result === 'string') {
          setImage({
            preview: result,
            file
          })
        }
      }
    }
  }

  return (
      <div
        className='relative w-ful h-full '
      >
        <img className='w-full h-full object-cover' src={imagePreview} alt="Imagem Preview"  />
        <Camera
          size={28}
          className='hover:cursor-pointer absolute bottom-0 right-6 text-green-800'
          onClick={handleClickPreview}
        />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      </div>
  )
}

