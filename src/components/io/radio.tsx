import React, { useCallback, useId } from 'react'
import Label from '@/components/io/label.tsx'
import Icon from '@/components/common/icon.tsx'
import { Flex } from '@/components/layout/flex'

type RadioProps<InputStateType> = {
  name: Extract<keyof InputStateType, string>
  value: InputStateType
  onChange: <K extends Extract<keyof InputStateType, string>>(name: K, value: InputStateType[K]) => void
  id?: string
  className?: string
  group?: Array<{
    label: React.ReactNode
    value: InputStateType[Extract<keyof InputStateType, string>]
    disabled?: boolean
  }>
  defaultValue?: InputStateType[Extract<keyof InputStateType, string>]
}

const Radio = <InputStateType,>(props: RadioProps<InputStateType>) => {
  const value = props.value[props.name]
  const _id = useId()

  const setDefaultValue = useCallback((node: HTMLInputElement | null) => {
    if (node !== null) {
      if (!node.disabled) {
        node.click()
      } else {
        node.disabled = false
        node.click()
        node.disabled = true
      }
    }
  }, [])

  return (
    <Flex.Row className={props.className} gap='1rem'>
      {props.group?.map((radio, index) => {
        const disabled = !!radio.disabled
        const checked = value === radio.value
        const id = props.id ? `${props.id}_${index}` : `${_id}_${index}`

        return (
          <Label key={index} gap='0.3rem' disabled={disabled} pointer={!disabled}>
            <Icon
              type={`${checked ? 'checkCircle' : 'circle'}`}
              width='1rem'
              height='1rem'
              strokeAnimation={!disabled}
            />
            <input
              id={id}
              ref={props.defaultValue === radio.value ? setDefaultValue : undefined}
              type='radio'
              name={props.name}
              onChange={(e) => {
                props.onChange?.(props.name, radio.value)
              }}
              disabled={disabled}
              style={{ display: 'none' }}
            />
            <label className='label' htmlFor={id}>
              {radio.label}
            </label>
          </Label>
        )
      })}
    </Flex.Row>
  )
}

export default Radio
