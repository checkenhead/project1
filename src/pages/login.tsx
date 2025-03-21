import { useLocation, useNavigate } from 'react-router-dom'

import useFetcher from '@/hooks/util/useFetcher'
import useInputState from '@/hooks/util/useInputState'
import useUserManger from '@/hooks/user/useUserManager'
import jwtUtil from '@/util/function/jwt'
import { addKorPostposition, objUtil } from '@/util/function/common'
import { loginParams } from '@/api/user'
import Icon from '@/components/common/icon'
import Button from '@/components/io/button'
import { VALIDATE_RESULT } from '@/util/constance/common.ts'
import { Card } from '@/components/layout/card'
import { Input } from '@/components/io/input'
import { Flex } from '@/components/layout/flex'

const NAME_PRESET = {
  name: '아이디',
  password: '비밀번호',
} as const

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const defaultName = location?.state?.defaultName as string | undefined

  const [fetcher, util] = useFetcher()
  const { user, updateUser } = useUserManger()
  const [input, validation] = useInputState({
    name: defaultName ?? '',
    password: '',
  })

  const onClickLogin = async () => {
    if (!validate()) return

    await fetcher({
      ...loginParams(input.state),
      onSuccess: (res) => {
        const { access_token = undefined, refresh_token = undefined } = {
          ...res.data,
        }
        jwtUtil.store(access_token, refresh_token)
        if (updateUser()) navigate(`/${user?.name}`)
      },
      onError: (res) => {
        console.log('error res', res)
        validation.set.name('아이디를 확인해주세요.')
        validation.set.password('비밀번호를 확인해주세요.')
      },
    })
  }

  const validate = () => {
    return validation.checkAll((key, state) => {
      if (state[key] === '') return `${addKorPostposition(NAME_PRESET[key], '을/를')} 입력해주세요.`
      return VALIDATE_RESULT.OK
    })
  }

  return (
    <Flex.Col.Center width='100%' height='100%' gap='1rem'>
      <Card filled elevated>
        <Card.Section width='15rem' padding='1rem'>
          <Card.Title padding='0 0 0.5rem 0'>로그인</Card.Title>
          <Card.Section padding='0 0 0.5rem 0'>
            {/*<Input*/}
            {/*  // border='1px solid var(--border-color)'*/}
            {/*  // borderRadius='0.3rem'*/}
            {/*  // backgroundColor='blue'*/}
            {/*  // padding='0.3rem'*/}
            {/*  placeholder='아이디'*/}
            {/*  name='name'*/}
            {/*  value={input.state}*/}
            {/*  onChange={(name, value) => {*/}
            {/*    validation.reset(name)*/}
            {/*    input.onChange(name, value)*/}
            {/*  }}*/}
            {/*/>*/}

            <Input.Labeled
              // backgroundColor='black'
              // border='1px solid var(--border-color)'
              // borderRadius='0.3rem'
              // backgroundColor='blue'
              // padding='0.3rem'
              // disabled={true}
              label='아이디'
              name='name'
              value={input.state}
              onChange={(name, value) => {
                validation.reset(name)
                input.onChange(name, value)
              }}
            />
            <Card.Transition width='100%'>
              {!!validation.result.name?.msg && <Card.Text color='red'>{validation.result.name?.msg}</Card.Text>}
            </Card.Transition>
          </Card.Section>

          <Card.Section padding='0 0 0.5rem 0'>
            {/*<input type='color' />*/}
            <Input.Labeled
              // border='1px solid var(--border-color)'
              password
              label='비밀번호'
              name='password'
              value={input.state}
              onChange={(name, value) => {
                validation.reset(name)
                input.onChange(name, value)
              }}
              onEnter={onClickLogin}
            />
            <Card.Transition width='100%'>
              {!!validation.result.password?.msg && (
                <Card.Text color='red'>{validation.result.password?.msg}</Card.Text>
              )}
            </Card.Transition>
          </Card.Section>
          <Button submit onClick={onClickLogin}>
            <Flex.Row.Center gap='0.5rem'>
              <Icon type='login' width='1rem' height='1rem' />
              로그인
            </Flex.Row.Center>
          </Button>
        </Card.Section>
        {/*<Card.Divider />*/}
      </Card>
      <Card>
        <Card.Section width='auto'>
          <div
            className='pointer common_click'
            onClick={() => {
              navigate('/join')
            }}
          >
            Sign up
          </div>
        </Card.Section>
      </Card>
    </Flex.Col.Center>
  )
}

export default Login
