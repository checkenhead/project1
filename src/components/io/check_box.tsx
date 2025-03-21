import React, { useCallback, useId } from 'react'
import Label from '@/components/io/label'
import Icon from '@/components/common/icon'
import { getClassNames } from '@/util/function/common.ts'
import { Flex } from '@/components/layout/flex'

type CheckBoxProps<InputStateType> = {
  id?: string
  className?: string
  group: Array<{
    name: Extract<keyof InputStateType, string>
    label: React.ReactNode
    default?: boolean
    disabled?: boolean
  }>
  value: InputStateType
  onChange: <K extends Extract<keyof InputStateType, string>>(name: K, value: boolean) => void
  checkAll?: {
    label: React.ReactNode
    default?: boolean
    disabled?: boolean
  }
}

const CheckBox = <InputStateType,>(props: CheckBoxProps<InputStateType>) => {
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

  const _id = useId()
  const checkAll = props.checkAll ? [props.checkAll] : []

  return (
    <Flex.Row className={props.className} gap='1rem'>
      {checkAll.map((_checkAll, index) => {
        const id = props.id ? `${props.id}_${index}` : `${_id}_${index}`
        const disabled = !!_checkAll.disabled
        const checkedAll = props.group.every((checkbox) => !!props.value?.[checkbox.name])
        const checkedSome = !checkedAll && props.group.some((checkbox) => !!props.value?.[checkbox.name])

        return (
          <Label key={index} gap='0.3rem' disabled={disabled} pointer={!disabled}>
            <Icon
              type={`${checkedAll ? 'checkSquare' : checkedSome ? 'squareInSquare' : 'square'}`}
              width='1rem'
              height='1rem'
              strokeAnimation={!disabled}
            />
            <input
              id={id}
              ref={_checkAll.default ? setDefaultValue : undefined}
              type='checkbox'
              // name={_checkAll.name}
              onChange={(e) => {
                props.group?.forEach((checkbox) => {
                  props.onChange?.(checkbox.name, !checkedAll)
                })
              }}
              checked={checkedAll}
              disabled={disabled}
              style={{ display: 'none' }}
            />
            <label className='label' htmlFor={id}>
              {_checkAll.label}
            </label>
          </Label>
        )
      })}
      {props.group.map((checkbox, index) => {
        const id = props.id ? `${props.id}_${index + checkAll.length}` : `${_id}_${index + checkAll.length}`
        const disabled = !!checkbox.disabled
        const checked = !!props.value?.[checkbox.name]

        return (
          <Label key={index} gap='0.3rem' disabled={disabled} pointer={!disabled}>
            <Icon
              type={`${checked ? 'checkSquare' : 'square'}`}
              width='1rem'
              height='1rem'
              strokeAnimation={!disabled}
            />
            <input
              id={id}
              ref={checkbox.default ? setDefaultValue : undefined}
              type='checkbox'
              name={checkbox.name}
              onChange={(e) => {
                props.onChange?.(checkbox.name, e.currentTarget.checked)
              }}
              checked={checked}
              disabled={disabled}
              style={{ display: 'none' }}
            />
            <label className='label' htmlFor={id}>
              {checkbox.label}
            </label>
          </Label>
        )
      })}
    </Flex.Row>
  )
}

export default CheckBox
