import Footer from "./components/footer"
import { Outlet } from "react-router-dom"
function RegistrationLayout() {
    return (
        <>
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default RegistrationLayout