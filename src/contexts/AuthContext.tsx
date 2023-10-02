'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { getUserInformation, setUserInformationCookies } from '@/services/userService'

type User = {
  name: string
  email: string
  avatar_url: string
} | null

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  token: string
  userAuthenticated: User
  isAuthenticated: boolean
  getUserToken: Promise<string | null>
  setUserInformation: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [userAuthenticated, setUserAuthenticated] = useState<User | null>(null)
  const [token, setToken] = useState('')

  const isAuthenticated = !!userAuthenticated

  const getUserToken = new Promise<string | null>(async (resolve, reject) => {
    const session: any = await getSession()
    resolve(session?.token)
  })

  function setUserInformation() {
    getUserToken.then((token) => {
      if (token) {
        setUserInformationCookies(token)
        setToken(token)
        if (!userAuthenticated) {
          const user = getUser();
        }
      }
    })
  }

 async function getUser<User>() {
    try {
      const user = await getUserInformation()
      if (user) {
        setUserAuthenticated(user)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getUserToken.then((token) => {
      if (token) {
        setUserInformationCookies(token)
        setToken(token)
        if (!userAuthenticated) {
          const user = getUser();
        }
      }
    })
  }, [])



  return (
    <AuthContext.Provider value={{ userAuthenticated, isAuthenticated, token, getUserToken, setUserInformation }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuthContext = () => useContext(AuthContext);
