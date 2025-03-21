import React, { useEffect } from 'react'
import Icon from '@/components/common/icon'
import useInputState from '@/hooks/util/useInputState'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { themeState, ThemeType } from '@/atom/global.ts'
import Io from './io'
import { Card } from '@/components/layout/card'
import { Select } from '@/components/io/select'
import { Flex } from './layout/flex'

const Settings = () => {
  const s = Symbol('test')
  const [theme, setTheme] = useRecoilState(themeState)
  const [input, validation] = useInputState(theme)
  const [input2, validation2] = useInputState({
    test1: true,
  })

  console.log('input', input)
  console.log('input2', input2)

  useEffect(() => {
    setTheme({ by: input.state.by, mode: input.state.mode })
  }, [input.state.by, input.state.mode])

  useEffect(() => {
    input.setState((prev) => ({ ...prev, ...theme }))
  }, [theme.by, theme.mode])

  return (
    <Card outlined filled>
      <Card.Section width='20rem' padding='1rem'>
        <Flex.Row.Start.Center gap='0.5rem' padding='0 0 1rem 0'>
          <Icon type='setting' width='2rem' height='2rem' />
          <Card.Title>Settings</Card.Title>
        </Flex.Row.Start.Center>

        <Flex.Row.Between width='100%' padding='0 0 1rem 0'>
          <Card.Title.H3>테마</Card.Title.H3>
          <div>
            <Select
              name='by'
              value={input.state}
              onChange={(name, value) => {
                if (value === 'system') {
                  const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                  input.onChange('mode', mode)
                }
                input.onChange(name, value)
              }}
            >
              <Select.Option value='system'>시스템 설정</Select.Option>
              <Select.Option value='user'>사용자 설정</Select.Option>
            </Select>
          </div>
        </Flex.Row.Between>

        <Flex.Row.Between width='100%' padding='0 0 1rem 0'>
          <Card.Title.H3>다크 모드</Card.Title.H3>
          <Io.ToggleButton
            name='mode'
            valueMap={['light', 'dark']}
            value={input.state}
            onChange={input.onChange}
            inactiveIcon={<Icon type='sun' color='#000000' />}
            activeIcon={<Icon type='moon' color='#ffffff' />}
            disabled={input.state.by === 'system'}
          />
        </Flex.Row.Between>

        <Flex.Row.Between width='100%' padding='0 0 1rem 0'>
          <Card.Title.H3>테스트</Card.Title.H3>
          <Io.ToggleButton name='test1' value={input2.state} onChange={input2.onChange} />
        </Flex.Row.Between>
      </Card.Section>
    </Card>
  )
}

export default Settings
