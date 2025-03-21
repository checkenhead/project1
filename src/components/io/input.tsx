import '@/styles/io/input.scss'
import React, { ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react'
import { getClassNames, objUtil, toByteString } from '@/util/function/common.ts'
import { Flex } from '../layout/flex'
import Button from '@/components/io/button'
import useFileUrl from '@/hooks/util/useFileUrl'

type SimpleInputProps<T extends Record<keyof T, string>, K extends Extract<keyof T, string>> = {
  className?: string
  id?: string
  name: K
  value: T
  placeholder?: string
  disabled?: boolean
  password?: boolean
  onChange: (name: K, value: string) => void
  onEnter?: (e: React.FormEvent<HTMLFormElement>) => void

  // width?: string
  // height?: string
  // border?: string
  // borderRadius?: string
  // backgroundColor?: string
  // padding?: string
  color?: string
}

export const SimpleInput = <T extends Record<keyof T, string>, K extends Extract<keyof T, string>>(
  props: SimpleInputProps<T, K>
) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [focus, setFocus] = useState(false)

  const { className, id: customId, name, value, placeholder, disabled, password, onChange, onEnter, ...styles } = props

  const active = focus || !!value[name]
  const inputClassName = useMemo(
    () => getClassNames('input', { className, active, disabled }),
    [className, active, disabled]
  )
  const inputStyle = useMemo(() => objUtil.getNotNullish(styles), [styles])

  const _id = useId()
  const id = customId ? customId : _id

  return (
    <form
      className='form_input_wrapper'
      onSubmit={(e) => {
        e.preventDefault()
        onEnter?.(e)
      }}
    >
      <input
        className={inputClassName}
        ref={inputRef}
        id={id}
        type={password ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        value={value[name]}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(name, e.currentTarget.value)
        }}
        style={inputStyle}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
      />
    </form>
  )
}

type LabeledInputProps = {
  label: string
  fontSize?: string
  width?: string
  height?: string
  padding?: string
  border?: string
  borderRadius?: string
  backgroundColor?: string
}
const LabeledInput = <T extends Record<keyof T, string>, K extends Extract<keyof T, string>>(
  props: Omit<SimpleInputProps<T, K>, 'placeholder'> & LabeledInputProps
) => {
  const { label, fontSize, width, height, padding, border, borderRadius, backgroundColor, ...SimpleInputProps } = props
  const styles = { width, height, border, borderRadius, backgroundColor, padding }
  const labeledInputBoxStyle = useMemo(() => objUtil.getNotNullish({ fontSize }), [fontSize])
  const labeledInputStyle = useMemo(() => objUtil.getNotNullish(styles), [styles])

  return (
    <div className='labeled_input_box' style={labeledInputBoxStyle}>
      <div className='labeled_input' style={labeledInputStyle}>
        <div className='input_label_space'></div>
        <SimpleInput {...SimpleInputProps} />
        <label className='input_label'>{label}</label>
        <span className='input_underline'></span>
      </div>
    </div>
  )
}
// type MultiFilesType<M extends boolean | undefined> = true extends M ? FileList | null : File | null
type FileInputProps<N extends string, M extends boolean | undefined> = {
  name: N
  onChange: (name: N, value: Array<File>) => void
  label?: string
  multiple?: M
}
type FileInfoType = Array<{ name: string; size: number; type: string }>
const FileInput = <N extends string, M extends boolean | undefined>(props: FileInputProps<N, M>) => {
  const { filesInfo, setFiles } = useFileUrl()

  return (
    <div className='file_input_box' style={{ width: '100%', height: '100%', border: '1px solid black' }}>
      <label>
        {props.label}
        <input
          type='file'
          style={{ display: 'none' }}
          multiple={props.multiple}
          onChange={(e) => {
            const files = e.currentTarget.files

            if (!files || files.length === 0) return
            const fileArray = Array.from(files)

            setFiles(fileArray)
            props.onChange(props.name, fileArray)
          }}
        />
      </label>
      <div className='file_info_box'>
        {filesInfo.map(({ name, size, url }, index) => {
          return (
            <Flex.Row.Between key={index}>
              <div className='file_name'>{name}</div>
              <div className='file_size'>{toByteString(size)}</div>
              <div className='file_preview'>
                <img src={url} />
              </div>
            </Flex.Row.Between>
          )
        })}
      </div>
    </div>
  )
}

export const Input = Object.assign(SimpleInput, {
  Labeled: LabeledInput,
  File: FileInput,
})
