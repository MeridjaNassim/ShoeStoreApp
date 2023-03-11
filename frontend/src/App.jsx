import React from "react"
import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./util/components/protectedRoute"
import Profile from "./pages/profile"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Cart from "./pages/cart"
import RootLayout from "./layouts/root"
import RegistrationLayout from "./layouts/registration"
import Shop from "./pages/shop"

function App() {
  return <Routes>
    <Route element={<RegistrationLayout />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>
    <Route element={<RootLayout />}>
      <Route path="/" element={<>Home</>} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/shop/:id" element={<>Product ID</>} />
      <Route path="/cart" element={<ProtectedRoute />}>
        <Route index element={<Cart />} />
      </Route>
      <Route path="/profile" element={<ProtectedRoute />}>
        <Route index element={<Profile />} />
      </Route>
    </Route>

  </Routes>
}

export default App
