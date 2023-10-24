import { parseCookies, setCookie } from 'nookies';
import { externalAPI, MAX_AGE } from './api';

interface CredentialsType {
  email?: string
  password?: string
}

export interface UserType {
  id: string
  email: string
  name: string
  avatarUrl: string
  role_level: number
}

interface ChangePasswordType {
  password: string
  newPassword: string
}

export async function userLogin(credentials: CredentialsType) {
  const response = await externalAPI.post('/login', credentials)
  return response
}

export async function changeUserPassword({ password, newPassword }: ChangePasswordType) {
  const response = await externalAPI.patch('user/change-password', { password, newPassword })
  return response
}


export function getUserInformationByCookies() {
  const { 'nextauth.Franchise.userName': userName } = parseCookies()
  const { 'nextauth.Franchise.userId': userId } = parseCookies()
  const { 'nextauth.Franchise.userEmail': userEmail } = parseCookies()
  const { 'nextauth.Franchise.userAvatar': userAvatar } = parseCookies()
  const { 'nextauth.Franchise.userRoleLevel': userRoleLevel } = parseCookies()
  const user = {
    id: userId,
    name: userName,
    email: userEmail,
    avatarUrl: userAvatar,
    role_level: Number(userRoleLevel)
  }
  return user
}

export async function getUserInformationByAPI(): Promise<UserType | null> {
  const response = await externalAPI.get('/user/me')
  const { data, status } = response
  if (data && status === 200) {
    const user = {
      id: data.id,
      email: data.email,
      avatarUrl: `${process.env.NEXT_PUBLIC_URL_AVATRS}${data.avatarUrl}`,
      name: data.name,
      role_level: data.role.level
    }
    return user
  }
  return null
}

export function setUserInformationCookies(user: UserType) {
  setCookie(undefined, 'nextauth.Franchise.userId', user.id, { MAX_AGE })
  setCookie(undefined, 'nextauth.Franchise.userName', user.name, { MAX_AGE })
  setCookie(undefined, 'nextauth.Franchise.userEmail', user.email, { MAX_AGE })
  setCookie(undefined, 'nextauth.Franchise.userAvatar', user.avatarUrl, { MAX_AGE })
  setCookie(undefined, 'nextauth.Franchise.userRoleLevel', user.role_level.toString(), { MAX_AGE })
}



