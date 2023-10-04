import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

interface IVisibleComponentsContext {
  isNavVisible: boolean
  setIsNavVisible: Dispatch<SetStateAction<boolean>>

  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>

}

const VisibleComponentsContext = createContext<IVisibleComponentsContext>(null!)

export function VisibleComponentsProvider({children}: {children: ReactNode}){
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  return(
    <VisibleComponentsContext.Provider value={{isNavVisible, setIsNavVisible, isOpenModal, setIsOpenModal}}>
      {children}
    </VisibleComponentsContext.Provider>
  )
}

export const useVisibleComponentsContext = () => useContext(VisibleComponentsContext)