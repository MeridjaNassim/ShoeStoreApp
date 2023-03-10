import { Link, Outlet } from "react-router-dom"
import Footer from "./components/footer"
function RootLayout() {
    return (
        <>
            <header className="px-24 py-4 gap-4 flex flex-col justify-center md:gap-0 md:flex-row md:justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">ShoeStore</h1>
                </div>
                <div>
                    <nav className="flex space-x-4 items-center">
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/products">Products</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/profile">Profile</Link>
                        <Link className="p-2 text-white bg-slate-900 rounded-lg" to="/login">Login</Link>
                        <Link className="p-2 text-white bg-slate-900 rounded-lg" to="/signup">Signup</Link>
                    </nav>
                </div>
            </header>
            <main className="min-h-screen max-w-5xl mx-auto">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default RootLayout