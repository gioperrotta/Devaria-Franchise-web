'use client'
import { useState } from 'react'
import { X as Close, List as Hamburguer } from '@phosphor-icons/react'

import { Dropdown } from '@/components'
import {  MobileItem } from './MobileItem'

export function MobileDropdown() {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
   return (
    <div className='blok lg:hidden'>
      <Dropdown.Header
        isVisible={isDropdownVisible}
        setVisible={setDropdownVisible}
        isInvisibleIcon={<Hamburguer size={28} />}
        isVisibleIcon={<Close size={28} />}
      >
        <Dropdown.Item><MobileItem setVisible={setDropdownVisible} to='/dashboard'><span>Dashboard</span></MobileItem></Dropdown.Item>
        <Dropdown.Item><MobileItem setVisible={setDropdownVisible} to='/products'><span>Produtos</span></MobileItem></Dropdown.Item>
        <Dropdown.Item><MobileItem setVisible={setDropdownVisible} to='/franchises'><span>Franquias</span></MobileItem></Dropdown.Item>
        <Dropdown.Item><MobileItem setVisible={setDropdownVisible} to='/customers'><span>Clientes</span></MobileItem></Dropdown.Item>
      </Dropdown.Header>
    </div>
  )
}