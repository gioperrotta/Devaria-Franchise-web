import Link from 'next/link'
import { NavMobileItem, NavProfile } from '@/components'


export function NavMobile() {
  return (
        <div className='w-96 bg-black flex lg:hidden flex-col justify-center gap-1 px-4 pt-4 rounded-b-md'>
          <NavMobileItem to="/dashboard">Dashboard</NavMobileItem>
          <NavMobileItem to="/products">Produtos</NavMobileItem>
          <NavMobileItem to="/franchises">Franquias</NavMobileItem>
          <NavMobileItem to="/customers">Clientes</NavMobileItem>
          <NavProfile />
        </div>
  )
}