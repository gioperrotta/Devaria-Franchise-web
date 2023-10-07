'use client'
import {ProfileMenu } from '@/components'
import { useAuthContext } from '@/contexts/AuthContext'

import { SignOut, Swap, LockKey } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { destroyCookie } from 'nookies'

export function NavProfile() {

  const { userAuthenticated } = useAuthContext()
  const router = useRouter()

  console.log('ESTOU NavProfile userAuthenticated => ', userAuthenticated)

  async function logout() {
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

  return (
    <ProfileMenu.Header userName={userAuthenticated?.name} avatarUrl={userAuthenticated?.avatarUrl}>
      <ProfileMenu.Item icon={<Swap />} text='Editar Perfil' />
      <ProfileMenu.Item icon={<LockKey />} text='Alterar Senha' />
      <ProfileMenu.Item icon={<SignOut />} text='Sair do Aplicativo' onClick={logout} />
    </ProfileMenu.Header>
  )

}