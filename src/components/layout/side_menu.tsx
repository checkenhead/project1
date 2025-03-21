import Icon, { IconType } from '@/components/common/icon'
import useUserManager from '@/hooks/user/useUserManager'
import React, { useState } from 'react'
import { Card } from '@/components/layout/card'

type WrapperProps = {
  children?: React.ReactNode
}
const Wrapper = (props: WrapperProps) => {
  const { logout } = useUserManager()

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100dvh',
        width: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '2rem 0',
      }}
    >
      {props.children}
    </div>
  )
}

type ItemProps = {
  icon: IconType
  strokeAnimation?: boolean
  rotateAnimation?: boolean
  /** default: "10%" */
  borderRadius?: string
  description?: string
  onClick?: () => void
}
const Item = (props: ItemProps) => {
  const { borderRadius = '10%' } = props
  const [focused, setFocused] = useState<boolean>(false)
  const style = focused ? { width: '5rem', height: '5rem' } : { width: '3rem', height: '3rem' }

  return (
    <div
      style={{
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
        // marginBottom: '0.5rem',
      }}
    >
      <div
        style={{
          transition: 'all 0.2s ease',
          borderRadius: '50%',
          cursor: 'pointer',
          ...style,
        }}
        onMouseEnter={(e) => {
          setFocused(true)
        }}
        onMouseLeave={(e) => {
          setFocused(false)
        }}
        onClick={() => {
          props.onClick?.()
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius,
            // border: '1px solid #aaaaaa',
            overflow: 'hidden',
            // backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            type={props.icon}
            strokeAnimation={props.strokeAnimation}
            rotateAnimation={props.rotateAnimation}
            width='100%'
            height='100%'
          />
        </div>
      </div>

      <Card.Transition>
        {focused ? (
          <div
            style={{
              width: '100px',
              fontWeight: '600',
            }}
          >
            {props.description}
          </div>
        ) : undefined}
      </Card.Transition>
    </div>
  )
}

const SideMenu = {
  Wrapper,
  Item,
}
export default SideMenu
