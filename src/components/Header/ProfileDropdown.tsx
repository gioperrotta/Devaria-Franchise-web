'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { SignOut, Swap, LockKey } from '@phosphor-icons/react'
import { destroyCookie } from 'nookies'

import { useAuthContext } from '@/contexts/AuthContext'

import { Dropdown} from '@/components'

export function ProfileDropdown() {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const { userAuthenticated } = useAuthContext()
  const router = useRouter()

  async function logout() {
    setDropdownVisible(false)
    await signOut({
      redirect: false
    })
    destroyCookie(null, 'nextauth.Franchise.userId')
    destroyCookie(null, 'nextauth.Franchise.userName')
    destroyCookie(null, 'nextauth.Franchise.userAvatar')
    destroyCookie(null, 'nextauth.Franchise.userEmail')
    destroyCookie(null, 'nextauth.Franchise.userRoleLevel')
    destroyCookie(null, 'nextauth.Franchise.userToken')
    router.replace('/')
  }

  function handleChangePassword() {
    setDropdownVisible(false)
    router.push('/users/change-password')
  }

  function handlEditProfile() {
    setDropdownVisible(false)
    router.push('/users/edit-profile')
  }

  return (
    <>
      <Dropdown.Header
        isVisible= {isDropdownVisible}
        setVisible={setDropdownVisible}
        headerText={userAuthenticated?.name}
        image={userAuthenticated?.avatarUrl}
      >
        <Dropdown.Item onClick={handlEditProfile}>{<Swap />}<span>Editar Perfil</span></Dropdown.Item>
        <Dropdown.Item onClick={handleChangePassword}>{<LockKey />} Alterar Senha</Dropdown.Item>
        <Dropdown.Item onClick={logout}>{<SignOut />} Sair do Aplicativo</Dropdown.Item>
      </Dropdown.Header>
    </>
  )
}