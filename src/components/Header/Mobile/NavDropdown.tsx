'use client'
import { Dropdown } from '@/components'
import { X as Close, List as Hamburguer } from '@phosphor-icons/react'
import { Button, Item } from '@/components/Header/Mobile'
import { useNavMobileContext } from '@/contexts'

export function NavDropdown() {
  const { isVisible } = useNavMobileContext()
  return (
    <div className='blok lg:hidden'>
      <Dropdown.Header
        icon={isVisible ?
          (<Button><Close size={32} /></Button>
          ) : (
            <Button><Hamburguer size={32} /></Button>
          )}
      >
        <Dropdown.Item><Item to='/dashboard'><span>Dashboard</span></Item></Dropdown.Item>
        <Dropdown.Item><Item to='/products'><span>Produtos</span></Item></Dropdown.Item>
        <Dropdown.Item><Item to='/franchises'><span>Franquias</span></Item></Dropdown.Item>
        <Dropdown.Item><Item to='/customers'><span>Clientes</span></Item></Dropdown.Item>
      </Dropdown.Header>
    </div>
  )
}