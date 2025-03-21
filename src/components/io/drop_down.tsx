import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dropDownState, windowSizeState } from '@/atom/global.ts'
import { getClassNames } from '@/util/function/common.ts'

type DropDownProps = {
  children?: React.ReactNode
  className?: string
  /** 같은 name 의 DropDown 간에는 active 상태를 공유합니다. */
  name?: string
  icon?: React.ReactNode
  /** default: 0 */
  offsetX?: number
  /** default: 5 */
  offsetY?: number
  // onClick?: () => void
  onActive?: () => void
  onInactive?: () => void
}

const DropDown = (props: DropDownProps) => {
  const { offsetX = 0, offsetY = 5 } = props
  const windowSize = useRecoilValue(windowSizeState)
  const [activeDropDownNames, setActiveDropDownNames] = useRecoilState(dropDownState)
  const id = useId()

  const buttonRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [positionX, setPositionX] = useState<'left' | 'right'>('left')
  const [positionY, setPositionY] = useState<'top' | 'bottom'>('bottom')

  const name = props.name ? props.name : id
  const active = activeDropDownNames[name] === id
  const dropDownBoxClassName = getClassNames('drop_down_box', props, 'className')
  const rerenderKey = `${positionX}_${positionY}`

  useEffect(() => {
    if (active) props.onActive?.()
    else props.onInactive?.()
  }, [active])

  const positionHandler = useCallback(
    (node: HTMLDivElement | null) => {
      if (node === null) return

      const { innerWidth, innerHeight } = windowSize
      const buttonRect = buttonRef.current?.getClientRects().item(0)
      const buttonHeight = buttonRect?.height ?? 0
      const buttonLeft = buttonRect?.left ?? 0
      const buttonBottom = buttonRect?.bottom ?? 0

      const contentRect = contentRef.current?.getClientRects().item(0)
      const contentWidth = contentRect?.width ?? 0
      const contentHeight = contentRect?.height ?? 0

      if (buttonLeft + contentWidth + offsetX > innerWidth) {
        node.style.left = 'unset'
        node.style.right = `${offsetX}px`
        setPositionX('right')
      } else {
        node.style.left = `${offsetX}px`
        node.style.right = 'unset'
        setPositionX('left')
      }
      if (buttonBottom + contentHeight + offsetY > innerHeight) {
        node.style.top = 'unset'
        node.style.bottom = `${buttonHeight + offsetY}px`
        setPositionY('top')
      } else {
        node.style.top = `${buttonHeight + offsetY}px`
        node.style.bottom = 'unset'
        setPositionY('bottom')
      }

      node.style.opacity = '1'
    },
    [windowSize]
  )

  return (
    <div className={dropDownBoxClassName}>
      {active && (
        <div
          className='dim prevent_scroll'
          onClick={() => {
            setActiveDropDownNames({})
          }}
        ></div>
      )}
      <div
        className='icon'
        ref={buttonRef}
        onClick={() => {
          // props.onClick?.()
          setActiveDropDownNames((prev) => ({
            ...prev,
            ...{ [name]: prev[name] === id ? undefined : id },
          }))
        }}
      >
        {props.icon}
      </div>
      {active && (
        <div key={rerenderKey} className='content_wrapper' ref={positionHandler}>
          <div className='content' ref={contentRef}>
            {props.children}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropDown
