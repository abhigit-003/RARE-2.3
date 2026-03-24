import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { OptimizedImage, Tag, StarRating } from '@/components/ui'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product & { match?: number; badge?: string }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-linen/50 border border-dark/5 hover:border-gold/20 transition-all duration-500 hover:shadow-2xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Link to={`/shop/${product.id}`}>
          <OptimizedImage 
            src={product.image} 
            alt={product.name} 
            zoom 
            className="w-full h-full" 
          />
        </Link>
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-full bg-cream/90 backdrop-blur-md flex items-center justify-center text-mauve hover:text-rose transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <Tag label={product.badge} variant="rose" />
          </div>
        )}

        {product.match && product.match > 0 && (
          <div className="absolute bottom-4 left-4 z-10 bg-dark/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/20">
            <p className="text-gold text-[9px] font-medium tracking-widest uppercase flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
              Mishti Match {product.match}%
            </p>
          </div>
        )}
      </div>

      <div className="p-8">
        <p className="text-gold text-[9px] uppercase tracking-[3px] font-medium mb-1.5">{product.brand}</p>
        <Link to={`/shop/${product.id}`}>
          <h4 className="font-playfair text-lg text-dark mb-2 group-hover:text-rose transition-colors duration-300 min-h-[56px] leading-tight">
            {product.name}
          </h4>
        </Link>
        <StarRating rating={product.rating} showNumber={false} className="mb-6 opacity-60" />
        
        <div className="flex items-center justify-between pt-6 border-t border-dark/5">
          <p className="text-xl font-playfair text-dark/80">₹{product.price}</p>
          <button 
            onClick={() => addItem(product, '30ml')}
            className="w-10 h-10 rounded-full bg-dark text-cream flex items-center justify-center hover:bg-rose transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
