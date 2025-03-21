import { Children, isValidElement, JSXElementConstructor, ReactNode, useRef } from 'react'

export const useChildrenValidator = (
  children: ReactNode,
  ...allowComponents: Array<string | JSXElementConstructor<any>>
) => {
  const childrenArray = useRef(Children.toArray(children))
  const isValid = useRef(
    childrenArray.current.every(
      (child) => isValidElement(child) && allowComponents.some((component) => component === child.type)
    )
  )

  const getValidChildren = () => {
    if (isValid.current) return children
    else return null
  }

  const getValidChildrenToArray = () => {
    if (isValid.current) return childrenArray.current
    else return null
  }

  const childrenValidator = {
    onError(callbackFn: () => void) {
      if (!isValid.current) callbackFn()
      return this
    },
    getChildren: Object.assign(getValidChildren, { toArray: getValidChildrenToArray }),
  }

  return { childrenValidator }
}
