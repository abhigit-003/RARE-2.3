import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Toaster } from 'sonner'
import { CartProvider } from '@/context/CartContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui'
import HomePage from '@/pages/HomePage'
import ServicesPage from '@/pages/ServicesPage'
import ShopPage from '@/pages/ShopPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import MishtiPage from '@/pages/MishtiPage'
import JournalPage from '@/pages/JournalPage'
import DashboardPage from '@/pages/DashboardPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

const queryClient = new QueryClient()

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-dark">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:id', element: <ProductDetailPage /> },
      { path: 'mishti', element: <MishtiPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: '*', element: <HomePage /> },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
