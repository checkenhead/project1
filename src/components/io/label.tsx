import React, { CSSProperties } from 'react'
import { FLEX_ATTR_PRESET } from '@/util/constance/class_name.ts'
import { getClassNames } from '@/util/function/common.ts'

type LabelProps = {
  children?: React.ReactNode
  id?: string
  className?: string
  for?: string
  onClick?: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void

  /** default: "row" */
  direction?: 'row' | 'column'
  /** default: "center" */
  xAlign?: 'center' | 'start' | 'end'
  /** default: "center" */
  yAlign?: 'center' | 'start' | 'end'
  gap?: string
  padding?: string
  /** default: auto */
  width?: string
  /** default: auto */
  height?: string
  /** default: false */
  disabled?: boolean
  /** default: false */
  pointer?: boolean
}

const Label = (props: LabelProps) => {
  const {
    direction = 'row',
    xAlign = 'center',
    yAlign = 'center',
    gap = '0',
    padding = '0',
    width = 'auto',
    height = 'auto',
  } = props

  const style = {
    flexDirection: direction,
    justifyContent: direction === 'row' ? FLEX_ATTR_PRESET[xAlign] : FLEX_ATTR_PRESET[yAlign],
    alignItems: direction === 'row' ? FLEX_ATTR_PRESET[yAlign] : FLEX_ATTR_PRESET[xAlign],
    gap,
    padding,
    width,
    height,
  } as CSSProperties

  const labelClassName = getClassNames('label', props, 'className', 'disabled', 'pointer')

  return (
    <label className={labelClassName} id={props.id} htmlFor={props.for} onClick={props.onClick} style={style}>
      {props.children}
    </label>
  )
}

export default Label
