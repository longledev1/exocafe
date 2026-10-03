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
  // Chỉ hiển thị SplashScreen 1 lần duy nhất trong phiên truy cập
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('exocafe_splash_seen')
    }
    return false
  })

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem('exocafe_splash_seen', 'true')
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
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
