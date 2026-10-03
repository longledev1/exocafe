import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Inspiration from './pages/Inspiration'
import Store from './pages/Store'
import Membership from './pages/Membership'
import SplashScreen from './components/SplashScreen'

function App() {
  // Tạm thời tắt intro splash screen theo yêu cầu
  const [showSplash, setShowSplash] = useState(false)

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="inspiration" element={<Inspiration />} />
            <Route path="store" element={<Store />} />
            <Route path="cua-hang" element={<Store />} />
            <Route path="membership" element={<Membership />} />
            <Route path="thanh-vien" element={<Membership />} />
            {/* Cấu hình thêm các route dự phòng trỏ về Home */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
