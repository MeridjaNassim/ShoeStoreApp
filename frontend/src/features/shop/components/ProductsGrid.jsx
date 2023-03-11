import React from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
function ProductsGrid() {
    const { products, loading } = useShop()

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 my-10">
            {products.map(product => <div key={product._id.$oid}>
                <Link to={`./${product._id.$oid}`}>
                    <ProductCard {...product} />
                </Link>
            </div>)}
        </div>
    )
}

export default ProductsGrid