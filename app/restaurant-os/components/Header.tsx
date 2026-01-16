'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, MapPin } from 'lucide-react'

interface HeaderProps {
  selectedTable: string | null
  cartCount: number
  onCartClick: () => void
  showBack?: boolean
  onBack?: () => void
}

export default function Header({ selectedTable, cartCount, onCartClick, showBack, onBack }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left - Back or Location */}
          <div className="w-24">
            {showBack && onBack ? (
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm hidden md:inline">Quay lại</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <MapPin size={14} />
                <span className="hidden md:inline">TP.HCM</span>
              </div>
            )}
          </div>

          {/* Center - Logo */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-serif text-[#D4AF37] tracking-wider">
              LUMIÈRE
            </h1>
            <p className="text-[8px] md:text-[10px] text-gray-400 tracking-[0.3em] uppercase">
              Fine Dining
            </p>
          </div>

          {/* Right - Table & Cart */}
          <div className="flex items-center gap-3 w-24 justify-end">
            {selectedTable && (
              <div className="hidden md:flex items-center gap-2 bg-[#D4AF37]/20 px-3 py-1.5 rounded-full border border-[#D4AF37]/30">
                <span className="text-[10px] text-gray-400 uppercase">
                  {selectedTable === 'TAKEAWAY' ? 'Mang về' : `Bàn ${selectedTable}`}
                </span>
              </div>
            )}
            
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <ShoppingCart className="text-[#D4AF37]" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
