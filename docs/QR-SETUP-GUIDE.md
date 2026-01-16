# 📱 Hướng Dẫn Thiết Lập QR Code Cho Từng Bàn

## 🎯 Cách Hoạt Động

Mỗi bàn trong nhà hàng sẽ có một mã QR riêng biệt với URL động:

```
https://your-domain.com/qr-order?table=12
```

Khi khách quét mã QR:
1. ✅ Tự động nhận diện số bàn (không cần nhập)
2. ✅ Hiển thị số bàn trên header
3. ✅ Gửi đơn hàng kèm thông tin bàn
4. ✅ Tránh gian lận và nhầm lẫn

## 🛠️ Cách Tạo QR Code

### Phương Án 1: Sử dụng Tool Online (Nhanh)

1. **Truy cập**: https://www.qr-code-generator.com/
2. **Chọn**: URL
3. **Nhập link**: `https://your-domain.com/qr-order?table=1`
4. **Tùy chỉnh**:
   - Màu: Đen (#0A0A0A) hoặc Vàng Gold (#D4AF37)
   - Logo: Upload logo LUMIÈRE vào giữa
   - Kích thước: 300x300px (in ấn) hoặc 150x150px (digital)
5. **Download**: Format PNG hoặc SVG (vector)
6. **Lặp lại** cho từng bàn (thay số table)

### Phương Án 2: Sử dụng Script Tự Động (Chuyên Nghiệp)

Cài đặt package:
```bash
npm install qrcode
```

Chạy script tạo hàng loạt:
```bash
node scripts/generate-qr-codes.js
```

Script sẽ tự động tạo QR cho 50 bàn và lưu vào folder `public/qr-codes/`

### Phương Án 3: API Dynamic QR (Scalable)

Sử dụng API như:
- **QR Code Monkey API**: https://www.qrcode-monkey.com/qr-code-api-with-logo/
- **GoQR.me API**: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=YOUR_URL`

Ví dụ:
```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://lumiere.com/qr-order?table=12
```

## 🎨 Thiết Kế QR Code Sang Trọng

### Option 1: QR trên Standee Gỗ
- In QR lên mica trong suốt
- Gắn lên khung gỗ mộc hoặc đen mờ
- Thêm text: "Quét để gọi món - Bàn số 12"

### Option 2: QR khắc Laser
- Khắc trực tiếp lên bàn gỗ/kim loại
- Phủ lớp bảo vệ chống trầy
- Sang trọng và bền vững

### Option 3: QR trên Menu Card
- In trên thẻ card cao cấp
- Phủ laminate chống nước
- Đặt trong khung mica đứng

## 📋 Checklist Triển Khai

- [ ] Xác định số lượng bàn cần QR
- [ ] Tạo QR code cho từng bàn
- [ ] Test QR trên nhiều thiết bị (iOS, Android)
- [ ] In ấn hoặc khắc QR
- [ ] Gắn QR tại vị trí dễ thấy trên bàn
- [ ] Hướng dẫn nhân viên cách xử lý khi QR lỗi
- [ ] Chuẩn bị QR dự phòng (in sẵn)

## 🔧 Troubleshooting

### Khách quét QR nhưng không vào được trang?
- Kiểm tra URL có đúng không
- Đảm bảo website đã deploy và accessible
- Test trên nhiều trình duyệt

### QR bị mờ hoặc khó quét?
- Tăng kích thước QR (tối thiểu 3x3cm)
- Đảm bảo độ tương phản cao (đen trên trắng)
- Tránh đặt QR ở nơi có ánh sáng phản chiếu

### Khách vào nhầm bàn?
- Với hệ thống QR động, điều này không thể xảy ra
- Mỗi QR chỉ trỏ đến 1 số bàn cố định

## 💡 Tips Tối Ưu

1. **Thêm logo**: Đặt logo LUMIÈRE ở giữa QR (không quá 30% diện tích)
2. **Màu sắc**: Giữ QR đen trên nền trắng để dễ quét nhất
3. **Kích thước**: Tối thiểu 3x3cm cho in ấn
4. **Vị trí**: Đặt QR ở góc bàn, dễ thấy nhưng không cản trở
5. **Backup**: Có QR dự phòng cho từng bàn (in 2 bản)

## 📊 Ví Dụ URL Cho 10 Bàn Đầu

```
Bàn 01: https://lumiere.com/qr-order?table=01
Bàn 02: https://lumiere.com/qr-order?table=02
Bàn 03: https://lumiere.com/qr-order?table=03
Bàn 04: https://lumiere.com/qr-order?table=04
Bàn 05: https://lumiere.com/qr-order?table=05
Bàn 06: https://lumiere.com/qr-order?table=06
Bàn 07: https://lumiere.com/qr-order?table=07
Bàn 08: https://lumiere.com/qr-order?table=08
Bàn 09: https://lumiere.com/qr-order?table=09
Bàn 10: https://lumiere.com/qr-order?table=10
```

## 🚀 Next Steps

Sau khi setup QR xong:
1. Tích hợp Firebase/Supabase cho real-time orders
2. Thêm notification sound cho bếp
3. Setup analytics để track số lượt quét QR
4. A/B test vị trí đặt QR để tối ưu conversion
