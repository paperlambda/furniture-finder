import React from 'react'
import PropTypes from 'prop-types'
import formatPrice from '@/utils/price-format'

const ProductCard = ({ product }) => (
  <div className="border border-gray-400 rounded-md px-4 py-2 mb-3">
    <div className="text-lg">{product.name}</div>
    <div className="text-xl font-bold mb-1">{formatPrice(product.price)}</div>
    <div className="my-2">
      {product.furniture_style.map((fStyle, index) => (
        <div
          key={`fstyle-${index}`}
          className="inline-block text-xs rounded bg-gray-200 text-black px-2 mr-2"
        >
          {fStyle}
        </div>
      ))}
    </div>
    <div>
      <div className="text-xs text-gray-600">Delivery Time</div>
      <div className="text-sm">{product.delivery_time} days</div>
    </div>
    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
      Buy
    </button>
    <div className="hidden">{product.description}</div>
  </div>
)

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    furniture_style: PropTypes.array.isRequired,
    delivery_time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}

export default ProductCard
