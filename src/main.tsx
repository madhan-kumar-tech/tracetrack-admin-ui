import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PageLoader } from './components/ui/loaders'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<PageLoader />}>
      <App />
    </Suspense>
  </StrictMode>,
)
