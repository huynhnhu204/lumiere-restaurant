'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, ChefHat, ArrowLeft } from 'lucide-react'

interface KitchenConfirmationProps {
  table: string | null
  serviceType: 'dine-in' | 'takeaway' | null
  items: any[]
  onBackToMenu: () => void
  onNewOrder: () => void
}

export default function KitchenConfirmation({ table, serviceType, items, onBackToMenu, onNewOrder }: KitchenConfirmationProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate sending to kitchen
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f0f0f] p-8 md:p-12 rounded-3xl border border-white/10 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="text-green-500" size={48} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-4"
          >
            Đơn Hàng Đã Được Gửi!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-400 mb-8"
          >
            Đơn hàng của bạn đang được xử lý
          </motion.p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#D4AF37] to-green-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Đang gửi đến bếp... {progress}%</p>
          </div>

          {/* Order Details */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                <ChefHat className="text-[#D4AF37]" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Mã đơn hàng</p>
                <p className="font-bold">ORD-{Date.now().toString().slice(-6)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Hình thức</span>
                <span className="font-medium">
                  {serviceType === 'takeaway' ? '🛍️ Mang về' : '🪑 Tại chỗ'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Vị trí</span>
                <span className="font-medium">
                  {table === 'TAKEAWAY' ? 'Nhận tại quầy' : `Bàn số ${table}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Số món</span>
                <span className="font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)} món</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Thời gian dự kiến</span>
                <span className="font-medium flex items-center gap-1">
                  <Clock size={14} /> 15-20 phút
                </span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left max-h-48 overflow-y-auto">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Chi tiết đơn hàng</h4>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-[#D4AF37] font-medium">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBackToMenu}
              className="flex-1 bg-white/5 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-all"
            >
              Thêm món
            </button>
            <button
              onClick={onNewOrder}
              className="flex-1 bg-[#D4AF37] text-black py-3 rounded-xl font-bold hover:bg-white transition-all"
            >
              Đặt bàn mới
            </button>
          </div>

          {/* Thank You Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-sm text-gray-500 italic"
          >
            Cảm ơn bạn đã tin tưởng LUMIÈRE ✨
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
}
