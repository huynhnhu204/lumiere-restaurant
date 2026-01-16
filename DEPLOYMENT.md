# 🚀 Hướng Dẫn Deploy LUMIÈRE Restaurant

## 📋 Checklist Trước Khi Deploy

- [ ] Đã test local: `npm run dev`
- [ ] Đã setup Supabase (xem `docs/SUPABASE-SETUP.md`)
- [ ] Đã có `.env.local` với Supabase keys
- [ ] Code đã commit lên GitHub

## 🌐 Deploy lên Vercel (Miễn phí)

### Bước 1: Tạo Repository GitHub

```bash
# Khởi tạo git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit: LUMIÈRE Restaurant OS"

# Thêm remote repository
git remote add origin https://github.com/huynhnhu204/lumiere-restaurant.git

# Push lên GitHub
git push -u origin main
```

### Bước 2: Deploy lên Vercel

1. Truy cập https://vercel.com
2. Đăng nhập bằng GitHub
3. Click "New Project"
4. Import repository: `huynhnhu204/lumiere-restaurant`
5. Configure Project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. **Environment Variables** (Quan trọng!):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

7. Click "Deploy"

### Bước 3: Đợi Deploy (2-3 phút)

Vercel sẽ:
- Install dependencies
- Build project
- Deploy lên CDN toàn cầu

### Bước 4: Nhận Domain

Sau khi deploy xong, bạn sẽ có:
- **Production URL**: `https://lumiere-restaurant.vercel.app`
- **Preview URLs**: Mỗi lần push code mới

## 🔧 Cập Nhật Code

```bash
# Sau khi sửa code
git add .
git commit -m "Update: mô tả thay đổi"
git push

# Vercel tự động deploy lại!
```

## 📱 Tạo QR Codes Cho Production

1. Sau khi deploy, update URL trong `scripts/generate-qr-codes.js`:

```javascript
const CONFIG = {
  baseUrl: 'https://lumiere-restaurant.vercel.app/restaurant-os',
  // ...
}
```

2. Generate QR codes:
```bash
npm run generate-qr
```

3. In QR codes từ `public/qr-preview.html`

## 🎯 Custom Domain (Optional)

1. Mua domain (VD: lumiere.vn)
2. Vào Vercel → Settings → Domains
3. Add domain và follow hướng dẫn DNS

## 🔒 Bảo Mật Admin

Để protect `/admin` route:

1. Tạo middleware `middleware.ts`:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization')
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')
      
      if (user === 'admin' && pwd === 'your-password') {
        return NextResponse.next()
      }
    }
    
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }
}
```

## 📊 Analytics (Optional)

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Thêm vào `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🐛 Troubleshooting

### Build Failed
- Check `npm run build` locally
- Xem logs trong Vercel dashboard

### Environment Variables không hoạt động
- Đảm bảo có prefix `NEXT_PUBLIC_`
- Redeploy sau khi thêm env vars

### Supabase Connection Error
- Check Supabase URL và Key
- Verify RLS policies trong Supabase

## 📈 Performance Tips

1. **Image Optimization**: Next.js tự động optimize images
2. **Caching**: Vercel CDN cache static assets
3. **Edge Functions**: Deploy gần user nhất

## 💰 Chi Phí

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Đủ cho ~10,000 visitors/month

### Supabase Free Tier
- ✅ 500MB database
- ✅ 2GB bandwidth/month
- ✅ 50,000 monthly active users
- ✅ Đủ cho ~1,000 orders/month

## 🎉 Hoàn Thành!

Website của bạn giờ đã live tại:
```
https://lumiere-restaurant.vercel.app
```

Share link này với khách hàng hoặc in QR codes để đặt tại bàn!

---

**Need Help?** 
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
