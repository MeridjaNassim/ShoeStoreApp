import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import { AuthProvider } from './features/auth/context/AuthContext'
import { ShopProvider } from './features/shop/context/ShopContext'
import { CartProvider } from './features/cart/context/CartContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ShopProvider>
            <App />
          </ShopProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
