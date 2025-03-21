import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import jwtUtil from '@/util/function/jwt'
import { deepCompare } from '@/util/function/common'
import useFetcher from '@/hooks/util/useFetcher'
import { userState, UserType } from '@/atom/global'
import { usePopup } from '@/hooks/util/usePopup.tsx'
import { AUTHORITIES } from '@/util/constance/authorities.ts'

type UserManagerProps = {
  /** 로그인 되어있지 않은 경우 refresh token이 있으면 로그인 시도 */
  autoLogin?: boolean
}

const useUserManager = (props?: UserManagerProps) => {
  const { autoLogin = false } = { ...props }
  const [user, setUser] = useRecoilState(userState)
  const [, fetcherUtil] = useFetcher()
  const { toast } = usePopup()
  const navigate = useNavigate()

  const updateUser = () => {
    // refresh 토큰이 없는 경우 -> 로그아웃
    // refresh 토큰이 있지만 access 토큰이 없는 경우 -> token refresh
    // refresh, access 토큰이 있는 경우 ->
    //// 1. 로그인되어 있는 경우
    ////// 1-1. 같은 사용자, 같은 정보일 경우 -> 업데이트 하지 않음
    ////// 1-2. 다른 사용자, 다른 정보일 경우 -> 토큰 정보로 업데이트
    //// 2. 로그인되어 있지 않은 경우 -> 토큰 정보로 업데이트

    const payload = jwtUtil.getParsedToken('REFRESH')
    const hasNotRefreshToken = !payload
    const hasNotAccessToken = !jwtUtil.getParsedToken('ACCESS')

    if (hasNotRefreshToken || hasNotAccessToken) {
      if (user && hasNotRefreshToken) logout()
      return false
    }

    const { id, name, nickname, authorities } = payload

    const isValidToken = !!id && !!name && !!nickname && !!authorities
    const isUpdateRequired = !deepCompare(user, payload)

    if (!user && isValidToken && isUpdateRequired) {
      setUser({ id, name, nickname, authorities } as UserType)
      toast({ message: `${name}님, 로그인 되었습니다!` })
    }

    return true
  }

  const logout = (redirectUrl: string = '/') => {
    jwtUtil.remove()
    setUser(undefined)
    navigate(redirectUrl, { replace: true })
  }

  const tryTokenRefresh = () => {
    if (jwtUtil.getToken('REFRESH')) fetcherUtil.tokenRefresh(updateUser)
  }

  useEffect(() => {
    if (updateUser()) return
    else if (autoLogin) tryTokenRefresh()
  }, [])

  return { user, updateUser, logout }
}

export default useUserManager
