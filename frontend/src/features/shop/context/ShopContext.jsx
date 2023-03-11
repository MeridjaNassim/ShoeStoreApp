import React from "react"
import productsAPI from "../api/request"
const initialState = {
    products: [],
    loading: false,
    error: null,
}

const ShopContext = React.createContext(initialState)


export function ShopProvider({ children }) {
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const data = await productsAPI.getProducts()
            setProducts(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    React.useEffect(()=> {
        fetchProducts()
    }, [])

    return <ShopContext.Provider value={{ products, loading, error }}>
        {children}
    </ShopContext.Provider>
}


export const useShop = () => React.useContext(ShopContext)

export default ShopContext