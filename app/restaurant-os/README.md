# 🍽️ LUMIÈRE Restaurant OS 2026

## Siêu Phẩm Web App Nhà Hàng Cao Cấp

Hệ thống quản lý nhà hàng toàn diện với giao diện sang trọng, tích hợp Floor Plan, QR Ordering và Real-time Kitchen Sync.

## ✨ Tính Năng Đặc Biệt

### 🎬 Hero Section
- Animation fade-in mượt mà
- Video/Image background cinematic
- CTA button với hiệu ứng glow

### 🎯 Service Choice
- 2 lựa chọn: **Tại nhà hàng** hoặc **Mang về**
- Card design với hover effects
- Icon animation

### 🗺️ Floor Plan (Sơ đồ bàn)
- **Trực quan hóa** mặt bằng nhà hàng
- **Trạng thái real-time**: Trống / Đã đặt / Đang chọn
- **Phân loại bàn**:
  - 🌟 VIP (bàn lớn, vị trí đặc biệt)
  - 👁️ Window View (view đẹp)
  - ❤️ Romantic Corner (góc lãng mạn)
  - 📍 Standard (bàn thường)
- **Tự động nhận số bàn** từ URL `?table=ID`
- Hiệu ứng hover và selection mượt mà

### 📱 Smart Menu
- **Lọc theo danh mục** với animation
- **Skeleton Loading** khi chuyển category
- **Card món ăn** với:
  - Badge (Best Seller, Chef's Choice)
  - Hover zoom image
  - Quick add to cart
- **Giỏ hàng sidebar** với:
  - Tăng/giảm số lượng
  - Tính tổng tự động
  - Hiển thị số bàn

### ✅ Kitchen Confirmation
- Animation success với progress bar
- Hiển thị mã đơn hàng
- Thời gian dự kiến
- Chi tiết đơn hàng
- Âm thanh xác nhận (có thể thêm)

## 🎨 Thiết Kế

### Màu Sắc
- **Background**: `#050505` (Pure Black)
- **Secondary**: `#0f0f0f`, `#1a1a1a` (Dark Grays)
- **Accent**: `#D4AF37` (Metallic Gold)
- **Text**: `#F5F5F7` (Cream White)

### Typography
- **Headings**: Playfair Display (Serif) - Sang trọng
- **Body**: Inter (Sans-serif) - Dễ đọc

### Hiệu Ứng
- Smooth scroll
- Fade-in animations
- Hover scale effects
- Skeleton loading
- Progress animations
- Glassmorphism

## 🚀 Cách Sử Dụng

### Truy cập trực tiếp
```
http://localhost:3000/restaurant-os
```

### Với QR Code (tự động nhận bàn)
```
http://localhost:3000/restaurant-os?table=12
```

## 📱 User Journey

1. **Hero** → Khách vào trang, thấy brand identity
2. **Service Choice** → Chọn "Tại nhà hàng" hoặc "Mang về"
3. **Floor Plan** → (Nếu tại chỗ) Chọn bàn trên sơ đồ
4. **Smart Menu** → Xem menu, thêm món vào giỏ
5. **Checkout** → Xác nhận đơn hàng
6. **Confirmation** → Nhận thông báo thành công

## 🔧 Kịch Bản Vận Hành

### Kịch Bản 1: QR tại bàn (Tối ưu)
1. Khách quét QR dán trên bàn
2. URL có sẵn `?table=12`
3. Vào thẳng menu, không cần chọn bàn
4. Gọi món và gửi đơn

### Kịch Bản 2: Chọn bàn thủ công (Hybrid)
1. Khách quét QR chung ở cổng
2. Chọn "Tại nhà hàng"
3. Xem sơ đồ và chọn bàn trống
4. Vào menu và gọi món

### Kịch Bản 3: Mang về
1. Khách chọn "Mang về"
2. Vào thẳng menu
3. Gọi món và nhận tại quầy

## 💡 Tips Founder

### Tối Ưu Trải Nghiệm
- Đặt QR ở vị trí dễ thấy trên bàn
- Có biển hướng dẫn "Quét QR để gọi món"
- Train nhân viên xử lý khi khách gặp vấn đề

### Marketing
- Đánh dấu bàn VIP/View đẹp để upsell
- Hiển thị badge "Best Seller" để tăng conversion
- Thêm urgency "Chỉ còn 3 bàn trống"

### Tech Stack
- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State**: React Hooks

## 🔮 Roadmap

- [ ] Tích hợp Socket.io cho real-time table status
- [ ] Firebase/Supabase cho database
- [ ] Admin Dashboard để quản lý đơn hàng
- [ ] Kitchen Display System
- [ ] Payment integration
- [ ] Push notifications
- [ ] Analytics tracking
- [ ] Multi-language support

## 📊 Performance

- ⚡ Fast loading với Next.js
- 📱 Mobile-first responsive
- 🎨 Smooth 60fps animations
- 🔄 Optimistic UI updates

## 🎯 Best Practices

- Clean code với TypeScript
- Component-based architecture
- Reusable components
- Proper state management
- Accessibility compliant
- SEO optimized

---

**Developed with ❤️ for LUMIÈRE Restaurant**
