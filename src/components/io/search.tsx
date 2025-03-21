import React, { useId, useState } from 'react'
import Label from '@/components/io/label.tsx'
import Icon from '@/components/common/icon.tsx'
import { getClassNames } from '@/util/function/common.ts'

type SearchProps = {
  id?: string
  className?: string
  /** default: "text" */
  label?: React.ReactNode
  /** default: "top" */
  labelDirection?: 'column' | 'row'
  labelForPlaceholder?: boolean
  placeholder?: string
  name?: string
  value?: string | number
  valid?: boolean
  disabled?: boolean
  button?: {
    none?: boolean
    disabled?: boolean
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void
  }
  onEnter?: (e: React.FormEvent<HTMLFormElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}

const Search = (props: SearchProps) => {
  const { labelDirection = 'column' } = props
  const [focused, setFocused] = useState<boolean>(false)

  const _id = useId()
  const id = props.id ? props.id : _id

  const formStyle = {
    flexDirection: labelDirection,
    justifyContent: labelDirection === 'row' ? 'flex-start' : 'end',
    alignItems: labelDirection === 'row' ? 'center' : 'flex-start',
  }

  const classNames = {
    active: props.labelForPlaceholder && (!!props.value || focused),
    valid: props.valid === true,
    invalid: props.valid === false,
    placeholder: labelDirection === 'column' && props.labelForPlaceholder,
    disabled: props.button?.disabled,
  }

  const searchBoxClassName = getClassNames('input_box search_box', props, 'className')
  const formClassName = getClassNames('form', classNames, 'active', 'valid', 'invalid')
  const labelClassName = getClassNames('', classNames, 'placeholder', 'active')
  const searchButtonClassName = getClassNames('search_button', classNames, 'disabled')

  return (
    <div className={searchBoxClassName}>
      <form
        className={formClassName}
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault()
          props.onEnter?.(e)
        }}
      >
        {props.label && (
          <Label className={labelClassName} for={id}>
            {props.label}
          </Label>
        )}

        <input
          className='input search'
          id={id}
          type='text'
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
        />
        {!props.button?.none && (
          <button
            className={searchButtonClassName}
            onClick={(e) => {
              e.preventDefault()
              if (props.button?.disabled) return
              props.button?.onClick?.(e)
            }}
          >
            <Icon
              className='search_icon'
              type='search'
              // color={`#eeeeee`}
              strokeAnimation={!props.button?.disabled}
            />
          </button>
        )}
      </form>
    </div>
  )
}

export default Search
