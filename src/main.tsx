import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ShoppingProvider } from "./context/Shopping/ShoppingProvider.tsx"
import { ProductProvider } from "./context/Products/ProductsProvider.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductProvider>
      <ShoppingProvider>
        <App />
      </ShoppingProvider>
    </ProductProvider>
  </React.StrictMode>,
)
