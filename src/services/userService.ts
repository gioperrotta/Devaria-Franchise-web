import { parseCookies, setCookie } from 'nookies';
import { api } from './api';

interface CredentialsType {
  email?: string
  password?: string
}

export interface UserType {
  id: string
  email: string
  name: string
  avatar_url: string
  role_level: number
}

const MAX_AGE = 60 * 60 * 5 // 5 hours


export async function userLogin(credentials: CredentialsType) {
  const response = await api.post('/login', credentials)
  return response
}

export async function getUserInformation(): Promise<UserType | null> {
  const { 'nextauth.Franchise.userName': userName } = parseCookies()
  let user: UserType
  if (!userName) {
    const response = await api.get('/user/me')
    const { data, status } = response
    if (data && status === 200) {
      user = {
        id: data.id,
        email: data.email,
        avatar_url: 'https://github.com/gioperrotta.png',
        name: data.name,
        role_level: data.role.level
      }
      return user
    } else return null
  } else {
    const { 'nextauth.Franchise.userId': userId } = parseCookies()
    const { 'nextauth.Franchise.userEmail': userEmail } = parseCookies()
    const { 'nextauth.Franchise.userAvatar': userAvatar } = parseCookies()
    const { 'nextauth.Franchise.userRoleLevel': userRoleLevel } = parseCookies()
    user = {
      id: userId,
      name: userName,
      email: userEmail,
      avatar_url: userAvatar,
      role_level: Number(userRoleLevel)
    }
    return user
  }
}

export async function setUserInformationCookies(token: string) {
  const { 'nextauth.Franchise.userToken': userToken } = parseCookies()
  const { 'nextauth.Franchise.userName': userName } = parseCookies()
  const maxAge = MAX_AGE

  if (!userToken) {
    setCookie(undefined, 'nextauth.Franchise.userToken', token, { maxAge })
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  } else {
    api.defaults.headers['Authorization'] = `Bearer ${userToken}`
  }

  if (!userName) {
    try {
      const result = await getUserInformation()
      if (result) {
        setCookie(undefined, 'nextauth.Franchise.userId', result.id, { maxAge })
        setCookie(undefined, 'nextauth.Franchise.userName', result.name, { maxAge })
        setCookie(undefined, 'nextauth.Franchise.userEmail', result.email, { maxAge })
        setCookie(undefined, 'nextauth.Franchise.userAvatar', result.avatar_url, { maxAge })
        setCookie(undefined, 'nextauth.Franchise.userRoleLevel', result.role_level.toString(), { maxAge })
      }
    } catch (error) {
    }
  }
}