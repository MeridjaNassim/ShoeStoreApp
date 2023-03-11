import { Link, Outlet } from "react-router-dom"
import Footer from "./components/footer"
import { HomeIcon, ShoppingCartIcon, BuildingStorefrontIcon, UserIcon } from "@heroicons/react/24/solid"
import { useAuth } from "../features/auth/context/AuthContext"
import { useCart } from "../features/cart/context/CartContext"
function RootLayout() {
    const { isLoggedIn, actions: authActions } = useAuth()
    const { actions: cartActions } = useCart()

    const cartCount = cartActions.getProductsCount()
    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-slate-50 px-24 py-6 gap-4 flex flex-col justify-center md:gap-0 md:flex-row md:justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">ShoeStore</h1>
                </div>
                <div>
                    <nav className="flex space-x-4 items-center text-slate-900">
                        <Link to="/" className="flex items-center gap-1">
                            <HomeIcon className="w-6" /> Home
                        </Link>
                        <Link to="/shop" className="flex items-center gap-1"><BuildingStorefrontIcon className="w-6" />Shop</Link>
                        <Link to="/cart" className="flex items-center gap-1">
                            <div className="relative">
                                <ShoppingCartIcon className="w-6" />
                                {(cartCount === "+99" || cartCount > 0) && <span className="absolute top-4 -right-1 w-4 h-4 text-center bg-red-500 text-xs rounded-full text-white">{cartActions.getProductsCount()}</span>}
                            </div>
                            Cart</Link>
                        <Link to="/profile" className="flex items-center gap-1"><UserIcon className="w-6" />Profile</Link>

                        {
                            isLoggedIn ? <>
                                <button className="p-2 text-white bg-red-900 rounded-lg" onClick={authActions.logout}>Logout</button>
                            </> : <>
                                <Link className="p-2 text-white bg-slate-900 rounded-lg" to="/login">Login</Link>
                                <Link className="p-2 text-white bg-slate-900 rounded-lg" to="/signup">Signup</Link>
                            </>
                        }

                    </nav>
                </div>
            </header>
            <main className="pt-24 min-h-screen max-w-5xl mx-auto">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default RootLayout