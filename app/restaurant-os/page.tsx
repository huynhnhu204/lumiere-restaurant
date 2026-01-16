'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import FloorPlan from './components/FloorPlan'
import SmartMenu from './components/SmartMenu'
import KitchenConfirmation from './components/KitchenConfirmation'

export default function RestaurantOS() {
  const [currentStep, setCurrentStep] = useState<'hero' | 'floor' | 'menu' | 'confirm'>('hero')
  const [serviceType, setServiceType] = useState<'dine-in' | 'takeaway' | null>(null)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [cart, setCart] = useState<any[]>([])
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  // Auto-detect table from URL (QR Code scenario)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const table = params.get('table')
    
    if (table) {
      // Khách quét QR → Vào thẳng menu
      setSelectedTable(table)
      setServiceType('dine-in')
      setCurrentStep('menu')
    }
  }, [])

  // Handler: Chọn "Đặt bàn tại chỗ"
  const handleDineIn = () => {
    setServiceType('dine-in')
    setCurrentStep('floor')
  }

  // Handler: Chọn "Mang về"
  const handleTakeaway = () => {
    setServiceType('takeaway')
    setSelectedTable('TAKEAWAY')
    setCurrentStep('menu')
  }

  // Handler: Chọn bàn từ Floor Plan
  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId)
    setCurrentStep('menu')
  }

  // Handler: Thêm món vào giỏ
  const handleAddToCart = (item: any) => {
    const existing = cart.find(c => c.id === item.id)
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? {...c, quantity: c.quantity + 1} : c))
    } else {
      setCart([...cart, {...item, quantity: 1}])
    }
  }

  // Handler: Cập nhật số lượng trong giỏ
  const handleUpdateCart = (itemId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta
        return newQuantity > 0 ? {...item, quantity: newQuantity} : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  // Handler: Xác nhận đơn hàng
  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      alert('Giỏ hàng trống!')
      return
    }
    
    setCurrentStep('confirm')
    setOrderConfirmed(true)
    
    // Tạo order data
    const orderData = {
      order_id: `ORD-${Date.now()}`,
      table_number: selectedTable || 'UNKNOWN',
      service_type: serviceType || 'dine-in',
      items: cart,
      total_amount: cart.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0),
      status: 'pending' as const
    }
    
    // Log to console (fallback nếu chưa setup Supabase)
    console.log('🔔 ORDER SENT TO KITCHEN:', orderData)
    
    // Gửi lên Supabase (nếu đã cấu hình)
    try {
      const { createOrder } = await import('@/lib/supabaseClient')
      const { data, error } = await createOrder(orderData)
      
      if (error) {
        console.error('Supabase error:', error)
        alert('⚠️ Đơn hàng đã được ghi nhận nhưng có lỗi khi đồng bộ. Vui lòng thông báo nhân viên.')
      } else {
        console.log('✅ Order saved to Supabase:', data)
      }
    } catch (error) {
      console.warn('Supabase not configured. Order logged to console only.')
    }
  }

  // Handler: Quay lại menu sau khi confirm
  const handleBackToMenu = () => {
    setCurrentStep('menu')
    setOrderConfirmed(false)
    setCart([])
  }

  // Handler: Đặt món mới (reset toàn bộ)
  const handleNewOrder = () => {
    setCurrentStep('hero')
    setServiceType(null)
    setSelectedTable(null)
    setCart([])
    setOrderConfirmed(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {/* Step 1: Hero - Chọn hình thức */}
        {currentStep === 'hero' && (
          <HeroSection 
            key="hero" 
            onDineIn={handleDineIn}
            onTakeaway={handleTakeaway}
          />
        )}
        
        {/* Step 2: Floor Plan - Chọn bàn (chỉ khi dine-in) */}
        {currentStep === 'floor' && (
          <FloorPlan 
            key="floor" 
            onSelectTable={handleTableSelect}
            onBack={() => setCurrentStep('hero')}
          />
        )}
        
        {/* Step 3: Menu - Gọi món */}
        {currentStep === 'menu' && (
          <SmartMenu 
            key="menu"
            selectedTable={selectedTable}
            serviceType={serviceType}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCart={handleUpdateCart}
            onConfirmOrder={handleConfirmOrder}
            onBack={() => {
              if (serviceType === 'takeaway') {
                setCurrentStep('hero')
              } else {
                setCurrentStep('floor')
              }
            }}
          />
        )}
        
        {/* Step 4: Confirmation - Thành công */}
        {currentStep === 'confirm' && orderConfirmed && (
          <KitchenConfirmation 
            key="confirm"
            table={selectedTable}
            serviceType={serviceType}
            items={cart}
            onBackToMenu={handleBackToMenu}
            onNewOrder={handleNewOrder}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
