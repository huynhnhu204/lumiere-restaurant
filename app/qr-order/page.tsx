'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Send, ArrowLeft, Check } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  price: string
  priceNum: number
  category: string
  image: string
  description: string
}

interface CartItem extends MenuItem {
  quantity: number
}

const MENU_DATA: MenuItem[] = [
  { 
    id: 1, 
    name: "Bò Wagyu Áp Chảo", 
    price: "1.250k",
    priceNum: 1250000,
    category: "Món chính", 
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=500",
    description: "Thịt bò Wagyu A5 nhập khẩu, áp chảo hoàn hảo"
  },
  { 
    id: 2, 
    name: "Súp Bào Ngư", 
    price: "850k",
    priceNum: 850000,
    category: "Khai vị", 
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500",
    description: "Súp bào ngư tươi với nấm truffle đen"
  },
  { 
    id: 3, 
    name: "Rượu Vang Chateau", 
    price: "3.500k",
    priceNum: 3500000,
    category: "Đồ uống", 
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500",
    description: "Rượu vang đỏ Pháp năm 2015"
  },
  { 
    id: 4, 
    name: "Tôm Hùm Alaska", 
    price: "2.800k",
    priceNum: 2800000,
    category: "Món chính", 
    image: "https://images.unsplash.com/photo-1559737558-2f5a2f3e2f3f?q=80&w=500",
    description: "Tôm hùm Alaska nướng bơ tỏi"
  },
  { 
    id: 5, 
    name: "Salad Trứng Cá Hồi", 
    price: "650k",
    priceNum: 650000,
    category: "Khai vị", 
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500",
    description: "Salad tươi với trứng cá hồi Nhật"
  },
  { 
    id: 6, 
    name: "Tiramisu Đặc Biệt", 
    price: "450k",
    priceNum: 450000,
    category: "Tráng miệng", 
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500",
    description: "Tiramisu Ý truyền thống"
  }
]

export default function QROrderPage() {
  const [tableNumber, setTableNumber] = useState<string>('')
  const [showTableInput, setShowTableInput] = useState(false)
  const [category, setCategory] = useState('Tất cả')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [orderSent, setOrderSent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Tự động lấy số bàn từ URL khi trang load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const table = params.get('table')
    
    if (table) {
      setTableNumber(table)
      setShowTableInput(false)
    } else {
      // Nếu không có tham số table, yêu cầu nhập thủ công (fallback)
      setShowTableInput(true)
    }
    
    setIsLoading(false)
  }, [])

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0)
  }

  const sendOrder = async () => {
    if (cart.length === 0) {
      alert('Giỏ hàng trống!')
      return
    }
    
    try {
      const { createOrder } = await import('@/lib/supabaseClient')
      
      const orderData = {
        order_id: `ORD-${Date.now()}`,
        table_number: tableNumber,
        service_type: 'dine-in' as const,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          priceNum: item.priceNum
        })),
        total_amount: getTotalPrice(),
        status: 'pending' as const
      }
      
      const { data, error } = await createOrder(orderData)
      
      if (error) {
        console.error('Lỗi gửi đơn hàng:', error)
        alert('Có lỗi xảy ra, vui lòng thử lại!')
        return
      }
      
      console.log('✅ Đơn hàng đã được gửi:', data)
      setOrderSent(true)
      
      setTimeout(() => {
        setCart([])
        setOrderSent(false)
        setShowCart(false)
      }, 3000)
    } catch (error) {
      console.error('Lỗi kết nối:', error)
      alert('Không thể kết nối đến server. Vui lòng kiểm tra cấu hình Supabase!')
    }
  }

  const filteredMenu = category === 'Tất cả' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === category)

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-gold text-xl font-serif">Đang tải...</div>
      </div>
    )
  }

  // Fallback: Nếu không có số bàn từ QR, yêu cầu nhập thủ công
  if (showTableInput) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111] p-8 rounded-2xl border border-white/10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="text-black" size={40} />
          </div>
          
          <h1 className="text-3xl font-serif text-gold mb-2">LUMIÈRE</h1>
          <p className="text-gray-400 mb-4">Chào mừng quý khách</p>
          <p className="text-xs text-red-400 mb-8">⚠️ Vui lòng quét mã QR tại bàn để gọi món</p>
          
          <input
            type="text"
            placeholder="Nhập số bàn của bạn"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-center text-2xl font-bold focus:border-gold outline-none mb-6"
          />
          
          <button
            onClick={() => {
              if (tableNumber.trim()) {
                setShowTableInput(false)
              } else {
                alert('Vui lòng nhập số bàn')
              }
            }}
            className="w-full bg-gold text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white transition"
          >
            Bắt đầu gọi món
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal text-cream pb-24">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-gold/30">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <span className="text-gold font-bold text-lg">{tableNumber}</span>
            </div>
            <div>
              <h2 className="font-serif text-xl text-gold">LUMIÈRE</h2>
              <p className="text-xs text-gray-400">Bàn số {tableNumber}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowCart(true)}
            className="relative"
          >
            <ShoppingCart className="text-gold" size={28} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
        
        {/* CATEGORY FILTER */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
          {["Tất cả", "Khai vị", "Món chính", "Đồ uống", "Tráng miệng"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                category === cat 
                  ? 'bg-gold text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MENU GRID */}
      <div className="p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredMenu.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key={item.id}
              className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                  <p className="text-gold font-bold">{item.price}</p>
                </div>
                
                <button
                  onClick={() => addToCart(item)}
                  className="self-end bg-gold text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-white transition flex items-center gap-2"
                >
                  <Plus size={16} /> Thêm
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CART BOTTOM SHEET */}
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
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-[#111] rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Giỏ hàng</h3>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">Giỏ hàng trống</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-white/10">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gold text-sm">{item.price}</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center hover:bg-white"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Tổng cộng</span>
                        <span className="text-2xl font-bold text-gold">
                          {(getTotalPrice() / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-xs">{tableNumber}</span>
                        </div>
                        <p className="text-xs text-gray-400">Bàn số {tableNumber}</p>
                      </div>
                    </div>
                    
                    {orderSent ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-600 text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                      >
                        <Check size={24} /> Đơn hàng đã được gửi!
                      </motion.div>
                    ) : (
                      <button
                        onClick={sendOrder}
                        className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition flex items-center justify-center gap-2"
                      >
                        <Send size={20} /> Gửi đơn hàng
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
