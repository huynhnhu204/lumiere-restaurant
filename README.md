# 🍽️ LUMIÈRE - Hệ Thống Website Nhà Hàng Cao Cấp

Website nhà hàng hiện đại với giao diện sang trọng, tích hợp hệ thống QR Ordering và Admin Dashboard quản lý thời gian thực.

## ✨ Tính Năng Chính

### 🌟 Restaurant OS (SPA) - NEW!
- **Hero Section** với animation cinematic
- **Service Choice** - Chọn tại chỗ hoặc mang về
- **Floor Plan** - Sơ đồ bàn trực quan với trạng thái real-time
- **Smart Menu** với skeleton loading và filter mượt mà
- **Kitchen Confirmation** với progress animation
- **Tích hợp hoàn chỉnh** trong một Single Page App

### 🎨 Giao Diện Khách Hàng
- **Landing Page** sang trọng với Hero Section ấn tượng
- **Smart Menu** với bộ lọc danh mục và hiệu ứng mượt mà
- **Giỏ hàng** tích hợp với animation Framer Motion
- **Responsive Design** hoàn hảo trên mọi thiết bị
- **Smooth Scrolling** và các hiệu ứng chuyển động tinh tế

### 📱 QR Ordering System
- Khách hàng quét mã QR tại bàn
- **Tự động nhận diện số bàn** từ URL (không cần nhập)
- Chọn món ăn trực tiếp từ điện thoại
- Gửi đơn hàng thẳng vào hệ thống
- Giao diện Mobile-First tối ưu cho thao tác một tay
- Mỗi bàn có QR riêng: `/qr-order?table=12`

### 🎛️ Admin Dashboard
- **Tổng quan** với thống kê doanh thu và đơn hàng
- **Quản lý đơn hàng** thời gian thực từ QR
- **CRUD Menu** đầy đủ (Thêm, Sửa, Xóa món ăn)
- **Cập nhật trạng thái** món ăn (In Stock/Out of Stock)
- **Kitchen Display** để theo dõi đơn hàng

## 🚀 Cài Đặt

### Yêu Cầu
- Node.js 18+ 
- npm hoặc yarn

### Các Bước Cài Đặt

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Tạo QR codes cho các bàn (tùy chọn):**
```bash
npm run generate-qr
```
Script sẽ tạo QR codes cho 50 bàn và lưu vào `public/qr-codes/`

3. **Chạy development server:**
```bash
npm run dev
```

4. **Mở trình duyệt:**
- Trang chủ: http://localhost:3000
- **Restaurant OS (SPA)**: http://localhost:3000/restaurant-os
- QR Ordering: http://localhost:3000/qr-order?table=12
- Admin Dashboard: http://localhost:3000/admin
- QR Preview: http://localhost:3000/qr-preview.html (sau khi chạy generate-qr)

## 📁 Cấu Trúc Dự Án

```
lumiere-restaurant/
├── app/
│   ├── page.tsx              # Landing Page + Menu chính
│   ├── restaurant-os/        # 🌟 Restaurant OS (SPA)
│   │   ├── page.tsx          # Main orchestrator
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServiceChoice.tsx
│   │   │   ├── FloorPlan.tsx
│   │   │   ├── SmartMenu.tsx
│   │   │   ├── MiniCart.tsx
│   │   │   └── KitchenConfirmation.tsx
│   │   └── README.md
│   ├── qr-order/
│   │   └── page.tsx          # Giao diện QR Ordering (tự động nhận số bàn)
│   ├── admin/
│   │   └── page.tsx          # Admin Dashboard
│   ├── layout.tsx            # Layout chính
│   └── globals.css           # Global styles
├── scripts/
│   └── generate-qr-codes.js  # Script tạo QR codes tự động
├── docs/
│   └── QR-SETUP-GUIDE.md     # Hướng dẫn thiết lập QR
├── public/
│   ├── qr-codes/             # QR codes cho các bàn (sau khi generate)
│   └── qr-preview.html       # Preview tất cả QR codes
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🎨 Thiết Kế

### Bảng Màu
- **Charcoal Black**: `#0A0A0A` - Nền chính
- **Metallic Gold**: `#D4AF37` - Điểm nhấn
- **Cream White**: `#F5F5F7` - Text chính

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

### Hiệu Ứng
- Glassmorphism cho Header
- Smooth transitions với Framer Motion
- Hover effects cho menu items
- Bottom Sheet cho giỏ hàng mobile

## 🔧 Công Nghệ Sử Dụng

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Playfair Display)

## 📱 Responsive Design

Website được tối ưu cho:
- 📱 Mobile (320px - 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (1024px+)

## 🎯 Hướng Dẫn Sử Dụng

### Cho Khách Hàng
1. Quét mã QR tại bàn (mỗi bàn có QR riêng)
2. Hệ thống tự động nhận diện số bàn
3. Chọn món ăn và thêm vào giỏ
4. Xem lại đơn hàng và xác nhận
5. Đơn hàng được gửi thẳng đến bếp

### Thiết Lập QR Code
1. Chạy script tạo QR: `npm run generate-qr`
2. Mở preview: http://localhost:3000/qr-preview.html
3. In hoặc tải xuống QR cho từng bàn
4. Gắn QR lên bàn tương ứng
5. Test bằng cách quét QR trên điện thoại

📖 **Chi tiết**: Xem [docs/QR-SETUP-GUIDE.md](docs/QR-SETUP-GUIDE.md)

### Cho Admin
1. Truy cập `/admin`
2. Xem tổng quan doanh thu và đơn hàng
3. Quản lý đơn hàng từ QR (Pending → Cooking → Completed)
4. Thêm/Sửa/Xóa món ăn trong menu
5. Cập nhật trạng thái món ăn

## 🔮 Tính Năng Mở Rộng (Roadmap)

- [ ] Tích hợp Firebase/Supabase cho database thực
- [ ] Socket.io cho real-time updates
- [ ] Payment gateway (VNPay, Momo)
- [ ] Email/SMS notification
- [ ] Đặt bàn online với calendar
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Analytics dashboard (track QR scans, popular items)
- [ ] Customer loyalty program
- [ ] Print receipt/invoice
- [ ] Kitchen Display System với âm thanh thông báo

## 💡 Tips Vận Hành

### Bảo Mật QR Code
- Mỗi QR chỉ chứa số bàn, không có thông tin nhạy cảm
- Khách không thể tự ý thay đổi số bàn
- Admin có thể track đơn hàng theo bàn

### Xử Lý Sự Cố
- Nếu QR bị hỏng: In QR dự phòng
- Nếu khách không có điện thoại: Nhân viên có thể gọi món thủ công qua Admin
- Nếu mất kết nối: Đơn hàng được lưu local, tự động sync khi có mạng

### Tối Ưu Trải Nghiệm
- Đặt QR ở vị trí dễ thấy (góc bàn, giữa bàn)
- Hướng dẫn khách quét QR ngay khi ngồi xuống
- Có biển chỉ dẫn "Quét QR để gọi món"

## 📝 Ghi Chú

- Hiện tại sử dụng **Mock Data** (LocalStorage)
- Để production, cần tích hợp database thực (Firebase/PostgreSQL)
- Cần thêm authentication cho Admin Dashboard
- Có thể tích hợp với POS system hiện có

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Hãy tạo Pull Request hoặc Issue.

## 📄 License

MIT License - Tự do sử dụng cho dự án cá nhân và thương mại.

---

**Phát triển bởi**: Full-stack Developer
**Năm**: 2026
**Phong cách**: Modern Luxury Minimalist
