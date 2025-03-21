import React, { useEffect } from 'react'
import { getClassNames } from '@/util/function/common.ts'

type ToggleButtonProps<InputStateType, K extends Extract<keyof InputStateType, string>, ValueMapType> = {
  name: K
  value: InputStateType
  onChange: (name: K, value: undefined extends ValueMapType ? boolean : InputStateType[K]) => void
  /** valueMap must be an array of [falsy value, truthy value] or undefined. If value does not match any element in valueMap, a runtime error occurs. */
  valueMap?: undefined extends ValueMapType ? undefined : [InputStateType[K], InputStateType[K]]
  inactiveIcon?: React.ReactNode
  activeIcon?: React.ReactNode
  disabled?: boolean
  className?: string
}

const ToggleButton = <InputStateType, K extends Extract<keyof InputStateType, string>, ValueMapType>(
  props: ToggleButtonProps<InputStateType, K, ValueMapType>
) => {
  const checked = props.valueMap ? props.valueMap[0] !== props.value[props.name] : !!props.value[props.name]

  useEffect(() => {
    // valueMap validation
    if (props.valueMap === undefined) return
    // if (props.valueMap.length === 0 || props.valueMap.length > 2)
    //   throw new Error('valueMap must be an array of [falsy value, truthy value]')
    if (!props.valueMap.some((value) => value === props.value[props.name]))
      throw new Error('value does not match any element in valueMap')
  }, [props.valueMap])

  const classNames = { className: props.className, disabled: props.disabled, active: checked }
  const toggleButtonBoxClassName = getClassNames('toggle_button_box', classNames, 'className')
  const toggleButtonClassName = getClassNames('toggle_button', classNames, 'disabled', 'active')

  return (
    <label className={toggleButtonBoxClassName}>
      <div className={toggleButtonClassName}>
        <div className='switch'>
          <div className='inactive'>{props.inactiveIcon ? props.inactiveIcon : <div className='none_icon'></div>}</div>
          <div className='active'>{props.activeIcon ? props.activeIcon : <div className='none_icon'></div>}</div>
        </div>
        <input
          type='checkbox'
          name={props.name}
          checked={checked}
          onChange={(e) => {
            if (props.disabled) return

            if (props.valueMap === undefined)
              (props.onChange as (name: K, value: boolean) => void)(props.name, e.currentTarget.checked)
            else
              (props.onChange as (name: K, value: InputStateType[K]) => void)(
                props.name,
                props.valueMap[+e.currentTarget.checked]
              )
          }}
          style={{ display: 'none' }}
        />
      </div>
    </label>
  )
}

export default ToggleButton
