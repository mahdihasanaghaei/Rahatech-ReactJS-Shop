import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Shop from './pages/Shop/Shop'
import Cart from './pages/Cart/Cart'
import ShopContextProvider from './context/ShopContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Faq from './pages/FAQ/FAQ'
import Footer from './components/Footer'


function App() {

  const client = new QueryClient()

  return (
    <div className="w-full h-full">
      <QueryClientProvider client={client}>
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Shop />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/faq' element={<Faq />} />
            </Routes>
            <Footer />
          </Router>
        </ShopContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
