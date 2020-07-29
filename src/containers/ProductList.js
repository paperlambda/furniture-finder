import React from 'react'
import { filterOptions, furnitureStyles } from '@/constants'
import ProductCard from '@/containers/ProductCard'

const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT':
      return { ...state, products: action.products }
    case 'APPLY_FILTER':
      return { ...state, filter: action.filter }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

const ProductList = () => {
  const [product, productDispatch] = React.useReducer(productReducer, {
    products: [],
    filter: null,
    loading: false
  })

  React.useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      productDispatch({ type: 'SET_LOADING', loading: true })
      const response = await fetch(
        'http://www.mocky.io/v2/5c9105cb330000112b649af8'
      )
      const { products } = await response.json()
      productDispatch({ type: 'FETCH_PRODUCT', products })
      productDispatch({ type: 'SET_LOADING', loading: false })
    } catch (e) {
      console.error(e)
      productDispatch({ type: 'SET_LOADING', loading: false })
    }
  }

  return (
    <div>
      <div className="py-2">
        <div>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Search furniture name e.g Jobi, Arsa"
          />
        </div>
        <div className="text-xs text-gray-600">Delivery time</div>
        <div className="flex align-center mb-2">
          {filterOptions.map((filter, index) => (
            <label
              className="py-1 mr-4 text-sm"
              key={index}
              htmlFor={`filter-${index}`}
            >
              <input
                value={filter.value}
                id={`filter-${index}`}
                type="checkbox"
              />{' '}
              {filter.label}
            </label>
          ))}
        </div>
        <div className="text-xs text-gray-600">Furniture styles</div>
        <div className="flex flex-wrap align-center">
          {furnitureStyles.map((fStyle, index) => (
            <label
              className="py-1 mr-4 text-sm"
              key={index}
              htmlFor={`style-${fStyle}`}
            >
              <input value={fStyle} id={`style-${fStyle}`} type="checkbox" />{' '}
              {fStyle}
            </label>
          ))}
        </div>
        <button className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded mt-2 text-md">
          Apply filter
        </button>
      </div>
      {product.loading && <div className="mt-3">Loading...</div>}
      {!product.loading && (
        <div className="mt-3">
          {product.products.map((prdct, index) => (
            <ProductCard key={index} product={prdct} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
