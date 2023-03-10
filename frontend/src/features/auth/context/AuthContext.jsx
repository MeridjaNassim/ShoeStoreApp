import React from 'react'
import { default as loginAPI } from '../login/api/request'
import { useNavigate } from 'react-router-dom'
const initialState = {
    user: null,
    isFetching: false,
    error: null,
    isLoggedIn: false,
    actions: {}
}


const AuthContext = React.createContext(initialState)


export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null)
    const [isFetching, setIsFetching] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const navigate = useNavigate()
    const loginWithUsernameOrEmail = async (usernameOrEmail, password) => {
        try {
            setIsFetching(true)
            const user = await loginAPI.loginWithUsernameOrEmail(usernameOrEmail, password)
            setUser(user)
            setIsLoggedIn(true)
            setIsFetching(false)
            navigate('/')
        } catch (err) {
            setError(err)
            setIsFetching(false)
        }
    }



    return <AuthContext.Provider

        value={{
            user,
            isFetching,
            error,
            isLoggedIn,
            actions: {
                loginWithUsernameOrEmail
            }
        }}

    >
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => React.useContext(AuthContext)
export default AuthContext