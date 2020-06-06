import React, { useContext } from "react"
import mitt, { Emitter } from "mitt"

const emitter: Emitter = mitt()

export interface MittContextType {
  emitter: Emitter
}

const MittContext = React.createContext<MittContextType>({ emitter })

export const MittProvider: React.FC = ({ children }) => {
  return (
    <MittContext.Provider value={{ emitter }}>{children}</MittContext.Provider>
  )
}

export const useMitt = (): MittContextType => useContext(MittContext)
