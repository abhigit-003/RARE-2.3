import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Globe, MapPin, Home, Plane, Calendar, 
  ChevronLeft, UtensilsCrossed, Car, Wifi, Dumbbell, 
  Waves, Wind, BookOpen, HeartPulse, Video, 
  Phone, Mail, User, Check, Star, IndianRupee, Users, Info
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const DESTINATION_STATS = [
  { icon: Globe,      stat: '32',     label: 'Countries Listed'   },
  { icon: Users,      stat: '12K+',   label: 'Bookings This Year' },
  { icon: Star,       stat: '4.9',    label: 'Avg Stay Rating'    },
  { icon: IndianRupee, stat: '₹18Cr+',  label: 'Partner Revenue'    },
]

const STEPS = ['Location', 'Experience', 'Logistics', 'Review']

const EXPERIENCES = [
  'Yoga Retreats', 'Meditation', 'Ayurveda', 'Silent Retreats',
  'Detox Programs', 'Spa Treatments', 'Sound Healing',
  'Breathwork', 'Plant Medicine', 'Fasting Programs',
  'Fitness Bootcamp', 'Surf & Wellness', 'Cold Therapy',
  'Digital Detox', 'Couples Wellness', 'Corporate Wellness'
]

const INCLUSIONS = [
  { id: 'meals',              icon: UtensilsCrossed, label: 'Meals Included',        sub: 'All or selected meals'    },
  { id: 'transfers',          icon: Car,             label: 'Airport Transfers',     sub: 'Both ways'                },
  { id: 'wifi',               icon: Wifi,            label: 'WiFi Available',        sub: 'Property-wide'            },
  { id: 'fitness',            icon: Dumbbell,        label: 'Fitness Facilities',    sub: 'Gym or outdoor'           },
  { id: 'pool',               icon: Waves,           label: 'Pool / Hot Springs',    sub: 'On property'              },
  { id: 'sauna',              icon: Wind,            label: 'Sauna / Steam Room',    sub: 'Included in stay'         },
  { id: 'classes',            icon: BookOpen,        label: 'Daily Classes',         sub: 'Yoga, meditation, etc.'   },
  { id: 'medical',            icon: HeartPulse,      label: 'Medical Support',       sub: 'Doctor or nurse on-site'  },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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

export default function DestinationRegisterPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [propertyName, setPropertyName] = useState('')
  const [propertyType, setPropertyType] = useState('Resort')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [airport, setAirport] = useState('')
  const [established, setEstablished] = useState('')
  const [propertySize, setPropertySize] = useState('')
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [durationOptions, setDurationOptions] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState('')
  const [accommodationTypes, setAccommodationTypes] = useState<string[]>([])
  const [signatureJourney, setSignatureJourney] = useState('')
  const [leadPractitioner, setLeadPractitioner] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [seasonsOpen, setSeasonsOpen] = useState('Year-Round')
  const [openMonths, setOpenMonths] = useState<string[]>([])
  const [leadTime, setLeadTime] = useState('')
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([])
  const [cancellationPolicy, setCancellationPolicy] = useState('Flexible')
  const [customPolicy, setCustomPolicy] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMethod, setContactMethod] = useState('Email')
  const [virtualTour, setVirtualTour] = useState('')

  const toggleExperience = (exp: string) => {
    setSelectedExperiences(prev => 
      prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]
    )
  }

  const toggleInclusion = (id: string) => {
    setSelectedInclusions(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleMonth = (month: string) => {
    setOpenMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    )
  }

  const toggleDuration = (dur: string) => {
    setDurationOptions(prev => 
      prev.includes(dur) ? prev.filter(d => d !== dur) : [...prev, dur]
    )
  }

  const toggleAccommodation = (type: string) => {
    setAccommodationTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
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
    toast.success('Your sanctuary registration is being processed \u2726')
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
            className="w-20 h-20 bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-8 h-8 text-gold" />
          </motion.div>

          <p className="text-[9px] uppercase tracking-[0.3em] text-gold/60 mb-4 font-medium">
            REGISTRATION IN PROGRESS
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-dark font-light mb-6 leading-tight">
            Your Sanctuary is<br />
            <em className="text-gold italic">being curated.</em>
          </h2>
          <p className="text-mauve text-sm leading-relaxed max-w-[420px] mx-auto mb-10 font-light">
            Our Sanctuaries team will reach out within 3 business days 
            to arrange a virtual tour and finalize your listing.
          </p>

          <div className="bg-linen px-8 py-4 inline-block mb-10 border border-dark/5">
            <p className="text-[9px] uppercase tracking-widest text-muted mb-1 font-medium">
              Reference Number
            </p>
            <p className="font-playfair text-dark text-lg uppercase">
              DEST-{Date.now().toString().slice(-6)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSubmitted(false)
                setCurrentStep(0)
                setPropertyName('')
                setCountry('')
                setCity('')
                // Reset other fields as needed
              }}
              className="border border-dark text-dark px-10 py-4 text-[10px] uppercase tracking-widest hover:bg-dark hover:text-cream transition-all duration-300 font-medium"
            >
              Register Another
            </button>
            <button
              onClick={() => navigate('/services')}
              className="bg-dark text-cream px-10 py-4 text-[10px] uppercase tracking-widest hover:bg-dark/90 transition-all duration-300 font-medium"
            >
              Explore Sanctuaries →
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
            ✦ RARE SANCTUARIES — DESTINATION PARTNER
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-[clamp(28px,2.8vw,40px)] font-light leading-tight">
            Your retreat,<br />
            curated for the<br />
            <em className="text-gold italic">World's best.</em>
          </h2>
          <p className="text-cream/50 text-sm leading-relaxed mt-6 max-w-[280px] font-light">
            RARE Sanctuaries connects discerning 
            wellness seekers with extraordinary 
            destinations worldwide.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-12">
            {DESTINATION_STATS.map((item, i) => (
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
              "We were at 60% occupancy. Three months with RARE and we're fully booked through next season."
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gold/40 mt-4 font-medium pl-6">
              — Rajan Mehta, The Mandala Retreat, Bali
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
                  i < currentStep ? "bg-gold border-gold text-dark" :
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
                  i < currentStep ? "bg-gold" : "bg-linen"
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
                    <h3 className="font-playfair text-3xl text-dark mb-2">Tell us about your sanctuary</h3>
                    <p className="text-mauve text-sm font-light">Describe the property and its location.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField 
                      label="Property / Retreat Name" 
                      icon={Building2} 
                      placeholder="The Mandala Retreat" 
                      value={propertyName}
                      onChange={(e: any) => setPropertyName(e.target.value)}
                      required
                    />
                    <div className="space-y-3">
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-muted font-medium">
                        Property Type
                      </label>
                      <select 
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-white border border-linen p-4 text-sm font-light text-dark outline-none focus:border-gold/30 transition-all appearance-none cursor-pointer"
                      >
                        {['Resort', 'Retreat Center', 'Boutique Hotel', 'Villa', 'Eco Lodge', 'Ashram', 'Cruise'].map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <FormField 
                      label="Country" 
                      icon={Globe} 
                      placeholder="Bali, Indonesia" 
                      value={country}
                      onChange={(e: any) => setCountry(e.target.value)}
                      required
                    />
                    <FormField 
                      label="City / Region" 
                      icon={MapPin} 
                      placeholder="Ubud" 
                      value={city}
                      onChange={(e: any) => setCity(e.target.value)}
                      required
                    />
                    <div className="md:col-span-2">
                      <FormField 
                        label="Full Address" 
                        icon={Home} 
                        placeholder="Jalan Raya Ubud, Gianyar Regency, Bali 80571" 
                        value={address}
                        onChange={(e: any) => setAddress(e.target.value)}
                      />
                    </div>
                    <FormField 
                      label="Nearest Airport" 
                      icon={Plane} 
                      placeholder="Ngurah Rai (DPS) — 45 min" 
                      value={airport}
                      onChange={(e: any) => setAirport(e.target.value)}
                    />
                    <FormField 
                      label="Property Established" 
                      icon={Calendar} 
                      placeholder="2015" 
                      value={established}
                      onChange={(e: any) => setEstablished(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      How large is your property?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Intimate (1–10 guests)', 'Boutique (11–30)', 'Mid-size (31–80)', 'Large (80+)'].map(size => (
                        <button
                          key={size}
                          onClick={() => setPropertySize(size)}
                          className={cn(
                            "flex-1 min-w-[140px] py-3 text-[10px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            propertySize === size 
                              ? "bg-dark border-dark text-cream shadow-md" 
                              : "bg-linen/30 border-linen text-muted hover:text-dark"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Property Photos
                    </label>
                    <div className="border border-dashed border-gold/30 p-12 text-center bg-linen/30 hover:border-gold/60 transition-colors cursor-pointer group">
                      <ImageUploadIcon />
                      <p className="text-sm text-dark font-light mt-4">Upload property images</p>
                      <p className="text-[10px] text-muted/60 mt-1 italic">Exterior, rooms, treatment areas, grounds</p>
                      <p className="text-[10px] text-muted/40 mt-1">JPG/PNG up to 10MB each · Min 3, Max 10 images</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button
                      disabled={!propertyName || !country || !city}
                      onClick={goNext}
                      className={cn(
                        "px-12 py-4 text-[10px] uppercase tracking-[3px] font-medium transition-all duration-300",
                        (propertyName && country && city) ? "bg-dark text-cream hover:bg-dark/90" : "bg-linen text-muted cursor-not-allowed"
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
                    <h3 className="font-playfair text-3xl text-dark mb-2">What transformations do you offer?</h3>
                    <p className="text-mauve text-sm font-light">Define the wellness experience at your sanctuary.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Signature Experiences
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERIENCES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleExperience(cat)}
                          className={cn(
                            "px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            selectedExperiences.includes(cat)
                              ? "bg-dark border-dark text-cream"
                              : "bg-linen/30 border-linen text-muted hover:border-dark/20"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Retreat Duration Options
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Day Visit', 'Weekend (2–3 days)', 'Week (5–7 days)', '10 Days', '2 Weeks', 'Month+', 'Custom'].map(dur => (
                        <button
                          key={dur}
                          onClick={() => toggleDuration(dur)}
                          className={cn(
                            "px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            durationOptions.includes(dur)
                              ? "bg-rose border-rose text-cream"
                              : "bg-linen/30 border-linen text-muted hover:border-dark/20"
                          )}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Pricing Range (Per person, per night)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Budget (< ₹8,000)', 'Mid (₹8,000–₹25,000)', 'Luxury (₹25,000–₹65,000)', 'Ultra (₹65,000+)'].map(range => (
                        <button
                          key={range}
                          onClick={() => setPriceRange(range)}
                          className={cn(
                            "py-3 text-[9px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            priceRange === range 
                              ? "bg-dark border-dark text-cream" 
                              : "bg-linen/30 border-linen text-muted hover:border-dark/20"
                          )}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Accommodation Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Private Villa', 'Suite', 'Shared Dorm', 'Glamping', 'Treehouse', 'Overwater'].map(type => (
                        <button
                          key={type}
                          onClick={() => toggleAccommodation(type)}
                          className={cn(
                            "px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            accommodationTypes.includes(type)
                              ? "bg-rose border-rose text-cream"
                              : "bg-linen/30 border-linen text-muted"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Describe your signature wellness journey
                    </label>
                    <div className="bg-linen/30 border border-dark/5 px-6 py-5 focus-within:border-gold/30 transition-all">
                      <textarea
                        rows={5}
                        value={signatureJourney}
                        onChange={(e) => setSignatureJourney(e.target.value)}
                        placeholder="Walk us through a guest's transformation — from arrival ritual to departure ceremony. What makes your sanctuary unlike anywhere else in the world?"
                        className="bg-transparent border-none outline-none text-dark text-sm w-full placeholder:text-muted/50 font-light resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted font-medium">
                      Signature Practitioner (Optional)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={leadPractitioner}
                        onChange={(e) => setLeadPractitioner(e.target.value)}
                        placeholder="Lead Practitioner Name — Dr. Priya Nair"
                        className="w-full bg-white border border-linen p-4 text-sm font-light text-dark outline-none focus:border-gold/30 transition-all"
                      />
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="Specialization — Ayurvedic Medicine"
                        className="w-full bg-white border border-linen p-4 text-sm font-light text-dark outline-none focus:border-gold/30 transition-all"
                      />
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
                    <h3 className="font-playfair text-3xl text-dark mb-2">Help guests plan their journey</h3>
                    <p className="text-mauve text-sm font-light">Logistics, availability, and inclusions.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      When are you open?
                    </label>
                    <div className="flex gap-4">
                      {['Year-Round', 'Seasonal', 'Specific Months'].map(option => (
                        <button
                          key={option}
                          onClick={() => setSeasonsOpen(option)}
                          className={cn(
                            "flex-1 py-3 text-[10px] uppercase tracking-widest transition-all duration-300 border font-medium",
                            seasonsOpen === option 
                              ? "bg-gold border-gold text-dark" 
                              : "bg-linen/30 border-linen text-muted"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {seasonsOpen === 'Specific Months' && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        {MONTHS.map(m => (
                          <button
                            key={m}
                            onClick={() => toggleMonth(m)}
                            className={cn(
                              "py-2 text-[9px] uppercase tracking-[2px] border transition-all",
                              openMonths.includes(m) ? "bg-dark border-dark text-cream" : "border-linen text-muted/60"
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Minimum advance booking required
                    </label>
                    <div className="flex flex-wrap gap-2">
                       {['24 hours', '3 days', '1 week', '2 weeks', '1 month'].map(time => (
                        <button
                          key={time}
                          onClick={() => setLeadTime(time)}
                          className={cn(
                            "px-4 py-2 text-[10px] uppercase tracking-widest transition-all border font-medium",
                            leadTime === time ? "bg-dark border-dark text-cream" : "bg-linen/30 border-linen text-muted"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Property Inclusions
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {INCLUSIONS.map(inc => (
                        <div
                          key={inc.id}
                          onClick={() => toggleInclusion(inc.id)}
                          className={cn(
                            "flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200",
                            selectedInclusions.includes(inc.id)
                              ? 'border-gold bg-gold/5'
                              : 'border-linen hover:border-gold/30 bg-linen/30'
                          )}
                        >
                          <div className={cn(
                            "w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors",
                            selectedInclusions.includes(inc.id) ? 'bg-gold/10' : 'bg-linen'
                          )}>
                            <inc.icon className={cn(
                              "w-4 h-4",
                              selectedInclusions.includes(inc.id) ? 'text-gold' : 'text-muted'
                            )} />
                          </div>
                          <div className="flex-1">
                            <p className="text-dark text-sm font-light">{inc.label}</p>
                            <p className="text-muted text-[11px] scale-90 origin-left">{inc.sub}</p>
                          </div>
                          {selectedInclusions.includes(inc.id) && (
                            <Check className="w-4 h-4 text-gold flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-4 font-medium">
                      Cancellation Policy
                    </label>
                    <div className="space-y-3">
                      {[
                        { id: 'Flexible', desc: 'Flexible — full refund up to 48 hours before' },
                        { id: 'Moderate', desc: 'Moderate — 50% refund up to 7 days before' },
                        { id: 'Strict', desc: 'Strict — no refund within 14 days' },
                        { id: 'Custom', desc: 'Custom policy (describe below)' }
                      ].map(policy => (
                        <button
                          key={policy.id}
                          onClick={() => setCancellationPolicy(policy.id)}
                          className={cn(
                            "w-full p-4 text-left text-sm transition-all duration-300 border flex items-center gap-4 focus:outline-none",
                            cancellationPolicy === policy.id 
                              ? "bg-dark border-dark text-cream" 
                              : "bg-linen/30 border-linen text-muted hover:border-dark/20"
                          )}
                        >
                          <div className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center",
                            cancellationPolicy === policy.id ? "border-gold bg-gold" : "border-muted"
                          )}>
                            {cancellationPolicy === policy.id && <div className="w-1.5 h-1.5 bg-dark rounded-full" />}
                          </div>
                          <span className="font-light">{policy.desc}</span>
                        </button>
                      ))}
                    </div>
                    {cancellationPolicy === 'Custom' && (
                      <textarea
                        rows={3}
                        value={customPolicy}
                        onChange={(e) => setCustomPolicy(e.target.value)}
                        placeholder="Describe your cancellation terms..."
                        className="w-full bg-white border border-linen p-4 mt-3 text-sm font-light text-dark outline-none focus:border-gold/30 transition-all resize-none animate-in fade-in slide-in-from-top-2"
                      />
                    )}
                  </div>

                  <div className="space-y-6 pt-6 border-t border-dark/5">
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted font-medium">
                      Contact for Bookings
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField 
                        label="Booking Contact Name" 
                        icon={User} 
                        placeholder="Ananya Kapoor" 
                        value={contactName}
                        onChange={(e: any) => setContactName(e.target.value)}
                      />
                      <FormField 
                        label="Booking Email" 
                        icon={Mail} 
                        placeholder="bookings@mandalareteat.com" 
                        value={contactEmail}
                        onChange={(e: any) => setContactEmail(e.target.value)}
                      />
                      <div className="md:col-span-2">
                        <FormField 
                          label="Booking Phone" 
                          icon={Phone} 
                          placeholder="+62 361 987 654" 
                          value={contactPhone}
                          onChange={(e: any) => setContactPhone(e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-muted font-medium">
                          Preferred Contact Method
                        </label>
                        <div className="flex gap-4">
                           {['Email', 'Phone', 'WhatsApp'].map(m => (
                            <button
                              key={m}
                              onClick={() => setContactMethod(m)}
                              className={cn(
                                "flex-1 py-3 text-[10px] uppercase tracking-widest transition-all border",
                                contactMethod === m ? "bg-dark border-dark text-cream font-medium" : "bg-linen/20 text-muted"
                              )}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <FormField 
                    label="Virtual Tour Link (Optional)" 
                    icon={Video} 
                    placeholder="YouTube or Matterport link" 
                    value={virtualTour}
                    onChange={(e: any) => setVirtualTour(e.target.value)}
                  />

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
                    <p className="text-mauve text-sm font-light">Confirm your sanctuary details before registering.</p>
                  </div>

                  <div className="bg-linen/40 p-8 border border-dark/5 shadow-inner space-y-8">
                    <div className="flex items-center gap-4 pb-8 border-b border-dark/5">
                      <div className="w-16 h-16 bg-gold/10 flex items-center justify-center border border-gold/20">
                        <Building2 className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted font-medium">Sanctuary Details</p>
                        <h4 className="font-playfair text-2xl text-dark font-light">{propertyName}</h4>
                        <p className="text-[10px] text-mauve font-medium uppercase tracking-widest mt-1 opacity-60">{propertyType} · {city}, {country}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Capacity & Price</p>
                        <p className="text-dark text-sm font-light border-l-2 border-gold/20 pl-4">{propertySize} · {priceRange}</p>
                      </div>
                      <div>
                         <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Experiences</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedExperiences.slice(0, 3).map(exp => (
                            <span key={exp} className="bg-dark text-cream px-3 py-1 text-[8px] uppercase tracking-widest">
                              {exp}
                            </span>
                          ))}
                          {selectedExperiences.length > 3 && (
                            <span className="text-[8px] text-muted uppercase tracking-widest self-center ml-1">
                              +{selectedExperiences.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Inclusions</p>
                        <div className="flex flex-wrap gap-2">
                           {selectedInclusions.map(incId => {
                            const inc = INCLUSIONS.find(i => i.id === incId)
                            if (!inc) return null
                            return (
                              <div key={incId} className="w-7 h-7 bg-gold/10 flex items-center justify-center border border-gold/20 rounded-full" title={inc.label}>
                                <inc.icon className="w-3 h-3 text-gold" />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted mb-3 font-medium">Booking Contact</p>
                        <p className="text-dark text-sm font-light border-l-2 border-gold/20 pl-4 truncate">{contactName}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(0)}
                      className="text-gold text-[11px] underline font-medium hover:text-gold/80 transition-colors uppercase tracking-widest"
                    >
                      ← Edit Location Details
                    </button>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gold/5 border border-gold/15">
                     <Info className="w-4 h-4 text-gold/60 mt-0.5 flex-shrink-0" />
                     <p className="text-[10px] text-mauve/70 font-light leading-relaxed">
                        By submitting this registration, you authorize RARE to showcase your property 
                        and facilitate bookings through the Sanctuaries platform.
                     </p>
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
                          REGISTERING...
                        </>
                      ) : (
                        "REGISTER MY SANCTUARY →"
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
        {label} {required && <span className="text-gold">*</span>}
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

function ImageUploadIcon() {
  return (
    <div className="flex -space-x-4 justify-center">
      {[1, 2, 3].map(i => (
        <div key={i} className="w-12 h-12 bg-linen flex items-center justify-center border border-gold/30 rounded-sm group-hover:rotate-6 transition-transform">
          <Globe className="w-5 h-5 text-gold/40" />
        </div>
      ))}
    </div>
  )
}
