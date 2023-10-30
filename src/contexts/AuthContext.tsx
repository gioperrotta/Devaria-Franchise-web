'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { getUserInformationByAPI, getUserInformationByCookies, setUserInformationCookies } from '@/services/userService'
import { parseCookies, setCookie } from 'nookies'
import { MAX_AGE, setApiBearerToken } from '@/services/api'

type User = {
  id: string
  name: string
  email: string
  avatarUrl: string
} | null

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  userAuthenticated: User
  setUserTokenCookies: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState('')
  const [userAuthenticated, setUserAuthenticated] = useState<User | null>(null)

  useEffect(() => {
    setUserTokenCookies()
    const { 'nextauth.Franchise.userToken': userToken } = parseCookies()
    if (userToken) {
      setToken(userToken)
      setApiBearerToken(userToken)
    }
    const { 'nextauth.Franchise.userName': userName } = parseCookies()
    if (userName) {
      const user = getUserInformationByCookies()
      setUserAuthenticated(user)
    }
   
  }, [])

  async function setUserTokenCookies() {

    const session: any = await getSession()
    if (session?.token) {
      const sessionToken = session.token
      setToken(sessionToken)
      setCookie(undefined, 'nextauth.Franchise.userToken', sessionToken, { MAX_AGE })
      setApiBearerToken(sessionToken)
      const user = await getUserInformationByAPI();
      if (user) {
        setUserInformationCookies(user)
        setUserAuthenticated(user)
      } 
    }
  }
  return (
    <AuthContext.Provider value={{ userAuthenticated, setUserTokenCookies }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);
