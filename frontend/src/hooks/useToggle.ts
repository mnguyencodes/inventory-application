import { useState } from 'react'
import { useEffectOnUpdate } from './useEffectOnUpdate'

type toggleParams = {
  initialValue: boolean
  onToggle: () => void
}

export default function useToggle({
  initialValue = false,
  onToggle = () => {},
}: toggleParams) {
  const [on, setOn] = useState(initialValue)

  useEffectOnUpdate(onToggle, [on])

  function toggle() {
    setOn((prevOn) => !prevOn)
  }
  return [on, toggle]
}
