import React from 'react'
import ErrorBoundary from './containers/ErrorBoundary'
import Navbar from '@/components/Navbar'
import Main from '@/components/Main'
import ProductList from '@/containers/ProductList'

const App = () => {
  return (
    <ErrorBoundary>
      <Navbar />
      <Main>
        <ProductList />
      </Main>
    </ErrorBoundary>
  )
}

export default App
