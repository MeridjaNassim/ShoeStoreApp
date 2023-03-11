import { Link } from "react-router-dom"
import SignupForm from "../../features/auth/signup/components/SignupForm"

function Login() {
    return (
        <div className="h-full grid place-items-center">
            <div className="py-16 md:py-24  max-w-5xl flex flex-col space-y-10 md:flex-row mx-auto md:space-x-10 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold">Welcome to ShoeStore</h1>
                    <p className="text-gray-500">Create your account</p>
                    <SignupForm/>
                    <Link to="/login" className="text-slate-900 font-bold">Already have an account?</Link>
                </div>
                <div>
                    <img className="rounded-lg drop-shadow-2xl"  alt="ShoeStore" src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"></img>
                </div>
            </div>
        </div>

    )
}

export default Login