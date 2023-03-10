import { Routes, Route } from "react-router-dom"
import Profile from "./pages/profile"
import Login from "./pages/login"
import RootLayout from "./layouts/root"
import RegistrationLayout from "./layouts/registration"

function App() {
  return <Routes>
    <Route element={<RegistrationLayout />}>
      <Route path="/signup" element={<>Signup</>} />
      <Route path="/login" element={<Login/>} />
    </Route>
    <Route element={<RootLayout />}>
      <Route path="/" element={<>Home</>} />
      <Route path="/products" element={<>Products</>} />
      <Route path="/products/:id" element={<>Product ID</>} />
      <Route path="/cart" element={<>Cart</>} />
      <Route path="/profile" element={<Profile />} />
    </Route>

  </Routes>
}

export default App
