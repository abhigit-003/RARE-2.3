import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Tag, Calendar, MapPin, Globe, Image as ImageIcon, 
  Package, X, DollarSign, FlaskConical, Heart, Leaf, 
  Sprout, Shield, Sparkles, Recycle, Check, FileText, 
  Info, Users, RefreshCw, Star, ChevronLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const SELLER_STATS = [
  { icon: Users,       stat: '50K+',   label: 'Buyers Monthly'    },
  { icon: Package,     stat: '200+',   label: 'Curated Brands'    },
  { icon: Star,        stat: '4.8',    label: 'Avg Product Rating'},
  { icon: RefreshCw,   stat: '68%',    label: 'Repeat Purchasers' },
]

const STEPS = ['Brand Profile', 'Products', 'Compliance', 'Review']

const BRAND_CATEGORIES = [
  'Skincare', 'Haircare', 'Body Care', 'Fragrance',
  'Supplements', 'Aromatherapy', 'Ayurvedic', 'Clean Beauty',
  'Luxury', 'Vegan', 'Organic', 'Dermatologist Recommended'
]

const CERTIFICATIONS = [
  { id: 'cruelty_free',  icon: Heart,    label: 'Cruelty Free',         sub: 'Leaping Bunny or PETA certified' },
  { id: 'vegan',         icon: Leaf,     label: 'Vegan',                sub: 'No animal-derived ingredients'   },
  { id: 'organic',       icon: Sprout,   label: 'Certified Organic',    sub: 'USDA, COSMOS or equivalent'      },
  { id: 'derma_tested',  icon: Shield,   label: 'Dermatologist Tested', sub: 'Clinical study available'        },
  { id: 'clean_beauty',  icon: Sparkles, label: 'Clean Beauty',         sub: 'Free from harmful chemicals'     },
  { id: 'sustainable',   icon: Recycle,  label: 'Sustainable Packaging',sub: 'Recyclable or biodegradable'     },
]

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0
  })
}

interface Product {
  id: string
  name: string
  category: string
  price: string
  ingredients: string
}

