import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

interface INavMobileContext {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const NavMobileContext = createContext<INavMobileContext>(null!)

export function NavMobileProvider({children}: {children: ReactNode}){
  const [isVisible, setIsVisible] = useState(false)
  return(
    <NavMobileContext.Provider value={{isVisible, setIsVisible}}>
      {children}
    </NavMobileContext.Provider>
  )
}

export const useNavMobileContext = () => useContext(NavMobileContext)