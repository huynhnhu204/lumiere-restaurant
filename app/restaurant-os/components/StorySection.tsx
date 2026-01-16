'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Award, Heart } from 'lucide-react'

export default function StorySection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] mb-4 block">
            Câu chuyện của chúng tôi
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            LUMIÈRE – Nơi Ánh Sáng <br className="hidden md:block" />
            Gặp Gỡ Hương Vị
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Image with Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800"
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold flex items-center gap-2">
                <Award size={20} />
                <span>Michelin Guide 2026</span>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#D4AF37]/30 rounded-full -z-10" />
          </motion.div>

          {/* Right - Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              Tại <span className="text-[#D4AF37] font-serif">Lumière</span>, chúng tôi tin rằng một bữa tiệc thượng lưu không chỉ bắt đầu từ đĩa ăn, mà từ khoảnh khắc ánh sáng nến chạm vào ly vang pha lê.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              Mỗi nguyên liệu tại đây đều được lựa chọn khắt khe theo mùa, được nâng niu bởi bàn tay nghệ nhân để giữ trọn tinh túy của đất trời. Không chỉ là ẩm thực, Lumière là một bản giao hưởng của vị giác, không gian và cảm xúc.
            </p>

            <p className="text-gray-400 leading-relaxed italic border-l-2 border-[#D4AF37] pl-4">
              "Nơi mỗi thực khách là tâm điểm của sự tận tâm."
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="text-[#D4AF37]" size={24} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Organic</p>
                <p className="text-sm font-medium text-white">Nguyên liệu tươi</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="text-[#D4AF37]" size={24} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Signature</p>
                <p className="text-sm font-medium text-white">Đầu bếp 5 sao</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-[#D4AF37]" size={24} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Emotion</p>
                <p className="text-sm font-medium text-white">Không gian tinh tế</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">15+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Năm kinh nghiệm</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">50+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Món ăn đặc sắc</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">10K+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Khách hàng hài lòng</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">4.9★</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Đánh giá trung bình</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
