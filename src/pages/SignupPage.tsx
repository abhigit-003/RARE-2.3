import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, OptimizedImage, SectionLabel } from '@/components/ui'
import { useSignup } from '@/hooks/useAuth'

export default function SignupPage() {
  const navigate = useNavigate()
  const signup = useSignup()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup.mutate({ name, email, password }, {
      onSuccess: (data) => {
        localStorage.setItem('ra_user', JSON.stringify(data))
        toast.success('Your sanctuary is ready. Welcome to RARE.')
        navigate('/dashboard')
      },
      onError: () => {
        toast.error('The ritual could not be initiated. Please verify your details.')
      }
    })
  }

  return (
    <div className="min-h-screen bg-cream flex overflow-hidden">
      {/* Left: Immersive Visual */}
      <div className="hidden lg:block lg:w-1/2 relative bg-dark">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90" 
          alt="Luxury Ritual Detail" 
          className="w-full h-full object-cover opacity-60 grayscale-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
        <div className="absolute bottom-20 left-20 max-w-md space-y-6">
          <SectionLabel text="Glow Membership" />
          <h2 className="font-playfair text-5xl text-cream leading-tight italic">
            Begin your <br /> <em className="text-gold">Transformation.</em>
          </h2>
          <div className="space-y-4 pt-4">
            {[
              'Personalized AI Skin Intelligence',
              'Member-only Sanctuary Pricing',
              'Curated Ritual Recommendations',
              'Glow Rewards Point Program'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-cream/70 text-xs font-light tracking-wide">
                <Sparkles className="w-3 h-3 text-gold" /> {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Authentication Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-24 py-12 relative overflow-y-auto custom-scrollbar">
        <Link to="/" className="absolute top-12 left-12 lg:left-24 font-playfair italic text-2xl text-dark tracking-[0.2em]">
          RARE<sup className="text-[10px] ml-0.5">•</sup>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto space-y-10"
        >
          <div className="space-y-4">
            <h1 className="font-playfair text-4xl text-dark">Join the <em className="text-rose italic">Collective</em></h1>
            <p className="text-mauve text-sm font-light">Become part of an elite community dedicated to high-performance wellness.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2 relative group">
                <label className="text-[10px] uppercase tracking-[3px] text-mauve/60 font-medium ml-1">Full Identity</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve/40 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="Sarah Montgomery"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-linen border-none p-5 pl-12 text-sm text-dark focus:ring-1 focus:ring-gold outline-none rounded-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] uppercase tracking-[3px] text-mauve/60 font-medium ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve/40 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="sarah@rarewellness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-linen border-none p-5 pl-12 text-sm text-dark focus:ring-1 focus:ring-gold outline-none rounded-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] uppercase tracking-[3px] text-mauve/60 font-medium ml-1">Secure Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve/40 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-linen border-none p-5 pl-12 text-sm text-dark focus:ring-1 focus:ring-gold outline-none rounded-sm" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 px-1 text-[10px] text-mauve/60 leading-relaxed font-light">
              <input type="checkbox" id="terms" required className="mt-1 accent-gold" />
              <label htmlFor="terms">
                I agree to the <span className="text-dark font-medium underline">Terms of Sanctuary</span> and acknowledge the <span className="text-dark font-medium underline">Privacy Policy</span>.
              </label>
            </div>

            <Button 
              type="submit" 
              variant="default" 
              className="w-full h-16 text-xs tracking-[4px] group"
              isLoading={signup.isPending}
            >
              Initialize My Ritual <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark/5" /></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest"><span className="bg-cream px-4 text-mauve/40">Discover more</span></div>
          </div>

          <p className="text-center text-mauve text-xs font-light">
            Already part of RARE? {' '}
            <Link to="/login" className="text-gold font-medium hover:underline underline-offset-4">Log In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
