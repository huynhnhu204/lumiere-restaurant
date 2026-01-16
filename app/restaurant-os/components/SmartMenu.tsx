'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ShoppingCart, Minus } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  price: string
  priceNum: number
  category: string
  image: string
  description: string
  badge?: string
}

const MENU_DATA: MenuItem[] = [
  { id: 1, name: "Bò Wagyu Áp Chảo", price: "1.250k", priceNum: 1250000, category: "Món chính", image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=500", description: "Thịt bò Wagyu A5 nhập khẩu", badge: "Best Seller" },
  { id: 2, name: "Súp Bào Ngư", price: "850k", priceNum: 850000, category: "Khai vị", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500", description: "Súp bào ngư tươi với nấm truffle" },
  { id: 3, name: "Rượu Vang Chateau", price: "3.500k", priceNum: 3500000, category: "Đồ uống", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500", description: "Rượu vang đỏ Pháp 2015" },
  { id: 4, name: "Tôm Hùm Alaska", price: "2.800k", priceNum: 2800000, category: "Món chính", image: "https://images.unsplash.com/photo-1559737558-2f5a2f3e2f3f?q=80&w=500", description: "Tôm hùm Alaska nướng bơ tỏi", badge: "Chef's Choice" },
  { id: 5, name: "Salad Trứng Cá Hồi", price: "650k", priceNum: 650000, category: "Khai vị", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500", description: "Salad tươi với trứng cá hồi Nhật" },
  { id: 6, name: "Tiramisu Đặc Biệt", price: "450k", priceNum: 450000, category: "Tráng miệng", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500", description: "Tiramisu Ý truyền thống" },
  { id: 7, name: "Foie Gras", price: "1.800k", priceNum: 1800000, category: "Khai vị", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500", description: "Gan ngỗng Pháp pan-seared" },
  { id: 8, name: "Cocktail Signature", price: "380k", priceNum: 380000, category: "Đồ uống", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=500", description: "Cocktail đặc trưng của nhà" },
]

interface SmartMenuProps {
  selectedTable: string | null
  serviceType: 'dine-in' | 'takeaway' | null
  cart: any[]
  onAddToCart: (item: MenuItem) => void
  onUpdateCart: (itemId: number, delta: number) => void
  onConfirmOrder: () => void
  onBack: () => void
}

export default function SmartMenu({ selectedTable, serviceType, cart, onAddToCart, onUpdateCart, onConfirmOrder, onBack }: SmartMenuProps) {
  const [category, setCategory] = useState('Tất cả')
  const [loading, setLoading] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const categories = ['Tất cả', 'Khai vị', 'Món chính', 'Đồ uống', 'Tráng miệng']

  const handleCategoryChange = (cat: string) => {
    setLoading(true)
    setCategory(cat)
    setTimeout(() => setLoading(false), 300)
  }

  const filteredMenu = category === 'Tất cả' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === category)

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-32"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-serif text-[#D4AF37]">LUMIÈRE</h2>
                <p className="text-xs text-gray-400">
                  {selectedTable === 'TAKEAWAY' ? '🛍️ Mang về' : `🪑 Bàn số ${selectedTable}`}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <ShoppingCart className="text-[#D4AF37]" size={28} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  category === cat 
                    ? 'bg-[#D4AF37] text-black scale-105' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-[#111] rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                  <div className="h-6 bg-gray-800 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#D4AF37] font-bold text-lg">{item.price}</span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="bg-[#D4AF37] text-black p-2 rounded-full hover:bg-white transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed right-0 top-0 h-full w-full md:w-96 bg-[#0f0f0f] z-50 p-6 overflow-y-auto border-l border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Giỏ hàng</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white text-2xl">
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-10">Giỏ hàng trống</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-white/10">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-[#D4AF37] text-sm">{item.price}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateCart(item.id, -1)}
                            className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateCart(item.id, 1)}
                            className="w-7 h-7 bg-[#D4AF37] text-black rounded-full flex items-center justify-center hover:bg-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Tổng cộng</span>
                      <span className="text-2xl font-bold text-[#D4AF37]">
                        {(getTotalPrice() / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {selectedTable === 'TAKEAWAY' ? 'Mang về' : `Bàn số ${selectedTable}`}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowCart(false)
                      onConfirmOrder()
                    }}
                    className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all"
                  >
                    Xác nhận đơn hàng
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
