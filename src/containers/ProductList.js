import React from 'react'
import { filterOptions, furnitureStyles } from '@/constants'

const ProductList = () => {
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
      </div>

      <div>
        <div className="border border-gray-400 rounded-md px-4 py-2 mb-3">
          <div className="text-lg">Sofa L Jobi</div>
          <div className="text-xl font-bold mb-1">Rp. 5.000.000</div>
          <div className="my-2">
            <div className="inline-block text-xs rounded bg-gray-200 text-black px-2 mr-2">
              Classic
            </div>
            <div className="inline-block text-xs rounded bg-gray-200 text-black px-2 mr-2">
              Midcentury
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Delivery Time</div>
            <div className="text-sm">14 days</div>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Buy
          </button>
          <div className="hidden">
            Selama Anda dapat berkumpul bersama keluarga dan orang-orang
            terdekat, duduk di manapun mungkin rasanya tidak menjadi masalah
            untuk Anda. Akan tetapi, dengan berkumpul bersama menggunakan Jobi L
            Sofa, suasana quality time Anda akan terasa 180 derajat
            perubahannya.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
