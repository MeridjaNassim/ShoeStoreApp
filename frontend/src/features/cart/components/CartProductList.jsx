import React from 'react'
import { useCart } from '../context/CartContext'
import CartProduct from './CartProduct'
function CartProductList() {

    const { products } = useCart()
    return (
        <div className='flex flex-col gap-4'>
            {products.map(product => {
                return <CartProduct {...product} />
            })}
        </div>
    )
}

export default CartProductList