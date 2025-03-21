import Io from 'components/io'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/layout/card'

const MyPage = () => {
  const navigate = useNavigate()

  return (
    <Card>
      <Io.Button
        onClick={() => {
          // navigate(-1)
          navigate(-1)
        }}
      >
        뒤로가기
      </Io.Button>
    </Card>
  )
}

export default MyPage
