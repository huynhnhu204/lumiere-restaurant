'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const currentHour = new Date().getHours()
  const isOpen = currentHour >= 10 && currentHour < 22

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-3xl font-serif text-[#D4AF37] mb-4">LUMIÈRE</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Nghệ thuật ẩm thực tinh hoa, nơi mỗi bữa ăn là một trải nghiệm đáng nhớ.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#D4AF37] rounded-full flex items-center justify-center transition-all group">
                <Instagram size={18} className="text-gray-400 group-hover:text-black" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#D4AF37] rounded-full flex items-center justify-center transition-all group">
                <Facebook size={18} className="text-gray-400 group-hover:text-black" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-[#D4AF37] rounded-full flex items-center justify-center transition-all group">
                <Youtube size={18} className="text-gray-400 group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* Column 2 - Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#D4AF37] flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-gray-300 text-sm">123 Đường Lê Lợi</p>
                  <p className="text-gray-400 text-sm">Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-[#D4AF37] flex-shrink-0" size={18} />
                <a href="tel:0901234567" className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors">
                  0901 234 567
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="text-[#D4AF37] flex-shrink-0" size={18} />
                <a href="mailto:contact@lumiere.vn" className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors">
                  contact@lumiere.vn
                </a>
              </div>
            </div>
          </div>

          {/* Column 3 - Hours */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Giờ mở cửa</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Thứ 2 - Thứ 6</span>
                <span className="text-gray-300">10:00 - 22:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Thứ 7 - Chủ nhật</span>
                <span className="text-gray-300">09:00 - 23:00</span>
              </div>
              
              {/* Status Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
                isOpen 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                <Clock size={14} />
                <span>{isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Nhận ưu đãi</h4>
            <p className="text-gray-400 text-sm mb-4">
              Đăng ký để nhận lời mời cho những đêm tiệc thượng lưu
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
              <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-white transition-colors">
                Gửi
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 LUMIÈRE Restaurant. All rights reserved.
            </p>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </footer>
  )
}
