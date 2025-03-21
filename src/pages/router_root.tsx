import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import AuthenticationFilter from '@/components/global/authentication_filter'
import { AUTHORITIES } from '@/util/constance/authorities'
import Icon from '@/components/common/icon'
import { Flex } from '@/components/layout/flex'

const Loading = () => (
  <Flex.Row.Center width='100dvw' height='100dvh'>
    <Icon type='loading' width='2rem' height='2rem' />
  </Flex.Row.Center>
)

const Index = lazy(() => import('@/pages/index'))
const Login = lazy(() => import('@/pages/login'))
const Join = lazy(() => import('@/pages/join'))
const Home = lazy(() => import('@/pages/home'))
const MyPage = lazy(() => import('@/pages/user/my_page'))
const AdminPage = lazy(() => import('@/pages/admin/admin_page'))
const PageNotFound = lazy(() => import('@/pages/page_not_found'))

const RouterRoot = () => {
  const location = useLocation()

  return (
    <Suspense fallback={<Loading />}>
      <Routes location={location}>
        <Route element={<AuthenticationFilter key={location.pathname} allow={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />}>
          <Route path='/:id' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/mypage' element={<MyPage />} />
        </Route>
        <Route element={<AuthenticationFilter key={location.pathname} allow={[AUTHORITIES.ADMIN]} />}>
          <Route path='/admin' element={<AdminPage />} />
        </Route>
        <Route element={<AuthenticationFilter key={location.pathname} allow={[AUTHORITIES.ANONYMOUS_ONLY]} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
        </Route>
        <Route element={<AuthenticationFilter key={location.pathname} allow={[AUTHORITIES.ALL]} />}>
          <Route path='/' element={<Index />} />
          <Route path='/*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default RouterRoot
