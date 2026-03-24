import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, OptimizedImage, SectionLabel } from '@/components/ui'
import { useLogin } from '@/hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login.mutate({ email, password }, {
      onSuccess: (data) => {
        localStorage.setItem('ra_user', JSON.stringify(data))
        toast.success(`Welcome back, ${data.name}. Your ritual awaits.`)
        navigate('/dashboard')
      },
      onError: () => {
        toast.error('The sanctuary doors are closed. Please verify your credentials.')
      }
    })
  }

  return (
    <div className="min-h-screen bg-cream flex overflow-hidden">
      {/* Left: Immersive Visual */}
      <div className="hidden lg:block lg:w-1/2 relative bg-dark">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=1200&q=90" 
          alt="Luxury Skincare Sanctuary" 
          className="w-full h-full object-cover opacity-60 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
        <div className="absolute bottom-20 left-20 max-w-md space-y-6">
          <SectionLabel text="The Sanctuary" />
          <h2 className="font-playfair text-5xl text-cream leading-tight italic">
            Return to your <br /> <em className="text-gold">Ritual.</em>
          </h2>
          <p className="text-cream/50 text-sm leading-relaxed font-light">
            Access your personalized skin intelligence, upcoming sanctuary appointments, and curated orders.
          </p>
        </div>
      </div>

      {/* Right: Authentication Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-24 py-12 relative">
        <Link to="/" className="absolute top-12 left-12 lg:left-24 font-playfair italic text-2xl text-dark tracking-[0.2em]">
          RARE<sup className="text-[10px] ml-0.5">•</sup>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto space-y-12"
        >
          <div className="space-y-4">
            <h1 className="font-playfair text-4xl text-dark">Welcome <em className="text-rose italic">Home</em></h1>
            <p className="text-mauve text-sm font-light">Enter your credentials to enter the sanctuary.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2 relative group">
                <label className="text-[10px] uppercase tracking-[3px] text-mauve/60 font-medium ml-1">Email Ritual</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve/40 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="sarah@rarewellness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-linen border-none p-5 pl-12 text-sm text-dark placeholder:text-mauve/30 focus:ring-1 focus:ring-gold outline-none transition-all rounded-sm shadow-inner" 
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] uppercase tracking-[3px] text-mauve/60 font-medium">Your Key</label>
                  <button type="button" className="text-[9px] uppercase tracking-widest text-mauve/40 hover:text-gold transition-colors">Recover</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve/40 group-focus-within:text-gold transition-colors" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-linen border-none p-5 pl-12 pr-12 text-sm text-dark placeholder:text-mauve/30 focus:ring-1 focus:ring-gold outline-none transition-all rounded-sm shadow-inner" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-mauve/30 hover:text-dark transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="default" 
              className="w-full h-16 text-xs tracking-[4px] group"
              isLoading={login.isPending}
            >
              Enter Sanctuary <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark/5" /></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest"><span className="bg-cream px-4 text-mauve/40">Or enter via</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-14 bg-linen hover:bg-linen/50 border border-dark/5 transition-colors rounded-sm text-[10px] uppercase tracking-widest text-dark font-medium">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 opacity-70" alt="" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 h-14 bg-linen hover:bg-linen/50 border border-dark/5 transition-colors rounded-sm text-[10px] uppercase tracking-widest text-dark font-medium">
              <img src="https://www.apple.com/favicon.ico" className="w-4 h-4 opacity-70" alt="" /> Apple
            </button>
          </div>

          <p className="text-center text-mauve text-xs font-light">
            New to the ritual? {' '}
            <Link to="/signup" className="text-gold font-medium hover:underline underline-offset-4">Join RARE</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
