'use client'
import { ImageType } from "@/types/image.types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

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
    <div>
      <div
        onClick={handleClickPreview}
      >
        <img src={imagePreview} alt="Imagem Preview" width={100} height={100} />
      </div>
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