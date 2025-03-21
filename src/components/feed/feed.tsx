import { Card } from '@/components/layout/card'
import { Flex } from '@/components/layout/flex'
import Icon from '@/components/common/icon'

const Feed = () => {
  return (
    <Card outlined elevated>
      <Card.Section width='25rem' padding='0.75rem'>
        <Card.Title>아이디</Card.Title>

        <div>...content...</div>
        <div>...content...</div>
        <div>...content...</div>
        <div>...content...</div>

        <div>...content...</div>
        <div>...content...</div>
        <div>...content...</div>
        <div>...content...</div>

        <Flex.Row.Start>
          <Icon type='user' width='1.5rem' height='1.5rem' />
        </Flex.Row.Start>
      </Card.Section>
    </Card>
  )
}

export default Feed
