import React, { useState } from 'react'
import Icon from '@/components/common/icon'
import Io from '@/components/io'
import { useRecoilValue } from 'recoil'
import { Card } from '@/components/layout/card'
import { Flex } from '@/components/layout/flex'

const GNB_INDEX = {
  CLOSE: 0,
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  SIXTH: 6,
}

const Header = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <header>
      <Flex.Row xAlign='end' padding='2rem' gap='2rem'>
        <Io.DropDown name='gnb' icon={<Icon type='menu' width='3rem' height='3rem' />}>
          <Card outlined>
            <Flex.Col width='auto' height='auto' padding='1rem' backgroundColor='white' borderRadius='inherit'>
              <p>내 정보</p>
              <p>내 정보</p>
            </Flex.Col>
          </Card>
          {/*<div style={{ border: '1px solid gray', borderRadius: '0.5rem', backgroundColor: '#ffffff' }}></div>*/}

          {/*<Card.Section></Card.Section>*/}
        </Io.DropDown>

        <Io.DropDown name='gnb' icon={<Icon type='menu' width='3rem' height='3rem' />}>
          <Flex.Col gap='1rem' padding='1rem'>
            <Flex.Row gap='1rem'>
              <Icon type='user' width='3rem' height='3rem' />
            </Flex.Row>
          </Flex.Col>
        </Io.DropDown>

        <Io.DropDown name='gnb2' icon={<Icon type='menu' width='3rem' height='3rem' />}>
          <Flex.Col gap='1rem' padding='1rem'>
            <Flex.Row gap='1rem'>
              <Icon type='user' width='3rem' height='3rem' />
            </Flex.Row>
          </Flex.Col>
        </Io.DropDown>

        <Io.DropDown icon={<Icon type='menu' width='3rem' height='3rem' />}>
          <Flex.Col gap='1rem' padding='1rem'>
            <Flex.Row gap='1rem'>
              <Icon type='user' width='3rem' height='3rem' />
            </Flex.Row>
          </Flex.Col>
        </Io.DropDown>
      </Flex.Row>
    </header>
  )
}

export default Header
