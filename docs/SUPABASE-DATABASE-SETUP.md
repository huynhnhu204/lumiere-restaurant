# Hướng dẫn thiết lập Database Supabase

## Bước 1: Tạo bảng `orders`

Truy cập Supabase Dashboard → Table Editor → New Table

### Thông số cấu hình:

**Name:** `orders`

**Columns:**

| Column Name    | Type    | Default Value | Nullable | Notes                           |
|----------------|---------|---------------|----------|---------------------------------|
| id             | uuid    | gen_random_uuid() | No   | Primary Key (tự động tạo)       |
| order_id       | text    | -             | No       | Mã đơn hàng (VD: ORD-123456)    |
| table_number   | text    | -             | No       | Số bàn                          |
| service_type   | text    | 'dine-in'     | No       | Loại dịch vụ (dine-in/takeaway) |
| items          | jsonb   | -             | No       | Danh sách món ăn (JSON)         |
| total_amount   | int8    | -             | No       | Tổng tiền                       |
| status         | text    | 'pending'     | No       | Trạng thái đơn hàng             |
| created_at     | timestamptz | now()     | No       | Thời gian tạo                   |
| updated_at     | timestamptz | now()     | Yes      | Thời gian cập nhật              |

### Cấu hình quan trọng:

✅ **BỎ TÍCH:** Enable Row Level Security (RLS)  
   → Để khách hàng có thể gửi đơn hàng mà không cần xác thực

✅ **TÍCH CHỌN:** Enable Realtime  
   → Để màn hình Admin nhận đơn hàng real-time

## Bước 2: Tắt RLS (Row Level Security)

Vì đây là demo, chúng ta tạm thời tắt RLS để dễ test:

```sql
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
```

Hoặc trong giao diện Supabase:
- Vào Table Editor → orders → Settings
- Tắt "Enable Row Level Security"

## Bước 3: Lấy API Keys

1. Vào **Project Settings** → **API**
2. Copy 2 giá trị:
   - `Project URL` (VD: https://xxxxx.supabase.co)
   - `anon public` key

## Bước 4: Cấu hình môi trường

Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Bước 5: Test kết nối

Chạy lệnh:
```bash
npm run dev
```

Truy cập: http://localhost:3000/qr-order?table=01

Thử đặt món và kiểm tra trong Supabase Table Editor xem có dữ liệu mới không.

## Cấu trúc dữ liệu mẫu

Khi khách đặt món, dữ liệu sẽ được lưu như sau:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "order_id": "ORD-1705401234567",
  "table_number": "12",
  "service_type": "dine-in",
  "items": [
    {
      "id": 1,
      "name": "Bò Wagyu Áp Chảo",
      "quantity": 2,
      "price": "1.250k",
      "priceNum": 1250000
    }
  ],
  "total_amount": 2500000,
  "status": "pending",
  "created_at": "2025-01-16T10:30:00Z"
}
```

## Troubleshooting

### Lỗi: "Failed to fetch"
- Kiểm tra lại URL và API Key trong `.env.local`
- Đảm bảo đã tắt RLS

### Lỗi: "permission denied"
- Vào Table Editor → orders → Settings
- Tắt "Enable Row Level Security"

### Không nhận được real-time updates
- Kiểm tra "Enable Realtime" đã được bật
- Refresh lại trang Admin
