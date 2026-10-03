import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MemberWelcomeModal from '../components/MemberWelcomeModal'

export default function MainLayout() {
  return (
    <div className="bg-brand-bg selection:bg-brand-accent flex min-h-screen flex-col justify-between selection:text-white">
      {/* 1. Header & Navigation */}
      <Header />

      {/* 2. Main content area for routed components */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 3. Aesthetic Footer */}
      <Footer />

      {/* 4. Welcome Membership Promo Modal */}
      <MemberWelcomeModal />
    </div>
  )
}
