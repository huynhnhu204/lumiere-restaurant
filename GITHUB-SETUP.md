# 📦 Hướng Dẫn Đẩy Code Lên GitHub

## Bước 1: Chuẩn Bị

Đảm bảo bạn đã:
- ✅ Cài Git: https://git-scm.com/download/win
- ✅ Có tài khoản GitHub: https://github.com/huynhnhu204
- ✅ Code đã chạy được local

## Bước 2: Tạo Repository Trên GitHub

1. Truy cập: https://github.com/new
2. Điền thông tin:
   - **Repository name**: `lumiere-restaurant`
   - **Description**: `🍽️ LUMIÈRE - Luxury Restaurant Management System with QR Ordering & Real-time Kitchen Display`
   - **Visibility**: Public (hoặc Private nếu muốn)
   - **KHÔNG** tick "Add a README file" (vì đã có sẵn)
3. Click "Create repository"

## Bước 3: Chạy Lệnh Git

Mở Terminal/Command Prompt trong thư mục project và chạy:

```bash
# 1. Khởi tạo Git repository
git init

# 2. Thêm tất cả files
git add .

# 3. Commit lần đầu
git commit -m "🎉 Initial commit: LUMIÈRE Restaurant OS with Real-time Features"

# 4. Đổi branch sang main (nếu cần)
git branch -M main

# 5. Thêm remote repository (THAY ĐỔI USERNAME NẾU KHÁC)
git remote add origin https://github.com/huynhnhu204/lumiere-restaurant.git

# 6. Push code lên GitHub
git push -u origin main
```

## Bước 4: Xác Nhận

Truy cập: https://github.com/huynhnhu204/lumiere-restaurant

Bạn sẽ thấy:
- ✅ Tất cả files đã được upload
- ✅ README.md hiển thị đẹp
- ✅ Có thể xem code online

## 🔐 Nếu Gặp Lỗi Authentication

### Cách 1: Sử dụng Personal Access Token

1. Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Chọn scopes: `repo` (full control)
4. Copy token (chỉ hiện 1 lần!)
5. Khi push, dùng token thay password:
   ```
   Username: huynhnhu204
   Password: ghp_xxxxxxxxxxxxx (token vừa copy)
   ```

### Cách 2: Sử dụng GitHub Desktop

1. Tải GitHub Desktop: https://desktop.github.com
2. Đăng nhập GitHub
3. File → Add Local Repository → Chọn thư mục project
4. Publish repository

## 📝 Các Lệnh Git Thường Dùng

```bash
# Xem trạng thái
git status

# Thêm file mới
git add .

# Commit thay đổi
git commit -m "Update: mô tả thay đổi"

# Push lên GitHub
git push

# Pull code mới nhất
git pull

# Xem lịch sử commit
git log --oneline

# Tạo branch mới
git checkout -b feature/ten-tinh-nang

# Merge branch
git checkout main
git merge feature/ten-tinh-nang
```

## 🌿 Git Workflow Đề Xuất

```bash
# 1. Tạo branch cho tính năng mới
git checkout -b feature/add-payment

# 2. Code và test

# 3. Commit
git add .
git commit -m "Add payment integration"

# 4. Push branch
git push origin feature/add-payment

# 5. Tạo Pull Request trên GitHub

# 6. Merge vào main sau khi review
```

## 🚫 Files Không Nên Commit

File `.gitignore` đã được cấu hình để bỏ qua:
- `node_modules/` - Dependencies (quá lớn)
- `.env.local` - API keys (bảo mật)
- `.next/` - Build output
- `*.log` - Log files

## 📊 Repository Structure

```
lumiere-restaurant/
├── app/                    # Next.js App Router
├── components/             # Shared components
├── lib/                    # Utilities (Supabase client)
├── public/                 # Static assets
├── scripts/                # Helper scripts
├── docs/                   # Documentation
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── README.md              # Project overview
├── DEPLOYMENT.md          # Deploy guide
└── GITHUB-SETUP.md        # This file
```

## 🎯 Next Steps

Sau khi push lên GitHub:
1. ✅ Deploy lên Vercel (xem `DEPLOYMENT.md`)
2. ✅ Setup Supabase (xem `docs/SUPABASE-SETUP.md`)
3. ✅ Generate QR codes
4. ✅ Share với team/khách hàng

## 💡 Tips

- Commit thường xuyên với message rõ ràng
- Sử dụng branches cho features mới
- Review code trước khi merge vào main
- Backup `.env.local` ở nơi an toàn (không commit!)

## 🆘 Cần Giúp Đỡ?

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

**Happy Coding! 🚀**
