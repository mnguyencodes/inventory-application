import {useEffect, useRef} from "react"

export function useEffectOnUpdate<Type>(effectFunction: CallableFunction, deps: Type[]) {
    const firstRender = useRef(true)
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            effectFunction()
        }
    }, deps)
}