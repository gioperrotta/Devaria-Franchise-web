'use client'
import { NavItem, MobileDropdown, ProfileDropdown } from '@/components'

export function Nav() {
  return (
    <div className='flex '>
      <nav className='hidden lg:flex items-center gap-4'>
        <NavItem href='/dashboard'><span>Dashboard</span></NavItem>
        <NavItem href='/products'><span>Produtos</span></NavItem>
        <NavItem href='/franchises'><span>Franquias</span></NavItem>
        <NavItem href='/customers'><span>Clientes</span></NavItem>
        <NavItem href='/cep'><span>C E P</span></NavItem>
      </nav>
      <ProfileDropdown/>
      <MobileDropdown/>
    </div>
  )
}