import React from 'react'
import ErrorBoundary from './containers/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
        <h1>Successful mount</h1>
    </ErrorBoundary>
  )
}

export default App
