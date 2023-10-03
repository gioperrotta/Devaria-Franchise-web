'use client'
import { NavItem, NavDropdown, NavProfile } from '@/components'

export function Nav() {
  return (
    <div className='flex '>
      <nav className='hidden lg:flex items-center gap-4'>
        <NavItem href='/dashboard'><span>Dashboard</span></NavItem>
        <NavItem href='/products'><span>Produtos</span></NavItem>
        <NavItem href='/franchises'><span>Franquias</span></NavItem>
        <NavItem href='/customers'><span>Clientes</span></NavItem>
      </nav>
      <NavProfile />
      <NavDropdown/>
    </div>
  )
}