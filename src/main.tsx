import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from '@/App.tsx'
import WindowInfoProvider from '@/components/global/window_info_provider.tsx'

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <WindowInfoProvider>
      <App />
    </WindowInfoProvider>
  </RecoilRoot>
)
