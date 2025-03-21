import { BrowserRouter } from 'react-router-dom'
import '@/styles/common/common.scss'
import RouterRoot from '@/pages/router_root'
import PopupPortal from '@/components/popup/popup_portal'

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterRoot />
        <PopupPortal />
      </BrowserRouter>
    </>
  )
}

export default App
