import { ObjectType, QueryType } from '@/util/function/fetcher'
import { Children, isValidElement, JSXElementConstructor, ReactNode } from 'react'

/** QueryType to query string */
export const toQueryString = (query: QueryType | undefined | null): string => {
  if (!query) return ''
  const queryString = Object.keys(query)
    .filter((key) => query[key] !== undefined)
    .sort()
    .map((key) => `${key}=${query[key]}`)
    .join('&')

  return !!queryString ? `?${queryString}` : ''
}

/** ObjectType to FormData */
export const toFormData = (body: ObjectType | undefined | null): FormData | undefined => {
  if (!body) return undefined

  const formData = new FormData()

  for (const [key, value] of Object.entries(body)) {
    if (value !== null && value !== undefined) {
      formData.append(key, value)
    }
  }

  return formData
}
// type KorPostpositionType =
/** add korean postposition */
export const addKorPostposition = (
  korStr: string,
  type: '이/가' | '은/는' | '을/를' | '으로/로',
  onlyPostposition: boolean = false
): string => {
  const code = korStr.charCodeAt(korStr.length - 1)
  const condition = +((code - 44032) % 28 === 0)

  return (onlyPostposition ? '' : korStr) + type.split('/')[condition]
}

/** convert to Byte string */
export const toByteString = (byte: number, depth: number = 0): string => {
  const DENOMINATOR = 1024

  if (byte > DENOMINATOR) return toByteString(byte / DENOMINATOR, depth + 1)
  const _byte = Math.floor(byte * 100) / 100

  switch (depth) {
    case 0:
      return `${_byte}Byte`
    case 1:
      return `${_byte}KB`
    case 2:
      return `${_byte}MB`
    case 3:
      return `${_byte}GB`
    case 4:
      return `${_byte}TB`
    case 5:
      return `${_byte}PB`
    default:
      return ''
  }
}

/**
 * Compares only the values each two objects.
 * @param valueA any value
 * @param valueB any value
 * @param {boolean} strict Default is true. true: "===", false: "==".
 * @returns {boolean} true or false
 */
export const deepCompare = (valueA: any, valueB: any, strict: boolean = true): boolean => {
  if (valueA === valueB) return true

  const keyA = Object.keys(valueA ?? {})
  const keyB = Object.keys(valueB ?? {})

  if (keyA.length !== keyB.length) return false

  return keyA.every((key) => {
    const _valueA = valueA?.[key]
    const _valueB = valueB?.[key]

    if (typeof _valueA === 'object' && typeof _valueB === 'object') {
      return deepCompare(_valueA, _valueB, strict)
    }

    return strict ? _valueA === _valueB : _valueA == _valueB
  })
}

export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    const timer = setTimeout((): void => {
      resolve(() => {
        clearTimeout(timer)
      })
    }, ms)
  })
}

export const getClassNames = <T extends object>(prefix: string, props: T, ...keys: Array<keyof T>): string => {
  const joinedStr = (keys.length === 0 ? objKeys(props) : keys)
    .map((key) => (props[key] ? (typeof props[key] === 'string' ? props[key] : key) : null))
    .filter(Boolean)
    .join(' ')

  return joinedStr ? `${prefix} ${joinedStr}` : prefix
}

const objKeys = <K extends keyof T, T extends Record<K, T[K]>>(obj: T) => Object.keys(obj) as K[]

/**
 * parameter obj를 순회하며 호출되는 callbackFn의 리턴값인 object를 병합한 새로운 object를 반환
 * @param {T} obj object for iterate
 * @param {<K extends keyof T>(key: K, value: T[K]) => R} callbackFn key와 value를 인자로 갖는 callback
 * @returns {{[P in keyof R]: R[P]}}
 */
const objMap = <T extends Record<keyof T, unknown>, R extends Record<any, unknown>>(
  obj: T,
  callbackFn: <K extends keyof T>(key: K, value: T[K]) => R
): { [P in keyof R]: R[P] } => {
  return Object.assign({}, ...Object.keys(obj).map((key) => callbackFn(key as keyof T, obj[key as keyof T])))
}

const getNotNullish = <K extends keyof T, T extends Record<K, T[K]>>(
  obj: T
): Record<K, Exclude<T[K], null | undefined>> | object => {
  return Object.assign(
    {},
    ...Object.keys(obj).map((key) =>
      obj[key as K] === undefined || obj[key as K] === null ? {} : { [key]: obj[key as K] }
    )
  )
}

export const objUtil = {
  keys: objKeys,
  map: objMap,
  getNotNullish,
}
