import Icon from '@/components/common/icon'
import useUserManager from '@/hooks/user/useUserManager'
import React from 'react'
import { Card } from '@/components/layout/card'
import { Flex } from '@/components/layout/flex'

const MyInfo = () => {
  const { user } = useUserManager()

  return (
    <Card>
      <Flex.Row gap='0.5rem' height='auto'>
        <div style={{ border: '1px solid #eeeeee', borderRadius: '50%', overflow: 'hidden' }}>
          <Icon type='user' width='3rem' height='3rem' />
        </div>
        <Card.Title>{user?.name}</Card.Title>
      </Flex.Row>
    </Card>
  )
}

export default MyInfo
