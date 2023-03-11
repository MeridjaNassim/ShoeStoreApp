import React from 'react'

function CartProduct(product) {
    const priceInUSD = product.price.find(price => price.currency === 'USD')
    return (
        <div className='flex items-center w-full'>
            <div className='flex flex-col md:flex-row items-center gap-4 w-2/3'>
                <div className='w-40 h-40'>
                    <img className='object-cover w-full h-full' src={product.image} alt={product.name} ></img>
                </div>
                <h3 className='text-4xl text-slate-900'>{product.name}</h3>
                <p className='text-4xl font-bold text-slate-900 md:ml-auto'>{priceInUSD.value}$</p>

            </div>
            <div className='flex flex-col md:flex-row w-1/3 justify-center gap-2'>
                <div>
                    <button className='bg-slate-900 text-white text-lg font-bold px-4 py-2 rounded-md mx-2 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 ease-in'>+</button>
                </div>
                <div>
                    <p className='text-4xl font-bold text-slate-900'>{product.quantity}</p>
                </div>
                <div>
                    <button className='bg-slate-900 text-white text-lg font-bold px-4 py-2 rounded-md mx-2 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 ease-in'>-</button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct