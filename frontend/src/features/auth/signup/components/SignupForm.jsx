import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../../context/AuthContext';

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

function SignupForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = React.useState(false)

    const { actions: { signupUserWithEmailAndUsername }, isFetching, error } = useAuth()

    const onSubmit = handleSubmit(async (data) => {
        await signupUserWithEmailAndUsername({
            username: data.username,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName
        })
    })
    return (
        <form onSubmit={onSubmit} className='py-6 px-2 flex flex-col gap-4'>
            {error && <div className='text-red-500'>Error while login: {error?.message}</div>}
            {isFetching && <div className='text-green-500'>Signing up...</div>}
            <div className='flex flex-col'>
                <label htmlFor="username">Username</label>
                <input className='border-gray-800 border-2 rounded-sm px-4 py-2' type="text" {...register("username", {
                    required: "Username is required",
                })} ></input>
                {errors.username && <p className='text-red-600 text-sm'>{errors.username.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="username">Email</label>
                <input className='border-gray-800 border-2 rounded-sm px-4 py-2' type="email" {...register("email", {
                    required: "Email is required",
                    validate: (value) => validateEmail(value) || "Email is not valid"
                })} ></input>
                {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
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
            <div className='flex flex-col'>
                <label htmlFor="confirmPassword">Confirm Password
                    <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}> (e) </span>
                </label>
                <input className='border-gray-800 border-2 rounded-sm px-4 py-2' type={showPassword ? "text" : "password"} {...register("confirmPassword", {
                    required: "Confirm password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    },
                    validate: (value) => value === watch('password') || "Passwords do not match"
                })} ></input>
                {errors.confirmPassword && <p className='text-red-600 text-sm'>{errors.confirmPassword.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="firstName">First Name</label>
                <input className='border-gray-800 border-2 rounded-sm px-4 py-2' type="text" {...register("firstName", {
                    required: "First Name is required",
                })} ></input>
                {errors.firstName && <p className='text-red-600 text-sm'>{errors.firstName.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="lastName">Last Name</label>
                <input className='border-gray-800 border-2 rounded-sm px-4 py-2' type="text" {...register("lastName", {
                    required: "Last Name is required",
                })} ></input>
                {errors.lastName && <p className='text-red-600 text-sm'>{errors.lastName.message}</p>}
            </div>
            <div>
                <button className='bg-gray-800 text-white px-4 py-2 rounded-sm' type="submit">Sign up</button>
            </div>
        </form>
    )
}

export default SignupForm