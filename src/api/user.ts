import { ObjectType } from '@/util/function/fetcher'

export const loginParams = (body: ObjectType) => {
  const { name, password } = body

  return {
    method: 'POST',
    url: '/login',
    anonymous: true,
    body: { name, password },
  } as const
}

// export const logoutParams = () => {
// 	return {
// 		method: 'POST' as const,
// 		url: '/logout' as const,
// 	}
// }

export const joinParams = (body: ObjectType) => {
  const { name, password, nickname } = body

  return {
    method: 'POST',
    url: '/join',
    anonymous: true,
    body: { name, password, nickname },
  } as const
}

export const checkIdParams = (body: ObjectType) => {
  const { name } = body

  return {
    method: 'POST',
    url: '/join_check_id',
    anonymous: true,
    body: { name },
  } as const
}