export default function SellerOnboardingPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [brandName, setBrandName] = useState('')
  const [foundedYear, setFoundedYear] = useState('')
  const [origin, setOrigin] = useState('')
  const [website, setWebsite] = useState('')
  const [brandStory, setBrandStory] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [pricePositioning, setPricePositioning] = useState('')
  const [skuCount, setSkuCount] = useState('')
  const [products, setProducts] = useState<Product[]>([{ id: '1', name: '', category: '', price: '', ingredients: '' }])
  const [selectedCerts, setSelectedCerts] = useState<string[]>([])
  const [transparency, setTransparency] = useState('Yes — INCI format available')
  const [fulfillment, setFulfillment] = useState('Self-Fulfilled')

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleCert = (id: string) => {
    setSelectedCerts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const addProduct = () => {
    if (products.length < 3) {
      setProducts([...products, { id: Date.now().toString(), name: '', category: '', price: '', ingredients: '' }])
    }
  }

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const goNext = () => {
    setDirection(1)
    setCurrentStep(s => s + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setCurrentStep(s => s - 1)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubmitted(true)
    setSubmitting(false)
    toast.success('Your brand application has been submitted to The Edit \u2726')
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-rose/10 border border-rose/30 flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-8 h-8 text-rose" />
          </motion.div>

          <p className="text-[9px] uppercase tracking-[0.3em] text-rose/60 mb-4 font-medium">
            APPLICATION RECEIVED
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-dark font-light mb-6">
            Your brand is under<br />
            <em className="text-rose italic">Review.</em>
          </h2>
          <p className="text-mauve text-sm leading-relaxed max-w-[420px] mx-auto mb-10 font-light">
            Our editorial team carefully evaluates every submission. 
            Expect a response within 5–7 business days.
          </p>

          <div className="bg-linen px-8 py-4 inline-block mb-10 border border-dark/5">
            <p className="text-[9px] uppercase tracking-widest text-muted mb-1 font-medium">
              Reference Number
            </p>
            <p className="font-playfair text-dark text-lg uppercase">
              EDIT-{Date.now().toString().slice(-6)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/partner')}
              className="border border-dark text-dark px-10 py-4 text-[10px] uppercase tracking-widest hover:bg-dark hover:text-cream transition-all duration-300 font-medium"
            >
              Back to Partners
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="bg-dark text-cream px-10 py-4 text-[10px] uppercase tracking-widest hover:bg-dark/90 transition-all duration-300 font-medium"
            >
              Visit The Edit →
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-cream overflow-hidden">
      {/* Left Panel */}
      <div className="lg:w-[38%] bg-dark p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden text-cream min-h-[400px] lg:min-h-screen">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gold/60 mb-12 font-medium">
            ✦ THE EDIT — SELLER COLLECTIVE
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-[clamp(28px,2.8vw,40px)] font-light leading-tight">
            Sell to the<br />
            <em className="text-rose italic">discerning</em><br />
            Clientele.
          </h2>
          <p className="text-cream/50 text-sm leading-relaxed mt-6 max-w-[280px] font-light">
            RARE's Edit is where conscious luxury 
            meets high-performance skincare. 
            Your brand deserves this audience.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-12">
            {SELLER_STATS.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 border border-gold/10 hover:border-gold/30 transition-all duration-500 bg-white/5">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-playfair text-xl text-cream font-light">{item.stat}</p>
                  <p className="text-[9px] uppercase tracking-widest text-muted font-medium">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-16">
          <div className="pt-10 border-t border-cream/10 mb-12">
            <p className="font-cormorant italic text-cream/50 text-lg leading-relaxed pl-6 border-l-2 border-gold/30">
              "RARE's audience actually reads ingredient labels. 
              Our conversion rate tripled."
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gold/40 mt-4 font-medium pl-6">
              — Amara Lee, Founder of Herbivore Botanicals
            </p>
          </div>

          <button 
            onClick={() => navigate('/partner')}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/40 hover:text-gold transition-colors font-medium"
          >
            <ChevronLeft className="w-3 h-3" /> Back to Partner Options
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-[62%] bg-cream p-8 md:p-16 flex flex-col min-h-screen">
        {/* Step Indicator */}
        <div className="flex items-center mb-16 max-w-md mx-auto w-full">
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center relative">
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center text-[11px] font-medium transition-all duration-500 rounded-none border",
                  i < currentStep ? "bg-rose border-rose text-cream" :
                  i === currentStep ? "bg-dark border-dark text-cream" :
                  "bg-linen border-transparent text-muted"
                )}>
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <p className={cn(
                  "text-[9px] uppercase tracking-widest mt-3 absolute -bottom-6 whitespace-nowrap font-medium",
                  i === currentStep ? "text-dark" : "text-muted"
                )}>{label}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  "flex-1 h-px mx-4 transition-all duration-700",
                  i < currentStep ? "bg-rose" : "bg-linen"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 mt-6 max-w-2xl mx-auto w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {currentStep === 0 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-playfair text-3xl text-dark mb-2">Tell us about your brand</h3>
                    <p className="text-mauve text-sm font-light">Share your brand's origin and story.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField 
                      label="Brand Name" 
                      icon={Tag} 
                      placeholder="Tatcha" 
                      value={brandName}
                      onChange={(e: any) => setBrandName(e.target.value)}
                      required
                    />
                    <FormField 
                      label="Founded Year" 
                      icon={Calendar} 
                      placeholder="2009" 
                      type="number"
                      value={foundedYear}
                      onChange={(e: any) => setFoundedYear(e.target.value)}
                    />
                    <FormField 
                      label="Brand Origin / HQ" 
                      icon={MapPin} 
                      placeholder="Tokyo, Japan" 
                      value={origin}
                      onChange={(e: any) => setOrigin(e.target.value)}
                      required
                    />
                    <FormField 
                      label="Brand Website" 
                      icon={Globe} 
                      placeholder="www.tatcha.com" 
                      value={website}
                      onChange={(e: any) => setWebsite(e.target.value)}
                    />
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                        Brand Story
                      </label>
                      <div className="bg-linen/30 border border-dark/5 px-6 py-5 focus-within:border-gold/30 transition-all">
                        <textarea
                          rows={4}
                          value={brandStory}
                          onChange={(e) => setBrandStory(e.target.value)}
                          placeholder="Share what makes your brand rare — your origin, mission, and what sets your formulations apart..."
                          className="bg-transparent border-none outline-none text-dark text-sm w-full placeholder:text-muted/50 font-light resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Brand Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BRAND_CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={cn(
                            "px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 border",
                            selectedCategories.includes(cat)
                              ? "bg-dark border-dark text-cream"
                              : "bg-linen/30 border-linen text-muted hover:text-dark hover:border-dark/20"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Price Positioning
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Accessible (< ₹2K)', 'Mid ($20–$80)', 'Premium ($80–$200)', 'Ultra-Luxury ($200+)'].map(range => (
                        <button
                          key={range}
                          onClick={() => setPricePositioning(range)}
                          className={cn(
                            "px-6 py-2.5 text-[10px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            pricePositioning === range 
                              ? "bg-rose border-rose text-cream shadow-md" 
                              : "bg-linen/30 border-linen text-muted hover:border-rose/30 hover:text-dark"
                          )}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Brand Logo Upload
                    </label>
                    <div className="border border-dashed border-gold/30 p-10 text-center bg-linen/30 hover:border-gold/60 transition-colors cursor-pointer group">
                      <ImageIcon className="w-8 h-8 text-gold/40 mx-auto mb-2 group-hover:text-gold/60 transition-colors" />
                      <p className="text-sm text-dark font-light">Upload brand logo</p>
                      <p className="text-[10px] text-muted/60 mt-1 italic">PNG with transparent bg preferred · Max 2MB</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button
                      disabled={!brandName || !origin}
                      onClick={goNext}
                      className={cn(
                        "px-12 py-4 text-[10px] uppercase tracking-[3px] font-medium transition-all duration-300",
                        (brandName && origin) ? "bg-dark text-cream hover:bg-dark/90" : "bg-linen text-muted cursor-not-allowed"
                      )}
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-playfair text-3xl text-dark mb-2">What will you sell on The Edit?</h3>
                    <p className="text-mauve text-sm font-light">Tell us about your product range.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      How many products will you list initially?
                    </label>
                    <div className="flex gap-3">
                      {['1–5', '6–15', '16–30', '30+'].map(count => (
                        <button
                          key={count}
                          onClick={() => setSkuCount(count)}
                          className={cn(
                            "flex-1 py-3 text-[10px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            skuCount === count 
                              ? "bg-rose border-rose text-cream shadow-md" 
                              : "bg-linen/30 border-linen text-muted hover:border-dark/20"
                          )}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted font-medium">
                      Add your key products (Max 3)
                    </label>
                    
                    {products.map((product) => (
                      <div key={product.id} className="bg-linen/30 p-6 relative border border-dark/5">
                        <button 
                          onClick={() => removeProduct(product.id)}
                          className="absolute top-4 right-4 text-muted hover:text-rose transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <FormField 
                              label="Product Name" 
                              icon={Package} 
                              placeholder="The Concentrate" 
                              value={product.name}
                              onChange={(e: any) => updateProduct(product.id, 'name', e.target.value)}
                            />
                          </div>
                          <FormField 
                            label="Category" 
                            icon={Tag} 
                            placeholder="Moisturizer" 
                            value={product.category}
                            onChange={(e: any) => updateProduct(product.id, 'category', e.target.value)}
                          />
                          <FormField 
                            label="Price (USD)" 
                            icon={DollarSign} 
                            placeholder="450" 
                            type="number"
                            value={product.price}
                            onChange={(e: any) => updateProduct(product.id, 'price', e.target.value)}
                          />
                          <div className="md:col-span-2">
                            <FormField 
                              label="Key Ingredients" 
                              icon={FlaskConical} 
                              placeholder="Miracle Broth™, Sea Kelp, Lime Tea" 
                              value={product.ingredients}
                              onChange={(e: any) => updateProduct(product.id, 'ingredients', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addProduct}
                      disabled={products.length >= 3}
                      className="w-full border border-dashed border-gold/30 py-4 text-[10px] uppercase tracking-widest text-gold/60 hover:border-gold/60 hover:text-gold transition-all disabled:opacity-30 font-medium"
                    >
                      + Add Another Product
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Hero Product Images
                    </label>
                    <div className="border border-dashed border-gold/30 p-10 text-center bg-linen/30 hover:border-gold/60 transition-colors cursor-pointer group">
                      <ImageIcon className="w-8 h-8 text-gold/40 mx-auto mb-2 group-hover:text-gold/60 transition-colors" />
                      <p className="text-sm text-dark font-light">Upload product images</p>
                      <p className="text-[10px] text-muted/60 mt-1 italic">JPG/PNG up to 5MB · Max 5 images</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      How will you fulfill orders?
                    </label>
                    <div className="flex flex-col gap-3">
                      {[
                        { id: 'Self-Fulfilled', label: 'Self-Fulfilled' },
                        { id: 'RARE Fulfillment', label: 'RARE Fulfillment', badge: 'COMING SOON' },
                        { id: 'Third-Party Logistics', label: 'Third-Party Logistics' }
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => !method.badge && setFulfillment(method.id)}
                          className={cn(
                            "w-full p-4 text-left text-sm transition-all duration-300 border flex justify-between items-center",
                            fulfillment === method.id 
                              ? "bg-rose/5 border-rose text-dark" 
                              : "bg-linen/30 border-linen text-muted hover:border-dark/20",
                            method.badge && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span className="font-light">{method.label}</span>
                          {method.badge && (
                            <span className="text-[8px] uppercase tracking-widest bg-gold/20 text-gold px-2 py-0.5">
                              {method.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-10 border-t border-dark/5">
                    <button
                      onClick={goBack}
                      className="px-10 py-4 border border-dark text-dark text-[10px] uppercase tracking-[3px] font-medium hover:bg-dark hover:text-cream transition-all duration-500"
                    >
                      ← BACK
                    </button>
                    <button
                      onClick={goNext}
                      className="px-12 py-4 bg-dark text-cream text-[10px] uppercase tracking-[3px] font-medium hover:bg-dark/90 transition-all duration-500 shadow-sm"
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-playfair text-3xl text-dark mb-2">Verify your brand's standards</h3>
                    <p className="text-mauve text-sm font-light">RARE only lists products that meet our curation criteria.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CERTIFICATIONS.map(cert => (
                      <div
                        key={cert.id}
                        onClick={() => toggleCert(cert.id)}
                        className={cn(
                          "flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200",
                          selectedCerts.includes(cert.id)
                            ? 'border-rose bg-rose/5'
                            : 'border-linen hover:border-rose/30 bg-linen/30'
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors",
                          selectedCerts.includes(cert.id) ? 'bg-rose/10' : 'bg-linen'
                        )}>
                          <cert.icon className={cn(
                            "w-4 h-4",
                            selectedCerts.includes(cert.id) ? 'text-rose' : 'text-muted'
                          )} />
                        </div>
                        <div className="flex-1">
                          <p className="text-dark text-sm font-light">{cert.label}</p>
                          <p className="text-muted text-[11px] scale-90 origin-left">{cert.sub}</p>
                        </div>
                        {selectedCerts.includes(cert.id) && (
                          <Check className="w-4 h-4 text-rose flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Do you provide full ingredient lists?
                    </label>
                    <div className="space-y-3">
                      {[
                        'Yes — INCI format available',
                        'Yes — simplified list only',
                        'Currently in progress'
                      ].map(option => (
                        <button
                          key={option}
                          onClick={() => setTransparency(option)}
                          className={cn(
                            "w-full p-4 text-left text-sm transition-all duration-300 border flex items-center gap-4 focus:outline-none",
                            transparency === option 
                              ? "bg-dark border-dark text-cream" 
                              : "bg-linen/30 border-linen text-muted hover:border-dark/20"
                          )}
                        >
                          <div className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center",
                            transparency === option ? "border-gold bg-gold" : "border-muted"
                          )}>
                            {transparency === option && <div className="w-1.5 h-1.5 bg-dark rounded-full" />}
                          </div>
                          <span className="font-light">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Compliance Documents (Optional)
                    </label>
                    <div className="border border-dashed border-gold/20 p-8 bg-linen/20 text-center hover:bg-linen/30 transition-colors">
                      <FileText className="w-6 h-6 text-gold/40 mx-auto mb-2" />
                      <p className="text-sm text-muted font-light">
                        Upload certificates, lab reports, or safety data sheets
                      </p>
                      <p className="text-center text-[10px] text-muted/50 mt-1 italic">PDF, max 10MB each</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gold/5 border border-gold/15 p-5 mt-6">
                    <Info className="w-4 h-4 text-gold/60 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-mauve/80 leading-relaxed font-light">
                      Certifications are preferred but not all are required. 
                      Our curation team reviews every brand individually.
                      Brands without certifications may still qualify based on ingredient quality.
                    </p>
                  </div>

                  <div className="flex justify-between pt-10 border-t border-dark/5">
                    <button
                      onClick={goBack}
                      className="px-10 py-4 border border-dark text-dark text-[10px] uppercase tracking-[3px] font-medium hover:bg-dark hover:text-cream transition-all duration-500"
                    >
                      ← BACK
                    </button>
                    <button
                      onClick={goNext}
                      className="px-12 py-4 bg-dark text-cream text-[10px] uppercase tracking-[3px] font-medium hover:bg-dark/90 transition-all duration-500"
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-playfair text-3xl text-dark mb-2">Review your application</h3>
                    <p className="text-mauve text-sm font-light">Ensure all details are correct before applying to The Edit.</p>
                  </div>

                  <div className="bg-linen/40 p-8 border border-dark/5 shadow-inner space-y-8">
                    <div className="flex items-center gap-4 pb-8 border-b border-dark/5">
                      <div className="w-16 h-16 bg-rose/10 flex items-center justify-center border border-rose/20">
                        <Tag className="w-8 h-8 text-rose" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted font-medium">Brand Identity</p>
                        <h4 className="font-playfair text-2xl text-dark font-light">{brandName}</h4>
                        <p className="text-[10px] text-mauve font-medium uppercase tracking-widest mt-1 opacity-60">Founded {foundedYear} · {origin}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Categories</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCategories.map(cat => (
                            <span key={cat} className="bg-dark text-cream px-3 py-1 text-[8px] uppercase tracking-widest">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Fulfillment</p>
                        <p className="text-dark text-sm font-light border-l-2 border-gold/20 pl-4">{fulfillment}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Product Count</p>
                        <p className="text-dark text-sm font-light border-l-2 border-gold/20 pl-4">{skuCount} SKUs</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Certifications</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCerts.map(certId => {
                            const cert = CERTIFICATIONS.find(c => c.id === certId)
                            if (!cert) return null
                            return (
                              <span key={certId} className="bg-rose/10 text-rose px-3 py-1 text-[8px] uppercase tracking-widest border border-rose/20">
                                {cert.label}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(0)}
                      className="text-rose text-[11px] underline font-medium hover:text-rose/80 transition-colors uppercase tracking-widest"
                    >
                      ← Edit Brand Profile
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      disabled={submitting}
                      onClick={handleSubmit}
                      className={cn(
                        "w-full py-5 text-[11px] uppercase tracking-[4px] transition-all duration-500 font-medium flex items-center justify-center gap-3 shadow-lg",
                        !submitting ? "bg-dark text-cream hover:bg-dark/95" : "bg-linen text-muted cursor-not-allowed"
                      )}
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-cream/20 border-t-cream rounded-full"
                          />
                          SUBMITTING...
                        </>
                      ) : (
                        "APPLY TO THE EDIT →"
                      )}
                    </button>
                    <button
                      onClick={goBack}
                      disabled={submitting}
                      className="text-[10px] uppercase tracking-widest text-muted hover:text-dark transition-colors text-center py-2 font-medium"
                    >
                      Back to details
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, icon: Icon, placeholder, value, onChange, required, type = 'text' }: any) {
  return (
    <div className="space-y-3">
      <label className="block text-[10px] uppercase tracking-[0.25em] text-muted font-medium">
        {label} {required && <span className="text-rose">*</span>}
      </label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white border border-linen p-4 pl-14 text-sm font-light text-dark outline-none focus:border-gold/30 focus:shadow-sm transition-all placeholder:text-muted/30"
        />
      </div>
    </div>
  )
}
