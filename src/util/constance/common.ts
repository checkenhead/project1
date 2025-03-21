/**
 * useCustomState의 validate return type
 * @property {} OK validation 통과. validate result는 { isValid: true }가 됩니다.
 * @property {} UNCHECK validation 하지 않음. validate result는 undefined가 됩니다.
 * @property {} ERROR validation 실패. validate result는 { isValid: false, msg: ...any description string ... }가 됩니다. string을 return하면 validation이 실패한 것으로 취급됩니다.
 */
export const VALIDATE_RESULT: { UNCHECK: void | undefined; OK: true; ERROR: string } = {
  UNCHECK: undefined,
  OK: true,
  ERROR: 'Error',
} as const
