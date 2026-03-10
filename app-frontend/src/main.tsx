import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { PUBLISHABLE_KEY } from './constants.ts'
import { ClerkProvider } from '@clerk/clerk-react'
import ProductCartProvider from './context/ProductCartProvider.tsx'

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ProductCartProvider>
          <App />
        </ProductCartProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode >,
)
