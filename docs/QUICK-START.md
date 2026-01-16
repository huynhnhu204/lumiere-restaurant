# 🚀 Hướng dẫn khởi động nhanh

## ✅ Những gì đã hoàn thành

1. ✅ Tạo file `netlify.toml` - Sửa lỗi "Page not found" khi refresh
2. ✅ Kết nối Supabase vào nút "Đặt món"
3. ✅ Cập nhật màn hình Admin để nhận đơn hàng real-time
4. ✅ Push code lên GitHub

## 📋 Các bước tiếp theo

### Bước 1: Cấu hình Supabase Database

Làm theo file: `docs/SUPABASE-DATABASE-SETUP.md`

**Tóm tắt:**
1. Vào Supabase Dashboard → Table Editor → New Table
2. Tạo bảng `orders` với các cột:
   - `id` (uuid, primary key)
   - `order_id` (text)
   - `table_number` (text)
   - `service_type` (text, default: 'dine-in')
   - `items` (jsonb)
   - `total_amount` (int8)
   - `status` (text, default: 'pending')
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

3. **QUAN TRỌNG:**
   - ❌ BỎ TÍCH: "Enable Row Level Security (RLS)"
   - ✅ TÍCH CHỌN: "Enable Realtime"

### Bước 2: Lấy API Keys từ Supabase

1. Vào **Project Settings** → **API**
2. Copy:
   - `Project URL`
   - `anon public` key

### Bước 3: Cấu hình Netlify Environment Variables

1. Vào Netlify Dashboard → Site settings → Environment variables
2. Thêm 2 biến:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Nhấn **Save** → **Trigger deploy** để deploy lại

### Bước 4: Đổi tên miền Netlify (Tùy chọn)

1. Vào **Site settings** → **Domain management**
2. Nhấn **Options** → **Edit site name**
3. Đổi từ `chic-froyo-b79746` thành `lumiere-restaurant`
4. URL mới: `https://lumiere-restaurant.netlify.app`

### Bước 5: Test hệ thống

**Test đặt món:**
1. Truy cập: `https://lumiere-restaurant.netlify.app/qr-order?table=01`
2. Thêm món vào giỏ hàng
3. Nhấn "Gửi đơn hàng"
4. Kiểm tra Supabase Table Editor xem có dữ liệu mới không

**Test màn hình Admin:**
1. Truy cập: `https://lumiere-restaurant.netlify.app/admin`
2. Mở tab "Đơn hàng QR"
3. Đặt món từ trang QR Order
4. Màn hình Admin sẽ tự động hiện đơn hàng mới (real-time)

### Bước 6: Tạo mã QR cho bàn

1. Truy cập: https://me-qr.com
2. Nhập URL: `https://lumiere-restaurant.netlify.app/qr-order?table=01`
3. Tải mã QR về và in ra
4. Lặp lại cho các bàn khác (table=02, table=03, ...)

## 🎯 Cấu trúc URL

- **Trang chủ:** `/`
- **Đặt món QR:** `/qr-order?table=XX`
- **Admin Dashboard:** `/admin`
- **Restaurant OS:** `/restaurant-os`

## 🔧 Troubleshooting

### Lỗi: "Cannot connect to Supabase"
- Kiểm tra Environment Variables trong Netlify
- Đảm bảo đã trigger deploy sau khi thêm biến môi trường

### Lỗi: "Permission denied"
- Vào Supabase → Table Editor → orders → Settings
- Tắt "Enable Row Level Security"

### Không nhận real-time updates
- Kiểm tra "Enable Realtime" đã bật trong Supabase
- Refresh lại trang Admin

## 📱 Demo Flow

1. Khách quét mã QR tại bàn → Mở trang đặt món
2. Khách chọn món → Thêm vào giỏ hàng
3. Khách nhấn "Gửi đơn hàng"
4. Đơn hàng được lưu vào Supabase
5. Màn hình Admin tự động hiện đơn mới (real-time)
6. Nhân viên bếp nhấn "Bắt đầu nấu"
7. Sau khi xong, nhấn "Hoàn thành"

## 🎉 Hoàn tất!

Hệ thống của bạn đã sẵn sàng hoạt động!
