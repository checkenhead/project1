import '@/styles/io/select.scss'
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Icon from '@/components/common/icon'
import { getClassNames } from '@/util/function/common.ts'
import { useChildrenValidator } from '@/hooks/util/useChildrenValidator'
import { Flex } from '@/components/layout/flex'

type SelectOptionProps<V> = {
  children: ReactNode
  value?: V
  disabled?: boolean
  checked?: boolean
}

const SelectOption = <V,>(props: SelectOptionProps<V>) => {
  return <div className='option_content'>{props.children}</div>
}

type SelectControllerProps<T, K extends Extract<keyof T, string>, C extends ReactNode> = {
  name: K
  value?: T
  onChange: (name: K, value: T[K]) => void
  children: C
  options: Array<{ node: ReactNode; value: T[K]; disabled?: boolean }>
  placeholder?: ReactNode
  className?: string
}

const SelectController = <T, K extends Extract<keyof T, string>, C extends ReactNode>(
  props: undefined extends C
    ? Omit<SelectControllerProps<T, K, C>, 'children'>
    : Omit<SelectControllerProps<T, K, C>, 'options'>
) => {
  const [active, setActive] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const optionBoxSize = useRef<{ width: number; height: number } | undefined>(undefined)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1)
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState<number>(-1)
  // const optionList = useMemo(() => Children.toArray(props.children), [props.children])

  const { options, children } = props as SelectControllerProps<T, K, C>
  const { childrenValidator } = useChildrenValidator(children, SelectOption)

  const optionList = useMemo(
    () =>
      options?.map((option, index) => (
        <SelectOption key={index} value={option.value} disabled={option.disabled}>
          {option.node}
        </SelectOption>
      )) ??
      childrenValidator
        .onError(() => {
          throw new Error('Select Component can only have Option Components as children.')
        })
        .getChildren.toArray(),
    []
  )
  const optionData = useMemo(
    () =>
      optionList?.map((option: any, index) => ({
        key: index,
        value: option.props?.value,
        disabled: option.props?.disabled,
      })),
    [optionList]
  )

  const value = props.value?.[props.name]
  const optionLength = optionList.length
  const displayPlaceholder = !active && selectedOptionIndex === -1 && props.placeholder !== undefined

  useEffect(() => {
    if (selectedOptionIndex === -1) return
    props.onChange?.(props.name, optionData[selectedOptionIndex].value)
  }, [selectedOptionIndex])

  useEffect(() => {
    setSelectedOptionIndex(optionList.findIndex((option: any) => option.props.value === value))
  }, [])

  useEffect(() => {
    if (!active) setHoveredOptionIndex(selectedOptionIndex)
  }, [active])

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('keydown', keyboardEventHandler)
    }

    return () => {
      if (node) {
        node.removeEventListener('keydown', keyboardEventHandler)
      }
    }
  }, [])

  const delayedSetActive = (active: boolean) => {
    let timer: any = null
    timer = setTimeout(() => {
      setActive(active)
      clearTimeout(timer)
    }, 180)
  }

  const keyboardEventHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActive(false)
    } else if (e.key === 'Enter') {
      setHoveredOptionIndex((prev) => {
        if (prev !== -1 && !optionData[prev]?.disabled) {
          delayedSetActive(false)
          setSelectedOptionIndex(prev)
        }
        return prev
      })
    } else if (e.key === 'ArrowDown') {
      setActive((prev) => {
        if (prev) setHoveredOptionIndex((prev) => (prev >= optionLength - 1 ? optionLength - 1 : prev + 1))
        return true
      })
    } else if (e.key === 'ArrowUp') {
      setActive((prev) => {
        if (prev) setHoveredOptionIndex((prev) => (prev <= 0 ? 0 : prev - 1))
        return true
      })
    } else return

    e.preventDefault()
  }, [])

  const initSelectSize = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && optionBoxSize.current) {
        node.style.width = `${optionBoxSize.current.width}px`
        node.style.height = `${optionBoxSize.current.height / optionLength}px`
      }
    },
    [optionList]
  )

  const selectContentHandler = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && optionBoxSize.current !== undefined) {
        node.style.width = `${optionBoxSize.current.width}px`
        node.style.height = active
          ? `${optionBoxSize.current.height}px`
          : `${optionBoxSize.current.height / optionLength}px`
        node.style.top = active ? `-${(optionBoxSize.current.height / optionLength) * selectedOptionIndex}px` : `0px`
        node.style.zIndex = active ? '1' : '0'
      }
    },
    [selectedOptionIndex, active]
  )

  const initOptionBoxSize = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && optionBoxSize.current === undefined) {
        const { width, height } = node.getClientRects()[0]
        optionBoxSize.current = { width, height }
      }
    },
    [optionList]
  )

  const optionBoxPositionHandler = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && optionBoxSize.current !== undefined) {
        node.style.top = active ? `0px` : `-${(optionBoxSize.current.height / optionLength) * selectedOptionIndex}px`
      }
    },
    [selectedOptionIndex, active]
  )

  const classNames = { className: props.className, active }
  const selectBoxClassName = getClassNames('select_box', classNames, 'className', 'active')

  return (
    <div ref={ref} className={selectBoxClassName} tabIndex={0}>
      {active && <div className='dim' onClick={() => setActive(false)}></div>}
      <div ref={initSelectSize} className='select'>
        <div ref={selectContentHandler} className='select_content'>
          {displayPlaceholder && (
            <div className='placeholder_box' onClick={() => setActive(true)}>
              <Flex.Row.Between height='100%'>
                <div className='placeholder'>{props.placeholder}</div>
                <Icon type='chevronDown' width='1rem' height='1rem' />
              </Flex.Row.Between>
            </div>
          )}
          <div
            ref={(node) => {
              initOptionBoxSize(node)
              optionBoxPositionHandler(node)
            }}
            className='option_box'
          >
            {optionList.map((option: any, index: number) => {
              const disabled = !!option.props?.disabled
              const checked = selectedOptionIndex === index
              const classNames = {
                active,
                disabled,
                hover: active && hoveredOptionIndex === index,
                hidden: displayPlaceholder,
              }
              const optionClassName = getClassNames('option', classNames, 'disabled', 'hover', 'hidden')
              const optionIconWrapperClassName = getClassNames('option_icon_wrapper', classNames, 'active')

              return (
                <div
                  key={index}
                  className={optionClassName}
                  onClick={(e) => {
                    e.stopPropagation()

                    if (!active) return setActive(true)
                    if (disabled) return
                    if (selectedOptionIndex === index) setActive(false)
                    else delayedSetActive(false)
                    setSelectedOptionIndex(index)
                  }}
                  onMouseEnter={() => {
                    setHoveredOptionIndex(index)
                  }}
                >
                  <div className={optionIconWrapperClassName}>
                    <Flex.Row.Between width='100%' padding='0.2rem'>
                      <div style={{ width: '100%', flex: '1' }}>{option}</div>
                      <Flex.Row.Center width='1rem'>
                        <div
                          className='checked_icon'
                          style={{
                            // position: 'absolute',
                            width: checked && active ? '1rem' : '0',
                            height: '1rem',
                            opacity: checked && active ? '1' : '0',
                            transition: 'width 0.2s ease-in-out, opacity 0.2s ease-in-out',
                          }}
                        >
                          <Icon type='check' />
                        </div>
                        <div
                          className='chevron_down_icon'
                          style={{
                            // position: 'absolute',
                            width: checked && !active ? '1rem' : '0',
                            height: '1rem',
                            opacity: checked && !active ? '1' : '0',
                            transition: 'width 0.2s ease-in-out, opacity 0.2s ease-in-out',
                          }}
                        >
                          <Icon type='chevronDown' />
                        </div>
                      </Flex.Row.Center>
                    </Flex.Row.Between>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Select = Object.assign(SelectController, {
  Option: SelectOption,
})

type SelectProps2 = {
  name: string
  value?: any
  className?: string
  placeholder?: ReactNode
  onChange: (name: string, value: any) => void
  options: Array<{ node: ReactNode; value: any; disabled?: boolean }>
}
const Select2 = (props: SelectProps2) => {
  const { name, value, className, placeholder, onChange, options } = props
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [optionBoxSize, setOptionBoxSize] = useState({ width: 0, height: 0 })

  const initOptionBoxHeight = useCallback((node: HTMLDivElement | null) => {
    if (node === null) return
    const { width, height } = node.getBoundingClientRect()
    setOptionBoxSize({ width, height })
  }, [])

  const deferredSetOpen = (open: boolean) => {
    let timer: any = null
    timer = setTimeout(() => {
      setOpen(open)
      clearTimeout(timer)
    }, 200)
  }

  console.log('selected index', selectedIndex)

  return (
    <div
      className='select_box2'
      style={{
        width: `${optionBoxSize.width}px`,
      }}
      onClick={(e) => {
        // e.stopPropagation()
        setOpen(true)
        // e.stopPropagation()
        // const id2 = document.getElementById('op_3')
        // id2?.scrollTo({ behavior: 'smooth', top: 10 })
        // id2?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }}
    >
      {open && (
        <div
          className='select_dim2 prevent_scroll'
          onClick={(e) => {
            e.stopPropagation()
            deferredSetOpen(false)
          }}
        ></div>
      )}

      <div
        className={`option_view_box${open ? ' open' : ''}`}
        style={{
          height: open ? `${optionBoxSize.height}px` : '1.5rem',
          top: open ? `${selectedIndex * -1.5}rem` : '0',

          // overflow: 'scroll',
          // height: open ? (optionHeightLimited ? '4.5rem' : `${optionBoxSize.height}px`) : '1.5rem',
          // top: open ? (optionHeightLimited ? '0' : `${selectedIndex * -1.5}rem`) : '0',
        }}
      >
        <div
          className='option_box2'
          ref={initOptionBoxHeight}
          style={{
            position: 'relative',
            top: open ? '0' : `${selectedIndex * -1.5}rem`,
            transition: 'top 0.2s ease-in-out',
          }}
        >
          {options.map((option, index) => {
            return (
              <Option2
                key={index}
                open={open}
                checked={selectedIndex === index}
                onClick={() => {
                  if (!open) setOpen(true)
                  else {
                    setSelectedIndex(index)
                    onChange(name, option.value)
                    deferredSetOpen(false)
                  }
                }}
              >
                {option.node}
              </Option2>
            )
          })}
        </div>
      </div>
    </div>
  )
}

type OptionProps2 = {
  children?: ReactNode
  open: boolean
  checked?: boolean
  disabled?: boolean
  placeholder?: boolean
  onClick?: () => void
}
const Option2 = (props: OptionProps2) => {
  const { open, checked, disabled, placeholder, onClick } = props
  const optionRef = useRef<HTMLDivElement>(null)
  const optionClassName = useMemo(() => getClassNames('option2', { disabled, placeholder }), [disabled, placeholder])

  return (
    <div
      ref={optionRef}
      className={optionClassName}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      <Flex.Row.Between>
        <div className='icon_box' style={{ width: open ? '1rem' : '0' }}>
          {checked && <Icon type='check' />}
        </div>
        <Flex.Row.Start.Center width='100%' height='1rem'>
          {props.children}
        </Flex.Row.Start.Center>
        <div className='icon_box' style={{ width: open ? '0' : '1rem' }}>
          {checked && <Icon type='chevronDown' />}
        </div>
      </Flex.Row.Between>
    </div>
  )
}

export default Select2
