import React, { useState } from 'react'
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

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <footer>
      <Flex.Row xAlign='center' padding='0.5rem' gap='6rem'></Flex.Row>
    </footer>
  )
}

export default Footer
