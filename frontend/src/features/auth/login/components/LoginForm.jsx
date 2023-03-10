import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = React.useState(false)
    const { actions : {loginWithUsernameOrEmail}, isFetching, error } = useAuth()
    const onSubmit = handleSubmit(async (data) => {
        await loginWithUsernameOrEmail(data.usernameOrEmail, data.password)
    })
    return (
        <form onSubmit={onSubmit} className='py-6 px-2 flex flex-col gap-4'>
            {error && <div className='text-red-500'>Error while login: {error?.message}</div>}
            {isFetching && <div className='text-green-500'>Logging in...</div>}
            <div className='flex flex-col'>
                <label htmlFor="usernameOremail">Username or Email</label>
                <input className='border-gray-800 border-2 rounded-sm px-4 py-2' type="text" {...register("usernameOrEmail", {
                    required: "Username or Email is required",
                })} ></input>
                {errors.usernameOrEmail && <p className='text-red-600 text-sm'>{errors.usernameOrEmail.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password
                    <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}> (e) </span>
                </label>
                <input className='border-gray-800 border-2 rounded-sm px-4 py-2' type={showPassword ? "text" : "password"} {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }
                })} ></input>
                {errors.password && <p className='text-red-600 text-sm'>{errors.password.message}</p>}
            </div>
            <div>
                <button className='bg-gray-800 text-white px-4 py-2 rounded-sm' type="submit">Login</button>
            </div>
            <div>
                <Link to="/forgotPassword">Forgot Password?</Link>
            </div>
        </form>
    )
}

export default LoginForm