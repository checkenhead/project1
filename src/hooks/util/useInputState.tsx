import { useCallback } from 'react'
import useCustomState from '@/hooks/util/useCustomState'

// export type InputStateType<T extends Record<string, unknown>> = { [P in keyof T]: T[P] }
export type InputStateType<T> = { [P in keyof T]: T[P] }

const useInputState = <T,>(initState: InputStateType<T>) => {
  const [input, validation] = useCustomState(initState)

  const onChange = useCallback(<K extends Extract<keyof T, string>>(name: K, value: T[K]) => {
    return input.setState((prev) => ({ ...prev, [name]: value }))
  }, [])

  return [{ ...input, onChange }, validation] as const
}

export default useInputState
