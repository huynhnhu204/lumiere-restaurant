# 🔥 Hướng Dẫn Thiết Lập Supabase Real-time

## Bước 1: Tạo Project Supabase

1. Truy cập https://supabase.com
2. Đăng ký/Đăng nhập
3. Click "New Project"
4. Điền thông tin:
   - Name: `lumiere-restaurant`
   - Database Password: (tạo password mạnh)
   - Region: `Southeast Asia (Singapore)` (gần VN nhất)
5. Click "Create new project" và đợi ~2 phút

## Bước 2: Tạo Bảng Orders

1. Vào **SQL Editor** (sidebar bên trái)
2. Click "New query"
3. Copy và paste đoạn SQL sau:

```sql
-- Tạo bảng orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  table_number TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('dine-in', 'takeaway')),
  items JSONB NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'cooking', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để query nhanh hơn
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_table_number ON orders(table_number);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép mọi người đọc và tạo orders (public access)
CREATE POLICY "Enable read access for all users" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON orders
  FOR UPDATE USING (true);

-- Tạo function để tự động update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
```

4. Click "Run" (hoặc Ctrl+Enter)
5. Kiểm tra: Vào **Table Editor** → Bạn sẽ thấy bảng `orders`

## Bước 3: Lấy API Keys

1. Vào **Settings** → **API**
2. Copy 2 thông tin:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Bước 4: Cấu Hình Project

1. Tạo file `.env.local` trong thư mục root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Thay thế bằng URL và Key của bạn

3. Restart dev server:
```bash
npm run dev
```

## Bước 5: Test Real-time

### Test 1: Tạo Order từ Web
1. Vào http://localhost:3000
2. Chọn bàn và gọi món
3. Click "Xác nhận đơn hàng"
4. Vào Supabase → **Table Editor** → `orders` → Bạn sẽ thấy order mới!

### Test 2: Real-time Kitchen Display
1. Mở 2 tab:
   - Tab 1: http://localhost:3000/admin (Kitchen Display)
   - Tab 2: http://localhost:3000 (Customer)
2. Ở Tab 2: Đặt món
3. Ở Tab 1: Sẽ thấy đơn hàng xuất hiện NGAY LẬP TỨC! 🔔

## Bước 6: Thêm Âm Thanh Thông Báo (Optional)

Tạo file `public/notification.mp3` (tải âm thanh "ting" từ internet)

Trong Admin Dashboard, thêm:

```javascript
const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3')
  audio.play()
}

// Trong subscription callback:
subscribeToOrders((payload) => {
  playNotificationSound()
  // ... rest of code
})
```

## 🔧 Troubleshooting

### Lỗi: "Invalid API key"
- Kiểm tra lại `.env.local`
- Đảm bảo dùng `NEXT_PUBLIC_` prefix
- Restart dev server

### Lỗi: "relation 'orders' does not exist"
- Chạy lại SQL script ở Bước 2
- Kiểm tra bảng đã được tạo trong Table Editor

### Real-time không hoạt động
- Kiểm tra đã chạy: `ALTER PUBLICATION supabase_realtime ADD TABLE orders;`
- Vào **Database** → **Replication** → Đảm bảo `orders` table được enable

## 📊 Database Schema

```
orders
├── id (UUID, Primary Key)
├── order_id (TEXT, Unique) - Mã đơn hàng
├── table_number (TEXT) - Số bàn
├── service_type (TEXT) - 'dine-in' hoặc 'takeaway'
├── items (JSONB) - Danh sách món ăn
├── total_amount (NUMERIC) - Tổng tiền
├── status (TEXT) - 'pending', 'cooking', 'completed', 'cancelled'
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## 🚀 Next Steps

1. **Deploy lên Vercel**: 
   - Add environment variables trong Vercel dashboard
   - Deploy tự động khi push code

2. **Thêm Authentication**:
   - Protect Admin routes
   - Supabase Auth integration

3. **Analytics**:
   - Track popular dishes
   - Revenue reports
   - Peak hours analysis

4. **Notifications**:
   - Email notifications cho owner
   - SMS cho khách khi order ready
   - Push notifications

## 💡 Tips

- Supabase Free tier: 500MB database, 2GB bandwidth/month
- Đủ cho ~1000 orders/tháng
- Upgrade khi cần: $25/month cho Unlimited

---

**Developed with ❤️ for LUMIÈRE Restaurant**
