import { createClient } from '@supabase/supabase-js'

// Supabase Configuration
// Thay thế bằng URL và API Key của bạn từ https://supabase.com/dashboard
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Order {
  id?: string
  order_id: string
  table_number: string
  service_type: 'dine-in' | 'takeaway'
  items: OrderItem[]
  total_amount: number
  status: 'pending' | 'cooking' | 'completed' | 'cancelled'
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  id: number
  name: string
  quantity: number
  price: string
  priceNum: number
}

// Helper Functions
export const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating order:', error)
    return { data: null, error }
  }
}

export const getOrders = async (status?: string) => {
  try {
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return { data: null, error }
  }
}

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating order:', error)
    return { data: null, error }
  }
}

// Real-time Subscription
export const subscribeToOrders = (callback: (payload: any) => void) => {
  const channel = supabase
    .channel('orders-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'orders'
      },
      (payload) => {
        console.log('🔔 New order received!', payload.new)
        callback(payload)
      }
    )
    .subscribe()

  return channel
}

export const unsubscribeFromOrders = (channel: any) => {
  supabase.removeChannel(channel)
}
