# Hướng dẫn Deploy lên Netlify

## ✅ Đã hoàn thành

File `netlify.toml` đã được tạo để xử lý routing của Next.js/React.

## Cách hoạt động

File `netlify.toml` chứa cấu hình redirect:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Điều này giúp:
- Xử lý các đường dẫn con như `/qr-order`, `/admin`, `/restaurant-os`
- Tránh lỗi "Page not found" khi refresh trang
- Cho phép React Router hoạt động đúng cách

## Bước tiếp theo

1. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "Add Netlify config and Supabase integration"
   git push origin main
   ```

2. **Netlify sẽ tự động deploy lại**
   - Vào Netlify Dashboard
   - Chờ build hoàn tất (khoảng 1-2 phút)
   - Lỗi "Page not found" sẽ biến mất

3. **Đổi tên miền (Optional):**
   - Vào **Site settings** → **Domain management**
   - Click **Options** → **Edit site name**
   - Đổi từ `chic-froyo-b79746` thành `lumiere-restaurant`
   - URL mới: `https://lumiere-restaurant.netlify.app`

4. **Cấu hình Environment Variables:**
   - Vào **Site settings** → **Environment variables**
   - Thêm 2 biến:
     - `NEXT_PUBLIC_SUPABASE_URL`: URL Supabase của bạn
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key từ Supabase
   - Click **Save** và **Trigger deploy**

## Test sau khi deploy

1. Truy cập: `https://your-site.netlify.app/qr-order?table=01`
2. Thử đặt món
3. Mở tab mới: `https://your-site.netlify.app/admin`
4. Kiểm tra đơn hàng có hiện lên không

## Tạo QR Code

Sau khi có URL chính thức, tạo QR code cho từng bàn:

**Format URL:**
```
https://lumiere-restaurant.netlify.app/qr-order?table=01
https://lumiere-restaurant.netlify.app/qr-order?table=02
...
```

**Công cụ tạo QR:**
- https://me-qr.com
- https://www.qr-code-generator.com
- Hoặc dùng script có sẵn: `npm run generate-qr`

## Troubleshooting

### Vẫn bị lỗi 404 sau khi push
- Kiểm tra file `netlify.toml` có ở thư mục gốc không
- Xem build log trong Netlify Dashboard
- Thử clear cache và rebuild

### Supabase không hoạt động trên production
- Kiểm tra Environment Variables đã được set chưa
- Vào Supabase Dashboard → Settings → API → URL Restrictions
- Thêm domain Netlify vào whitelist (nếu có)
