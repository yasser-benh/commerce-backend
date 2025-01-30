import React from 'react'
import { Product } from '../types'



interface ProductCardProps {
    product : Product
} 





const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div>
        <div className="bg-white p-4 shadow-md rounded-lg">
        <img src={product.image} />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-xl font-bold mt-2">${product.price}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Add to Cart
        </button>
      </div>
      
    </div>
  )
}

export default ProductCard
