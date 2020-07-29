import React from 'react'
import { deliveryTimes, furnitureStyles } from '@/constants'
import ProductCard from '@/containers/ProductCard'
import stringMatcher from '@/utils/string-matcher'

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
  const [filters, setFilters] = React.useState({
    styles: furnitureStyles.reduce(
      (styles, style) => ({ ...styles, [style]: false }),
      {}
    ),
    deliveryTime: deliveryTimes.reduce(
      (times, time) => ({ ...times, [time.value]: false }),
      {}
    )
  })
  const [displayProducts, setDisplayProducts] = React.useState([])
  const [searchQuery, setQuery] = React.useState('')

  React.useEffect(() => {
    fetchProducts()
  }, [])

  React.useEffect(() => {
    filterProducts(product.products, product.filter)
  }, [product.products, product.filter])

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

  const filterProducts = (savedProduct, savedFilter) => {
    let filteredProducts = savedProduct

    if (savedFilter) {
      const { styles, deliveryTime, search } = savedFilter
      filteredProducts = product.products.filter(item => {
        const likelyMatchedName =
          search !== '' ? stringMatcher(search, item.name) : true

        const matchedStyle =
          styles.length > 0
            ? item.furniture_style.some(style => styles.includes(style))
            : true

        const matchedDeliveryTime =
          deliveryTime.length > 0
            ? findByDeliveryTime(item.delivery_time, deliveryTime)
            : true

        return likelyMatchedName && matchedStyle && matchedDeliveryTime
      })
    }

    setDisplayProducts(filteredProducts)
  }

  const findByDeliveryTime = (time, list) => {
    let moreThanOneMonth = false
    if (list.includes('0')) {
      moreThanOneMonth = parseInt(time) > 31
    }

    return moreThanOneMonth || list.some(tm => parseInt(time) <= tm)
  }

  const handleSearchChange = e => {
    const { value } = e.target
    setQuery(value)
  }

  const handleCheckboxChange = e => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: { ...filters[name], [value]: !filters[name][value] }
    })
  }

  const submitFilterForm = () => {
    const getFilter = Object.keys(filters).reduce((acc, obj) => {
      return {
        ...acc,
        [obj]: Object.entries(filters[obj])
          .filter(([_, value]) => value === true)
          .map(entry => entry[0])
      }
    }, {})
    productDispatch({
      type: 'APPLY_FILTER',
      filter: { ...getFilter, search: searchQuery }
    })
  }

  return (
    <div>
      <div className="py-2">
        <div>
          <input
            onChange={handleSearchChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Search furniture name e.g Jobi, Arsa"
          />
        </div>
        <div className="text-xs text-gray-600">Delivery time</div>
        <div className="flex align-center mb-2">
          {deliveryTimes.map((filter, index) => (
            <label
              className="py-1 mr-4 text-sm"
              key={index}
              htmlFor={`filter-${index}`}
            >
              <input
                value={filter.value}
                id={`filter-${index}`}
                type="checkbox"
                name="deliveryTime"
                onChange={handleCheckboxChange}
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
              <input
                name="styles"
                value={fStyle}
                id={`style-${fStyle}`}
                type="checkbox"
                onChange={handleCheckboxChange}
              />{' '}
              {fStyle}
            </label>
          ))}
        </div>
        <button
          onClick={submitFilterForm}
          className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded mt-2 text-md"
        >
          Apply filter
        </button>
      </div>
      {product.loading && <div className="mt-3">Loading...</div>}
      {!product.loading && (
        <div className="mt-3">
          {displayProducts.map((prdct, index) => (
            <ProductCard key={index} product={prdct} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
