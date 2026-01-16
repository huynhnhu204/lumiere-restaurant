'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Eye, Heart } from 'lucide-react'

interface Table {
  id: string
  status: 'available' | 'occupied'
  x: string
  y: string
  type?: 'standard' | 'vip' | 'window' | 'romantic'
  label?: string
}

interface FloorPlanProps {
  onSelectTable: (tableId: string) => void
  onBack: () => void
}

const TABLES: Table[] = [
  // Standard Tables - Left Side
  { id: '01', status: 'available', x: '15%', y: '20%', type: 'standard' },
  { id: '02', status: 'occupied', x: '15%', y: '40%', type: 'standard' },
  { id: '03', status: 'available', x: '15%', y: '60%', type: 'standard' },
  { id: '04', status: 'available', x: '15%', y: '80%', type: 'standard' },
  
  // Center Tables
  { id: '05', status: 'available', x: '40%', y: '25%', type: 'standard' },
  { id: '06', status: 'occupied', x: '40%', y: '50%', type: 'standard' },
  { id: '07', status: 'available', x: '40%', y: '75%', type: 'standard' },
  
  // Window View - Right Side
  { id: '08', status: 'available', x: '70%', y: '20%', type: 'window', label: 'Window View' },
  { id: '09', status: 'available', x: '70%', y: '45%', type: 'window', label: 'Window View' },
  { id: '10', status: 'occupied', x: '70%', y: '70%', type: 'window', label: 'Window View' },
  
  // VIP Tables - Top
  { id: 'VIP-1', status: 'available', x: '50%', y: '10%', type: 'vip', label: 'VIP' },
  
  // Romantic Corner - Bottom Right
  { id: 'R-1', status: 'available', x: '85%', y: '85%', type: 'romantic', label: 'Romantic' },
]

export default function FloorPlan({ onSelectTable, onBack }: FloorPlanProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const getTableStyle = (table: Table) => {
    const isSelected = selected === table.id
    const isOccupied = table.status === 'occupied'
    
    let baseClass = 'absolute cursor-pointer flex flex-col items-center justify-center rounded-xl font-bold transition-all duration-300 '
    
    // Size based on type
    if (table.type === 'vip') {
      baseClass += 'w-24 h-24 '
    } else if (table.type === 'romantic') {
      baseClass += 'w-20 h-20 '
    } else {
      baseClass += 'w-16 h-16 '
    }
    
    // Color based on status
    if (isSelected) {
      baseClass += 'bg-[#D4AF37] text-black border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.6)] scale-110'
    } else if (isOccupied) {
      baseClass += 'bg-gray-800/50 text-gray-600 border border-gray-700 cursor-not-allowed'
    } else {
      baseClass += 'bg-transparent border-2 border-white/30 text-white hover:border-[#D4AF37] hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'
    }
    
    return baseClass
  }

  const getTableIcon = (type?: string) => {
    switch(type) {
      case 'vip': return <Sparkles size={16} className="mb-1" />
      case 'window': return <Eye size={14} className="mb-1" />
      case 'romantic': return <Heart size={14} className="mb-1" />
      default: return null
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
    >
      <div className="max-w-6xl w-full">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4">
            Sơ Đồ Chỗ Ngồi
          </h2>
          <p className="text-gray-400">Chọn vị trí bàn yêu thích của bạn</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f0f0f] p-6 md:p-8 rounded-3xl border border-white/10"
        >
          {/* Floor Plan Container */}
          <div className="relative w-full aspect-[4/3] bg-[#1a1a1a] rounded-2xl border-2 border-dashed border-white/20 p-4 overflow-hidden">
            {/* Entrance */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-800 px-6 py-2 rounded-b-xl text-xs tracking-[0.3em] text-gray-400 border-x border-b border-white/10">
              LỐI VÀO
            </div>

            {/* Kitchen Area */}
            <div className="absolute bottom-4 left-4 bg-red-900/20 px-4 py-2 rounded-lg text-xs tracking-wider text-red-400 border border-red-900/30">
              BẾP
            </div>

            {/* Bar Area */}
            <div className="absolute top-4 right-4 bg-blue-900/20 px-4 py-2 rounded-lg text-xs tracking-wider text-blue-400 border border-blue-900/30">
              QUẦY BAR
            </div>

            {/* Tables */}
            {TABLES.map((table) => (
              <motion.div
                key={table.id}
                whileTap={{ scale: table.status === 'available' ? 0.9 : 1 }}
                onClick={() => {
                  if (table.status === 'available') {
                    setSelected(table.id)
                  }
                }}
                className={getTableStyle(table)}
                style={{ left: table.x, top: table.y }}
              >
                {getTableIcon(table.type)}
                <span className="text-xs md:text-sm font-bold">{table.id}</span>
                {table.label && (
                  <span className="text-[8px] md:text-[10px] opacity-70 mt-0.5">
                    {table.label}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 rounded"></span>
              <span className="text-gray-400">Trống</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-800 rounded"></span>
              <span className="text-gray-400">Đã có khách</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#D4AF37] rounded"></span>
              <span className="text-gray-400">Đang chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="text-gray-400">VIP</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-blue-400" />
              <span className="text-gray-400">View Đẹp</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-pink-400" />
              <span className="text-gray-400">Lãng Mạn</span>
            </div>
          </div>

          {/* Confirm Button */}
          {selected && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTable(selected)}
              className="w-full mt-8 bg-[#D4AF37] text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Xác nhận bàn {selected} & Xem Menu
            </motion.button>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <span className="text-green-400 font-bold">
            {TABLES.filter(t => t.status === 'available').length}
          </span>
          {' '}bàn trống • {' '}
          <span className="text-red-400 font-bold">
            {TABLES.filter(t => t.status === 'occupied').length}
          </span>
          {' '}bàn đã đặt
        </motion.div>
      </div>
    </motion.section>
  )
}
