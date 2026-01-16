'use client'

import React, { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList,
  TrendingUp, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Clock,
  X,
  Save,
  Bell
} from 'lucide-react'

interface Order {
  id: string
  order_id: string
  table_number: string
  service_type: 'dine-in' | 'takeaway'
  items: any[]
  total_amount: number
  status: 'pending' | 'cooking' | 'completed' | 'cancelled'
  created_at: string
}

interface MenuItem {
  id: number
  name: string
  price: string
  category: string
  status: 'In Stock' | 'Out of Stock'
  description: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [supabaseConnected, setSupabaseConnected] = useState(false)
  
  // Mock State cho Menu (CRUD)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { 
      id: 1, 
      name: "Bò Wagyu Áp Chảo", 
      price: "1.250k", 
      category: "Món chính",
      status: "In Stock",
      description: "Thịt bò Wagyu A5 nhập khẩu"
    },
    { 
      id: 2, 
      name: "Súp Bào Ngư", 
      price: "850k", 
      category: "Khai vị",
      status: "In Stock",
      description: "Súp bào ngư tươi với nấm truffle"
    },
    { 
      id: 3, 
      name: "Tôm Hùm Alaska", 
      price: "2.800k", 
      category: "Món chính",
      status: "Out of Stock",
      description: "Tôm hùm Alaska nướng bơ tỏi"
    },
  ])

  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: '',
    category: 'Món chính',
    status: 'In Stock',
    description: ''
  })

  // Load orders from Supabase
  useEffect(() => {
    loadOrders()
    setupRealtimeSubscription()
  }, [])

  const loadOrders = async () => {
    try {
      const { getOrders } = await import('@/lib/supabaseClient')
      const { data, error } = await getOrders()
      
      if (error) throw error
      
      if (data) {
        setOrders(data)
        setSupabaseConnected(true)
      }
    } catch (error) {
      console.warn('Supabase not configured. Using mock data.')
      setSupabaseConnected(false)
      // Mock data
      setOrders([
        {
          id: '1',
          order_id: 'ORD-001',
          table_number: '12',
          service_type: 'dine-in',
          items: [{ name: 'Bò Wagyu', quantity: 2, price: '1.250k', priceNum: 1250000 }],
          total_amount: 2500000,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const setupRealtimeSubscription = async () => {
    try {
      const { subscribeToOrders } = await import('@/lib/supabaseClient')
      
      const channel = subscribeToOrders((payload) => {
        // Play notification sound
        playNotificationSound()
        
        // Add new order to list
        setOrders(prev => [payload.new, ...prev])
        
        // Show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('🔔 Đơn hàng mới!', {
            body: `Bàn ${payload.new.table_number} - ${payload.new.total_amount / 1000}k`,
            icon: '/icon.png'
          })
        }
      })

      return () => {
        const { unsubscribeFromOrders } = require('@/lib/supabaseClient')
        unsubscribeFromOrders(channel)
      }
    } catch (error) {
      console.warn('Real-time subscription not available')
    }
  }

  const playNotificationSound = () => {
    try {
      const audio = new Audio('/notification.mp3')
      audio.play().catch(e => console.log('Audio play failed:', e))
    } catch (error) {
      console.log('Notification sound not available')
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { updateOrderStatus: updateStatus } = await import('@/lib/supabaseClient')
      const { error } = await updateStatus(orderId, newStatus)
      
      if (error) throw error
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Error updating order:', error)
      // Fallback: update locally
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    }
  }

  const deleteMenuItem = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa món này?')) {
      setMenuItems(menuItems.filter(item => item.id !== id))
    }
  }

  const toggleItemStatus = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'In Stock' ? 'Out of Stock' : 'In Stock' } 
        : item
    ))
  }

  const addMenuItem = () => {
    if (!newItem.name || !newItem.price) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }
    
    const item: MenuItem = {
      id: Math.max(...menuItems.map(i => i.id)) + 1,
      name: newItem.name!,
      price: newItem.price!,
      category: newItem.category || 'Món chính',
      status: newItem.status || 'In Stock',
      description: newItem.description || ''
    }
    
    setMenuItems([...menuItems, item])
    setNewItem({ name: '', price: '', category: 'Món chính', status: 'In Stock', description: '' })
    setShowAddModal(false)
  }

  const updateMenuItem = () => {
    if (!editingItem) return
    
    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    ))
    setEditingItem(null)
  }

  // Statistics
  const stats = {
    todayRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    activeItems: menuItems.filter(i => i.status === 'In Stock').length
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col space-y-8">
        <h2 className="text-gold font-serif text-2xl font-bold tracking-tighter">LUMIÈRE OS</h2>
        
        <nav className="space-y-2">
          <div 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
              activeTab === 'dashboard' 
                ? 'text-gold bg-gold/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Tổng quan</span>
          </div>
          
          <div 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
              activeTab === 'orders' 
                ? 'text-gold bg-gold/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ClipboardList size={20} />
            <span>Đơn hàng QR</span>
            {stats.pendingOrders > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {stats.pendingOrders}
              </span>
            )}
          </div>
          
          <div 
            onClick={() => setActiveTab('menu')}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
              activeTab === 'menu' 
                ? 'text-gold bg-gold/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UtensilsCrossed size={20} />
            <span>Quản lý Menu</span>
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black font-bold">
              A
            </div>
            <div>
              <p className="font-medium text-sm">Admin</p>
              <p className="text-xs text-gray-500">Chủ sở hữu</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold font-serif">Chào Chủ sở hữu,</h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-gray-400">Hệ thống đang vận hành ổn định</p>
                  {supabaseConnected ? (
                    <span className="flex items-center gap-2 text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Real-time Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Mock Data
                    </span>
                  )}
                </div>
              </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Doanh thu hôm nay</p>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <p className="text-2xl font-bold">{(stats.todayRevenue / 1000).toFixed(0)}k</p>
              </div>
              
              <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Đơn chờ xử lý</p>
                  <Clock className="text-yellow-500" size={20} />
                </div>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              </div>
              
              <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Đơn hoàn thành</p>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                <p className="text-2xl font-bold">{stats.completedOrders}</p>
              </div>
              
              <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Món đang bán</p>
                  <UtensilsCrossed className="text-gold" size={20} />
                </div>
                <p className="text-2xl font-bold">{stats.activeItems}</p>
              </div>
            </div>

            {/* RECENT ORDERS */}
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bell className="text-gold" size={20} />
                Đơn hàng gần đây
              </h3>
              {loading ? (
                <div className="text-center py-10 text-gray-400">Đang tải...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-10 text-gray-400">Chưa có đơn hàng nào</div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="bg-[#111] border border-white/10 p-6 rounded-xl flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded">
                            {order.service_type === 'takeaway' ? 'MANG VỀ' : `BÀN ${order.table_number}`}
                          </span>
                          <span className="text-gray-500 text-xs">#{order.order_id}</span>
                          <span className="text-gray-500 text-xs">
                            {new Date(order.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="font-medium text-sm text-gray-300">
                          {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                        </p>
                        <p className="text-lg font-bold mt-2 text-gold">{(order.total_amount / 1000).toFixed(0)}k</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        order.status === 'cooking' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <>
            <header className="mb-10">
              <h1 className="text-3xl font-bold font-serif flex items-center gap-3">
                <Clock className="text-gold" size={28} />
                Đơn hàng từ QR
              </h1>
              <p className="text-gray-400">Quản lý đơn hàng thời gian thực</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map(order => (
                <div key={order.id} className="bg-[#111] border border-white/10 p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded">
                          BÀN {order.table}
                        </span>
                        <span className="text-gray-500 text-sm">#{order.id}</span>
                      </div>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-500/20 text-green-500' :
                      order.status === 'Cooking' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <p className="font-medium text-gray-300 mb-3">{order.items}</p>
                  <p className="text-2xl font-bold text-gold mb-4">{order.total}</p>
                  
                  <div className="flex gap-2">
                    {order.status === 'Pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Cooking')}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-500 py-2 rounded-lg font-medium text-sm transition"
                      >
                        Bắt đầu nấu
                      </button>
                    )}
                    {order.status === 'Cooking' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Completed')}
                        className="flex-1 bg-green-600 hover:bg-green-500 py-2 rounded-lg font-medium text-sm transition"
                      >
                        Hoàn thành
                      </button>
                    )}
                    {order.status === 'Completed' && (
                      <div className="flex-1 text-center py-2 text-green-500 font-medium text-sm">
                        ✓ Đã hoàn thành
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <>
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold font-serif">Quản lý thực đơn</h1>
                <p className="text-gray-400">Thêm, sửa, xóa món ăn</p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-white transition"
              >
                <Plus size={18} /> Thêm món mới
              </button>
            </header>

            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5">
              <table className="w-full">
                <thead className="bg-white/5 text-gray-400 text-sm">
                  <tr>
                    <th className="text-left p-4">Tên món</th>
                    <th className="text-left p-4">Danh mục</th>
                    <th className="text-left p-4">Giá</th>
                    <th className="text-left p-4">Trạng thái</th>
                    <th className="text-right p-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{item.category}</td>
                      <td className="p-4 text-gold font-bold">{item.price}</td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleItemStatus(item.id)}
                          className={`text-[10px] px-3 py-1 rounded-full font-medium ${
                            item.status === 'In Stock' 
                              ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
                              : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                          } transition`}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="text-gray-500 hover:text-gold transition"
                        >
                          <Edit2 size={16}/>
                        </button>
                        <button 
                          onClick={() => deleteMenuItem(item.id)}
                          className="text-gray-500 hover:text-red-500 transition"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] rounded-2xl p-8 max-w-md w-full border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Thêm món mới</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tên món"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none"
              />
              
              <input
                type="text"
                placeholder="Giá (VD: 1.250k)"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none"
              />
              
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none"
              >
                <option value="Khai vị">Khai vị</option>
                <option value="Món chính">Món chính</option>
                <option value="Đồ uống">Đồ uống</option>
                <option value="Tráng miệng">Tráng miệng</option>
              </select>
              
              <textarea
                placeholder="Mô tả món ăn"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none h-24"
              />
              
              <button
                onClick={addMenuItem}
                className="w-full bg-gold text-black py-3 rounded-lg font-bold hover:bg-white transition"
              >
                Thêm món
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] rounded-2xl p-8 max-w-md w-full border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Chỉnh sửa món</h3>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none"
              />
              
              <input
                type="text"
                value={editingItem.price}
                onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none"
              />
              
              <select
                value={editingItem.category}
                onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none"
              >
                <option value="Khai vị">Khai vị</option>
                <option value="Món chính">Món chính</option>
                <option value="Đồ uống">Đồ uống</option>
                <option value="Tráng miệng">Tráng miệng</option>
              </select>
              
              <textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-gold outline-none h-24"
              />
              
              <button
                onClick={updateMenuItem}
                className="w-full bg-gold text-black py-3 rounded-lg font-bold hover:bg-white transition flex items-center justify-center gap-2"
              >
                <Save size={18} /> Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
