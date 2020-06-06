import React from "react"
import { Emitter } from "mitt"

export interface MittContextType {
  emitter: Emitter
}

export declare const MittProvider: React.FC
export declare const useMitt: () => MittContextType
