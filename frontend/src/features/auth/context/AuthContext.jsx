import React from 'react'
import { default as loginAPI } from '../login/api/request'
import { default as signupAPI } from '../signup/api/request'
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

    const signupUserWithEmailAndUsername = async ({username, email, password, firstName, lastName}) => {
        try {
            setIsFetching(true)
            const user = await signupAPI.signupUserWithEmailAndUsername({username, email, password, firstName, lastName})
            setUser(user)
            setIsLoggedIn(true)
            setIsFetching(false)
            navigate('/')
        } catch (err) {
            setError(err)
            setIsFetching(false)
        }
    }

    const logout = ()=> {
        setUser(null)
        setIsLoggedIn(false)
        navigate('/login')
    }


    return <AuthContext.Provider

        value={{
            user,
            isFetching,
            error,
            isLoggedIn,
            actions: {
                loginWithUsernameOrEmail,
                signupUserWithEmailAndUsername,
                logout
            }
        }}

    >
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => React.useContext(AuthContext)
export default AuthContext