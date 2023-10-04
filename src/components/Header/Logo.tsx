import Image from 'next/image'
import LogoImg from '../../../public/images/A21_Horizontal_100.png'

export function Logo() {
  return (
    <div className="flex-shrink-0 ">
      <Image
        className="h-auto w-52"
        src={LogoImg}
        alt='Logo A21'
        priority
      />
    </div>
  )
}