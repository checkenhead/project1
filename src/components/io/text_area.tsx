import React, { useEffect, useId, useRef, useState } from 'react'
import Label from '@/components/io/label.tsx'
import { getClassNames } from '@/util/function/common.ts'

type TextAreaProps = {
  id?: string
  className?: string
  label?: React.ReactNode
  /** default: "top" */
  labelDirection?: 'column' | 'row'
  placeholder?: string
  name?: string
  value?: string | number
  valid?: boolean
  disabled?: boolean
  /** default: 2 */
  rows?: number
  maxRows?: number
  // onEnter?: (e: React.FormEvent<HTMLFormElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => void
}

const TextArea = (props: TextAreaProps) => {
  const {
    labelDirection = 'column',
    // rows = 2
  } = props
  const ref = useRef<HTMLTextAreaElement>(null)
  const [
    ,
    // focused
    setFocused,
  ] = useState<boolean>(false)

  const _id = useId()
  const id = props.id ? props.id : _id

  const boxStyle = {
    flexDirection: labelDirection,
    justifyContent: labelDirection === 'row' ? 'flex-start' : 'end',
    alignItems: labelDirection === 'row' ? 'center' : 'flex-start',
  }

  const classNames = { className: props.className, valid: props.valid === true, invalid: props.valid === false }
  const textAreaBoxClassName = getClassNames('textarea_box', classNames, 'className', 'valid', 'invalid')

  useEffect(() => {
    if (ref.current) {
      const rem = +getComputedStyle(document.documentElement).fontSize.replace('px', '')

      if (props.maxRows !== undefined) {
        ref.current.style.height = 'auto'
        ref.current.style.height =
          ((props.maxRows + 1) * rem < ref.current.scrollHeight
            ? (props.maxRows + 1) * rem
            : ref.current.scrollHeight) + 'px'
      } else {
        ref.current.style.height = 'auto'
        ref.current.style.height = ref.current.scrollHeight + 'px'
      }
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [props.value])

  return (
    <div className={textAreaBoxClassName} style={boxStyle}>
      {props.label && <Label for={id}>{props.label}</Label>}
      <textarea
        ref={ref}
        style={{ width: '100%', height: 'auto' }}
        className='textarea'
        id={id}
        // type={type}
        // rows={rows}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => {
          props.onChange?.(e)
        }}
        onFocus={(e) => {
          setFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          props.onBlur?.(e)
        }}
      />
    </div>
  )
}

export default TextArea
