import { motion } from 'framer-motion'
import { useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Settings, LogOut, Package, Calendar, Award, Heart, Sparkles, ChevronRight, User, TrendingUp } from 'lucide-react'
import { Button, SectionLabel, PageHeader } from '@/components/ui'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { Booking, Order } from '@/types'

const BOOKINGS: Booking[] = [
  { service: 'Lume Wellness Spa', type: 'Deep Tissue Massage', date: 'March 25, 2026', status: 'Upcoming' },
  { service: 'Serenity Yoga Studio', type: 'Vinyasa Flow', date: 'March 22, 2026', status: 'Completed' },
]

const ORDERS: Order[] = [
  { id: 'ORD-1024', date: 'March 18, 2026', total: '₹128', status: 'Delivered', items: 3 },
  { id: 'ORD-1023', date: 'March 10, 2026', total: '₹95', status: 'Delivered', items: 2 },
]

const PERFORMANCE_DATA = [
  { month: 'Oct', points: 1200 },
  { month: 'Nov', points: 1550 },
  { month: 'Dec', points: 1900 },
  { month: 'Jan', points: 2100 },
  { month: 'Feb', points: 2350 },
  { month: 'Mar', points: 2450 },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const savedUser = localStorage.getItem('ra_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('ra_user')
    navigate('/login')
  }

  if (!localStorage.getItem('ra_user') && !user) {
    return <Navigate to="/login" replace />
  }

  if (!user) return null

  const dynamicStats = [
    { icon: Award, label: 'Ritual Points', value: user.points?.toLocaleString() || '0' },
    { icon: Package, label: 'Total Orders', value: '12' },
    { icon: Heart, label: 'Favorites', value: '18' },
    { icon: Sparkles, label: 'Glow Score', value: '84' },
  ]

  return (
    <div className="bg-cream min-h-screen pb-32">
      <PageHeader 
        label="Account" 
        title={`My <em class='text-rose italic'>Ritual</em>`}
        subtitle={`Welcome back, ${user.name.split(' ')[0]}. Manage your bookings, track your orders, and view your personalized wellness insights.`}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 p-10 bg-dark text-cream relative overflow-hidden shadow-xl rounded-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
          <div className="relative z-10 flex items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-linen/10 border border-gold/30 flex items-center justify-center overflow-hidden">
                <User className="w-12 h-12 text-gold/50" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gold text-dark p-2 rounded-full shadow-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-gold text-[10px] uppercase tracking-[4px] mb-2 font-medium">{user.membership} Member</p>
              <h2 className="font-playfair text-3xl mb-2">{user.name}</h2>
              <p className="text-cream/40 text-xs font-light tracking-widest uppercase">Member since Oct 2024</p>
            </div>
          </div>
          <div className="relative z-10 flex gap-4 w-full md:w-auto">
            <Button variant="outline-cream" className="flex-1 md:flex-none h-12 px-8">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
            <Button variant="gold" className="flex-1 md:flex-none h-12 px-8" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {dynamicStats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-linen p-8 border border-dark/5 group hover:border-gold/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <stat.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                <p className="text-[10px] uppercase tracking-widest text-mauve font-medium">{stat.label}</p>
              </div>
              <p className="font-playfair text-4xl text-dark leading-none">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            
            {/* Analytics Chart */}
            <div className="bg-linen p-8 border border-dark/5 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="font-playfair text-xl text-dark italic">Ritual Points History</h3>
                  <p className="text-[10px] text-mauve uppercase tracking-[2px] mt-1">Consistency is key to transformation</p>
                </div>
                <div className="flex items-center gap-2 text-rose">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">+15% this month</span>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C5A059" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#8B7E74' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#8B7E74' }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FDFCFB', border: '1px solid #C5A05933', borderRadius: '4px' }}
                      labelStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#8B7E74' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="points" 
                      stroke="#C5A059" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPoints)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <section>
              <div className="flex justify-between items-end mb-8">
                <h3 className="font-playfair text-2xl text-dark italic">Upcoming Bookings</h3>
                <button className="text-[10px] uppercase tracking-widest text-gold hover:text-rose transition-colors">View Schedule</button>
              </div>
              <div className="space-y-4">
                {BOOKINGS.map(booking => (
                  <div key={booking.service} className="p-8 bg-linen border border-dark/5 flex justify-between items-center group cursor-pointer hover:bg-cream transition-colors shadow-sm">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-dark flex items-center justify-center rounded-sm">
                        <Calendar className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="text-dark font-medium mb-1">{booking.service}</h4>
                        <p className="text-mauve text-xs font-light mb-2">{booking.type}</p>
                        <p className="text-mauve text-[10px] uppercase tracking-widest font-medium opacity-60">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`px-4 py-1 text-[8px] uppercase tracking-widest rounded-full ${booking.status === 'Upcoming' ? 'bg-gold text-dark' : 'bg-mauve text-cream'}`}>{booking.status}</span>
                      <ChevronRight className="w-4 h-4 text-dark/20 group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-8">
                <h3 className="font-playfair text-2xl text-dark italic">Recent Orders</h3>
                <button className="text-[10px] uppercase tracking-widest text-gold hover:text-rose transition-colors">Order History</button>
              </div>
              <div className="space-y-4">
                {ORDERS.map(order => (
                  <div key={order.id} className="p-8 bg-linen border border-dark/5 flex justify-between items-center group cursor-pointer hover:bg-cream transition-colors shadow-sm">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-mauve/10 flex items-center justify-center rounded-sm">
                        <Package className="w-5 h-5 text-mauve" />
                      </div>
                      <div>
                        <h4 className="text-dark font-medium mb-1 font-playfair">{order.id}</h4>
                        <p className="text-mauve text-xs font-light mb-2">{order.items} items · {order.total}</p>
                        <p className="text-mauve text-[10px] uppercase tracking-widest font-medium opacity-60">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="px-4 py-1 text-[8px] uppercase tracking-widest bg-dark text-cream rounded-full">{order.status}</span>
                      <ChevronRight className="w-4 h-4 text-dark/20 group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <div className="p-10 bg-linen border border-dark/5 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Sparkles className="w-24 h-24" />
              </div>
              <SectionLabel text="Loyalty Status" />
              <div className="mt-8">
                <h4 className="font-playfair text-2xl text-dark mb-4">You're Growing.</h4>
                <p className="text-mauve text-sm mb-10 leading-relaxed font-light">
                  You're just 550 points away from becoming a <strong className="text-gold font-medium">Platinum Member</strong>. Unlock early access to new rituals.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-medium">
                    <span>Gold</span>
                    <span className="text-gold">82%</span>
                  </div>
                  <div className="w-full h-1 bg-dark/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '82%' }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-gold to-rose"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-dark text-cream shadow-2xl rounded-sm">
              <h4 className="font-playfair text-xl mb-6 italic">Mishti's Insight</h4>
              <p className="text-cream/50 text-sm mb-8 leading-relaxed font-light italic">
                "Based on your scan from March 18th, your hydration levels have improved by 12%."
              </p>
              <Button variant="gold" className="w-full" onClick={() => navigate('/mishti')}>View Full Report</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
