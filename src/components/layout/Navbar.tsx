import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, Sparkles } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Sanctuaries', to: '/services' },
  { label: 'The Edit', to: '/shop' },
  { label: 'Mishti', to: '/mishti', icon: <Sparkles className="w-3 h-3 text-gold" /> },
  { label: 'Journal', to: '/journal' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { totals } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center',
        scrolled ? 'bg-dark/95 backdrop-blur-md border-b border-gold/10' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center group">
          <span className="font-playfair italic text-2xl text-gold tracking-[0.2em] transition-transform duration-500 group-hover:scale-105">
            RARE<sup className="text-[10px] ml-0.5">•</sup>
          </span>
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'relative text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 flex items-center gap-1.5',
                pathname === link.to ? 'text-gold' : 'text-cream/70 hover:text-gold'
              )}
            >
              {link.icon}
              {link.label}
              {pathname === link.to && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <button className="text-cream/70 hover:text-gold transition-colors duration-300">
            <Search className="w-4.5 h-4.5" />
          </button>

          <Link to="/cart" className="relative group">
            <ShoppingBag className="w-4.5 h-4.5 text-cream/70 group-hover:text-gold transition-colors duration-300" />
            <AnimatePresence>
              {totals.itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-rose text-cream text-[9px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-medium"
                >
                  {totals.itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link to="/dashboard" className="text-cream/70 hover:text-gold transition-colors duration-300">
            <User className="w-4.5 h-4.5" />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-cream/80"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-dark z-40 md:hidden flex flex-col p-8 gap-8 border-t border-gold/10"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-xl font-playfair text-cream/90 flex items-center gap-3 border-b border-gold/5 pb-4"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
