

import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import React from 'react'
import ProductPage from './pages/ProductPage'

const App: React.FC = () => {
  return (
    <Router>
    <div className='App'>
      <Routes>
        <Route path ='/' element={<ProductPage />}/>
      </Routes>
      
    </div>
    </Router>
  )
}

export default App
