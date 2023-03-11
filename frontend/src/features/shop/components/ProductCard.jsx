import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
function ProductCard(product) {

    const renderStars = (rating)=>{
        let stars = []
        for (let i = 0; i < Math.round(rating); i++) {
            stars.push(<StarIcon className="w-4 text-yellow-500" />)
        }
        return stars
    }
    const priceInUSD = product.price.find(price => price.currency === 'USD')
    return (
        <div className='p-2'>
            <div className='h-90 w-full'>
                <img src={product.image} alt={product.name} className="object-contain w-full h-full max-h-full max-w-full"  />
            </div>
            <h3 className='my-4 text-xl'>{product.name}</h3>
            <div className='flex items-center gap-3'>
               <span>
                <ul className='flex space-x-1'>
                    {renderStars(product.rating).map((star, index) => <li key={index}>{star}</li>)}
                </ul>
                </span> <span className="text-slate-500">({product.rating})</span>
            </div>
            <p className='text-3xl font-bold'>
                {priceInUSD.value} $
            </p>
        </div>
    )
}

export default ProductCard