import useInputState from '@/hooks/util/useInputState'
import { useNavigate } from 'react-router-dom'
import useFetcher from '@/hooks/util/useFetcher'
import { addKorPostposition } from '@/util/function/common'
import { checkIdParams, joinParams } from '@/api/user'
import { useEffect, useState } from 'react'
import { usePopup } from '@/hooks/util/usePopup'
// import Input from '@/components/common/io/input'
import Button from '@/components/io/button'
import { VALIDATE_RESULT } from '@/util/constance/common.ts'
import useCustomState from '@/hooks/util/useCustomState.tsx'
import { Card } from '@/components/layout/card'
import { Input } from '@/components/io/input'
import { Flex } from '@/components/layout/flex'
import Icon from '@/components/common/icon'

const NAME_PRESET = {
  name: '아이디',
  nickname: '닉네임',
  password: '비밀번호',
  re_password: '비밀번호 확인',
} as const

const Join = () => {
  const navigate = useNavigate()
  const [fetcher, fetcherUtil] = useFetcher()
  const [input, validation] = useInputState({
    name: '',
    password: '',
    re_password: '',
    nickname: '',
  })
  const [idChecked, setIdChecked] = useState(false)

  const { alert } = usePopup()

  const onClickIdCheck = async () => {
    if (idChecked) return

    if (input.state.name === '') return validation.set.name('아이디를 입력해주세요.')
    else if (input.state.name.length < 3) return validation.set.name('아이디는 3자 이상으로 설정해주세요.')

    await fetcher({
      ...checkIdParams(input.state),
      onSuccess: (res) => {
        validation.set.name(VALIDATE_RESULT.OK)
        setIdChecked(true)
      },
      onError: (res) => {
        validation.set.name('이 아이디는 사용할 수 없습니다.')
      },
    })
  }

  const onClickJoin = async () => {
    if (!validate()) return

    await fetcher({
      ...joinParams(input.state),
      onSuccess: (res) => {
        alert({
          title: '회원 가입 완료',
          message: '로그인 해주세요.',
          onClickOk: () => {
            navigate('/login', { state: { defaultName: input.state.name } })
          },
        })
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
      switch (key) {
        case 'name':
        case 'nickname':
          if (state[key] === '') return `${addKorPostposition(NAME_PRESET[key], '을/를')} 입력해주세요.`
          else if (state[key].length < 3)
            return `${addKorPostposition(NAME_PRESET[key], '은/는')} 3자 이상으로 설정해주세요.`
          else if (state[key].length > 30)
            return `${addKorPostposition(NAME_PRESET[key], '은/는')} 30자 이하로 설정해주세요.`
          else if (key === 'name' && !idChecked) return `${NAME_PRESET[key]} 중복확인을 해주세요.`
          break
        case 'password':
          if (state[key] === '') return `${addKorPostposition(NAME_PRESET[key], '을/를')} 입력해주세요.`
          else if (state[key].length < 8)
            return `${addKorPostposition(NAME_PRESET[key], '은/는')} 8자 이상으로 설정해주세요.`
          break
        case 're_password':
          if (state[key] === '') return `${addKorPostposition(NAME_PRESET[key], '을/를')} 입력해주세요.`
          else if (state[key] !== state['password'])
            return `${addKorPostposition(NAME_PRESET[key], '이/가')} 일치하지 않습니다.`
          break
      }

      return VALIDATE_RESULT.OK
    })
  }

  useEffect(() => {
    setIdChecked(false)
  }, [input.state.name])

  return (
    <Flex.Col.Center width='100%' height='100%' gap='1rem'>
      <Card filled elevated>
        <Card.Section width='15rem' padding='1rem'>
          <Card.Title padding='0 0 0.5rem 0'>회원가입</Card.Title>
          <Card.Section padding='0 0 0.5rem 0'>
            <Flex.Row.Start width='100%' gap='0.3rem'>
              <Input.Labeled
                width='100%'
                label='아이디'
                name='name'
                value={input.state}
                // valid={validation.result}
                disabled={idChecked}
                onChange={(name, value) => {
                  validation.reset(name)
                  input.onChange(name, value)
                }}
              />

              <Button
                width='auto'
                onClick={() => {
                  if (!idChecked) onClickIdCheck()
                  else {
                    setIdChecked(false)
                    validation.reset('name')
                  }
                }}
              >
                {!idChecked ? '확인' : '변경'}
              </Button>
            </Flex.Row.Start>
            <Card.Transition width='100%'>
              {!!validation.result.name?.msg && <Card.Text color='red'>{validation.result.name?.msg}</Card.Text>}
            </Card.Transition>
          </Card.Section>

          <Card.Section padding='0 0 0.5rem 0'>
            <Input.Labeled
              password
              label='비밀번호'
              name='password'
              // placeholder='아이디'
              value={input.state}
              // valid={validation.result}
              // disabled={util.isPending}
              onChange={(name, value) => {
                validation.reset(name)
                input.onChange(name, value)
              }}
            />
            <Card.Transition width='100%'>
              {!!validation.result.password?.msg && (
                <Card.Text color='red'>{validation.result.password?.msg}</Card.Text>
              )}
            </Card.Transition>
          </Card.Section>

          <Card.Section padding='0 0 0.5rem 0'>
            <Input.Labeled
              password
              label='비밀번호 확인'
              name='re_password'
              // placeholder='아이디'
              value={input.state}
              // valid={validation.result}
              // disabled={util.isPending}
              onChange={(name, value) => {
                validation.reset(name)
                input.onChange(name, value)
              }}
            />
            <Card.Transition width='100%'>
              {!!validation.result.re_password?.msg && (
                <Card.Text color='red'>{validation.result.re_password?.msg}</Card.Text>
              )}
            </Card.Transition>
          </Card.Section>

          <Card.Section padding='0 0 0.5rem 0'>
            <Input.Labeled
              label='닉네임'
              name='nickname'
              // placeholder='아이디'
              value={input.state}
              // valid={validation.result}
              // disabled={util.isPending}
              onChange={(name, value) => {
                validation.reset(name)
                input.onChange(name, value)
              }}
            />
            <Card.Transition width='100%'>
              {!!validation.result.nickname?.msg && (
                <Card.Text color='red'>{validation.result.nickname?.msg}</Card.Text>
              )}
            </Card.Transition>
          </Card.Section>

          <Button submit width='100%' onClick={onClickJoin}>
            <Flex.Row.Center gap='0.5rem'>
              <Icon type='feather' width='1rem' height='1rem' />
              회원가입
            </Flex.Row.Center>
          </Button>
        </Card.Section>
      </Card>
      <div
        style={{
          margin: '10px',
        }}
      >
        <span className='pointer common_click' onClick={() => navigate('/login')}>
          Sign in
        </span>
      </div>
    </Flex.Col.Center>
  )
}

export default Join
