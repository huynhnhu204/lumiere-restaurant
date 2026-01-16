'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, ShoppingBag, Sparkles, ChevronDown } from 'lucide-react'
import StorySection from './StorySection'
import Footer from './Footer'

interface HeroSectionProps {
  onDineIn: () => void
  onTakeaway: () => void
}

export default function HeroSection({ onDineIn, onTakeaway }: HeroSectionProps) {
  return (
    <>
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000" alt="Restaurant" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 text-center max-w-4xl w-full px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#D4AF37]/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-[#D4AF37]/50">
              <Sparkles className="text-[#D4AF37]" size={40} />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-5xl md:text-7xl font-serif text-[#D4AF37] mb-4 tracking-wider">LUMIÈRE</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-gray-300 mb-12 tracking-wide">Nghệ thuật ẩm thực tinh hoa</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.button whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} onClick={onDineIn} className="group relative bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black p-8 rounded-2xl font-bold overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-black/20 rounded-full flex items-center justify-center"><UtensilsCrossed size={32} /></div>
                <h3 className="text-2xl font-serif mb-2">Đặt Bàn Tại Chỗ</h3>
                <p className="text-sm opacity-80">Chọn vị trí yêu thích</p>
              </div>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} onClick={onTakeaway} className="group relative bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl font-bold border-2 border-white/20 hover:border-[#D4AF37]/50">
              <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center"><ShoppingBag size={32} /></div>
                <h3 className="text-2xl font-serif mb-2">Mang Về</h3>
                <p className="text-sm opacity-80">Gọi món nhanh chóng</p>
              </div>
            </motion.button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 text-sm text-gray-500">💡 Quét mã QR tại bàn để gọi món nhanh hơn</motion.p>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <ChevronDown className="text-[#D4AF37]" size={32} />
        </motion.div>
      </motion.section>
      <StorySection />
      <Footer />
    </>
  )
}
