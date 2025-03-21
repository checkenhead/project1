import useUserManager from '@/hooks/user/useUserManager'
import useInputState from '@/hooks/util/useInputState'
import Popup, { usePopup } from '@/hooks/util/usePopup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import useCustomState from '@/hooks/util/useCustomState'
import Header from '@/components/layout/header'
import Button from '@/components/io/button'
import SideMenu from '@/components/layout/side_menu'
import Icon from '@/components/common/icon'
import MyInfo from '@/components/user/my_info'
import Settings from '@/components/settings'
import Footer from '@/components/layout/footer'
import Select2, { Select } from '@/components/io/select'
import { Card } from '@/components/layout/card'
import { Flex } from '@/components/layout/flex'
import { Input } from '@/components/io/input'
import Feed from '@/components/feed/feed'
import WhiteBoard from '@/components/WhiteBoard'

enum POPUP_INDEX {
  CLOSED,
  MY_PAGE,
  SEARCH,
  BOOKMARK,
  MENTIONS,
  SETTINGS,
}

const Home = () => {
  const navigate = useNavigate()
  // const [activeIndex, setActiveIndex] = useState<number>(0)
  const { user, logout } = useUserManager()
  // const [data, validation] = useCustomState({ str: '', num: 0, obj: { a: 1, b: '123', c: 10 as 10 | 20 | 30 } })

  const [input, validation2] = useInputState({ test: '' })
  const { alert, confirm, toast } = usePopup()
  const [popupIndex, setPopupIndex] = useState(POPUP_INDEX.CLOSED)

  const testOptions = [
    { name: 'kim' },
    { name: 'park' },
    { name: 'cha' },
    { name: 'kim' },
    { name: 'lee' },
    { name: 'kang' },
  ]

  // console.log('validation', validation.result)
  const [test, v] = useInputState({ test: [] as File[] })
  console.log('test', test)

  return (
    <>
      {/*<Header />*/}

      <Flex.Row.Between width='100%' height='100%' gap='1rem' padding='0 5rem'>
        <Card elevated>
          <Flex.Col.Center padding='2rem' gap='0rem'>
            <div style={{ width: '80dvw', height: '80dvh' }}>
              <WhiteBoard />
            </div>
            {/*<Input.File label='upload' multiple name='test' onChange={test.onChange} />*/}

            {/*<Select2*/}
            {/*  name={''}*/}
            {/*  options={[*/}
            {/*    { node: '123', value: 1 },*/}
            {/*    { node: '234', value: 2 },*/}
            {/*    { node: '345678', value: 3 },*/}
            {/*    { node: '456', value: 4 },*/}
            {/*    { node: '567', value: 5 },*/}
            {/*    { node: '6789000', value: 6 },*/}
            {/*  ]}*/}
            {/*  onChange={() => {}}*/}
            {/*/>*/}
            {/*<Select2 />*/}

            {/*<Feed />*/}
            {/*<Feed />*/}
            {/*<Feed />*/}
            {/*<Feed />*/}
          </Flex.Col.Center>
        </Card>
        {/*<Feed />*/}

        <Flex.Col.Start height='100%'>
          {/*<div style={{ width: '100%', height: '100%', border: '1px dashed black' }}></div>*/}
        </Flex.Col.Start>
      </Flex.Row.Between>
      {/*<Header />*/}
      {/*<Flex.Col.Start.Center>*/}
      {/*  main content*/}
      {/*  <Button*/}
      {/*    onClick={() => {*/}
      {/*      alert({ title: 'alert test', message: 'this is alert test' })*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    alert*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    onClick={() => {*/}
      {/*      toast({ title: 'toast test', message: 'this is toast test' })*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    toast*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    onClick={() => {*/}
      {/*      confirm({ title: 'confirm test', message: 'this is confirmed test' })*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    confirm*/}
      {/*  </Button>*/}
      {/*  <Card outlined>*/}
      {/*    <Card.Section padding='3rem'>*/}
      {/*      <Flex.Col height='auto'>*/}
      {/*        <Select*/}
      {/*          placeholder='선택'*/}
      {/*          options={testOptions.map((option) => ({ node: option.name, value: option.name }))}*/}
      {/*          name='test'*/}
      {/*          value={input.state}*/}
      {/*          onChange={input.onChange}*/}
      {/*        />*/}
      {/*        /!*<Select*!/*/}
      {/*        /!*  placeholder='선택'*!/*/}
      {/*        /!*  options={testOptions.map((option) => ({ node: option.name, value: option.name }))}*!/*/}
      {/*        /!*  name='test'*!/*/}
      {/*        /!*  value={input.state}*!/*/}
      {/*        /!*  onChange={input.onChange}*!/*/}
      {/*        /!*<Select2></Select2>*!/*/}
      {/*      </Flex.Col>*/}
      {/*    </Card.Section>*/}
      {/*  </Card>*/}
      {/*</Flex.Col.Start.Center>*/}

      <SideMenu.Wrapper>
        <div>
          <SideMenu.Item
            icon='home'
            description='Home'
            onClick={() => {
              navigate(`/${user?.name}`)
            }}
          />
          <SideMenu.Item icon='user' description='My Page' onClick={() => setPopupIndex(POPUP_INDEX.MY_PAGE)} />
          <SideMenu.Item icon='search' description='Search' onClick={() => setPopupIndex(POPUP_INDEX.SEARCH)} />
          <SideMenu.Item icon='bookmark' description='Bookmark' onClick={() => setPopupIndex(POPUP_INDEX.BOOKMARK)} />
          <SideMenu.Item icon='atSign' description='Mentions' onClick={() => setPopupIndex(POPUP_INDEX.MENTIONS)} />
        </div>

        <div>
          <SideMenu.Item
            icon='setting'
            rotateAnimation
            description='Settings'
            onClick={() => setPopupIndex(POPUP_INDEX.SETTINGS)}
          />
          <SideMenu.Item
            icon='logout'
            description='Logout'
            onClick={() =>
              confirm({
                title: '로그아웃',
                message: '로그아웃 하시겠습니까?',
                buttons: [
                  {
                    content: '취소',
                    callback: (close) => close(),
                  },
                  {
                    content: (
                      <Flex.Row.Center gap='0.5rem'>
                        로그아웃
                        <Icon type='logout' width='1rem' height='1rem' />
                      </Flex.Row.Center>
                    ),
                    submit: true,
                    callback: (close) => {
                      logout()
                      close()
                    },
                  },
                ],
              })
            }
          />
        </div>
      </SideMenu.Wrapper>

      <Popup.Controller open={popupIndex} onClose={() => setPopupIndex(POPUP_INDEX.CLOSED)}>
        <Popup.Container popupIndex={POPUP_INDEX.MY_PAGE}>
          <MyInfo />
        </Popup.Container>
        <Popup.Container popupIndex={POPUP_INDEX.SEARCH}>
          <Flex.Col width='500px' height='500px' padding='2rem'>
            SEARCH
          </Flex.Col>
        </Popup.Container>
        <Popup.Container popupIndex={POPUP_INDEX.BOOKMARK}>
          <Flex.Col width='500px' height='500px' padding='2rem'>
            BOOKMARK
          </Flex.Col>
        </Popup.Container>
        <Popup.Container popupIndex={POPUP_INDEX.MENTIONS}>
          <Flex.Col width='500px' height='500px' padding='2rem'>
            MENTIONS
          </Flex.Col>
        </Popup.Container>
        <Popup.Container dim='blur' popupIndex={POPUP_INDEX.SETTINGS}>
          <Settings />
        </Popup.Container>
      </Popup.Controller>

      {/*<Footer />*/}
    </>
  )
}

export default Home
