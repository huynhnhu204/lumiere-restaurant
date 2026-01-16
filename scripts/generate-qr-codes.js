/**
 * Script tự động tạo QR Code cho tất cả các bàn
 * Chạy: node scripts/generate-qr-codes.js
 */

const QRCode = require('qrcode')
const fs = require('fs')
const path = require('path')

// Cấu hình
const CONFIG = {
  baseUrl: 'http://localhost:3000/qr-order', // Thay bằng domain thực của bạn
  totalTables: 50, // Tổng số bàn trong nhà hàng
  outputDir: path.join(__dirname, '../public/qr-codes'),
  qrOptions: {
    width: 400,
    margin: 2,
    color: {
      dark: '#0A0A0A',  // Màu đen
      light: '#FFFFFF'  // Màu trắng
    }
  }
}

// Tạo thư mục output nếu chưa có
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true })
  console.log('✅ Đã tạo thư mục:', CONFIG.outputDir)
}

// Hàm tạo QR code cho một bàn
async function generateQRForTable(tableNumber) {
  const paddedNumber = String(tableNumber).padStart(2, '0')
  const url = `${CONFIG.baseUrl}?table=${paddedNumber}`
  const filename = `table-${paddedNumber}.png`
  const filepath = path.join(CONFIG.outputDir, filename)

  try {
    await QRCode.toFile(filepath, url, CONFIG.qrOptions)
    console.log(`✅ Bàn ${paddedNumber}: ${filename}`)
    return { success: true, table: paddedNumber, url, filepath }
  } catch (error) {
    console.error(`❌ Lỗi tạo QR cho bàn ${paddedNumber}:`, error.message)
    return { success: false, table: paddedNumber, error: error.message }
  }
}

// Hàm tạo HTML preview
function generateHTMLPreview(results) {
  const successResults = results.filter(r => r.success)
  
  const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LUMIÈRE - QR Codes Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Arial', sans-serif;
      background: #0A0A0A;
      color: #F5F5F7;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 {
      font-family: 'Georgia', serif;
      color: #D4AF37;
      font-size: 48px;
      margin-bottom: 10px;
    }
    .header p {
      color: #888;
      font-size: 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 30px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .qr-card {
      background: #111;
      border: 1px solid #333;
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      transition: transform 0.2s, border-color 0.2s;
    }
    .qr-card:hover {
      transform: translateY(-5px);
      border-color: #D4AF37;
    }
    .qr-card img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .table-number {
      font-size: 24px;
      font-weight: bold;
      color: #D4AF37;
      margin-bottom: 8px;
    }
    .table-url {
      font-size: 11px;
      color: #666;
      word-break: break-all;
      font-family: monospace;
    }
    .download-btn {
      margin-top: 12px;
      padding: 8px 16px;
      background: #D4AF37;
      color: #000;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      font-size: 12px;
      text-decoration: none;
      display: inline-block;
    }
    .download-btn:hover {
      background: #FFF;
    }
    .stats {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      background: #111;
      border-radius: 12px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .stats h3 {
      color: #D4AF37;
      margin-bottom: 10px;
    }
    @media print {
      .qr-card {
        page-break-inside: avoid;
        border: 2px solid #000;
      }
      body { background: white; color: black; }
      .header h1 { color: #000; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>LUMIÈRE</h1>
    <p>QR Codes cho ${successResults.length} bàn</p>
  </div>
  
  <div class="grid">
    ${successResults.map(result => `
      <div class="qr-card">
        <img src="qr-codes/${path.basename(result.filepath)}" alt="QR Bàn ${result.table}">
        <div class="table-number">BÀN ${result.table}</div>
        <div class="table-url">${result.url}</div>
        <a href="qr-codes/${path.basename(result.filepath)}" download class="download-btn">
          Tải xuống
        </a>
      </div>
    `).join('')}
  </div>
  
  <div class="stats">
    <h3>Thống kê</h3>
    <p>✅ Đã tạo thành công: ${successResults.length} QR codes</p>
    <p>📁 Lưu tại: /public/qr-codes/</p>
    <p>🖨️ Nhấn Ctrl+P để in tất cả</p>
  </div>
</body>
</html>
  `
  
  const htmlPath = path.join(__dirname, '../public/qr-preview.html')
  fs.writeFileSync(htmlPath, html)
  console.log('\n📄 Đã tạo file preview:', htmlPath)
  console.log('🌐 Mở trình duyệt: http://localhost:3000/qr-preview.html')
}

// Main function
async function main() {
  console.log('🚀 Bắt đầu tạo QR codes...\n')
  console.log(`📊 Cấu hình:`)
  console.log(`   - Base URL: ${CONFIG.baseUrl}`)
  console.log(`   - Số bàn: ${CONFIG.totalTables}`)
  console.log(`   - Thư mục: ${CONFIG.outputDir}\n`)

  const results = []

  // Tạo QR cho từng bàn
  for (let i = 1; i <= CONFIG.totalTables; i++) {
    const result = await generateQRForTable(i)
    results.push(result)
  }

  // Tạo HTML preview
  generateHTMLPreview(results)

  // Thống kê
  const successCount = results.filter(r => r.success).length
  const failCount = results.filter(r => !r.success).length

  console.log('\n' + '='.repeat(50))
  console.log('✨ HOÀN THÀNH!')
  console.log('='.repeat(50))
  console.log(`✅ Thành công: ${successCount}/${CONFIG.totalTables}`)
  if (failCount > 0) {
    console.log(`❌ Thất bại: ${failCount}`)
  }
  console.log('\n📝 Các bước tiếp theo:')
  console.log('   1. Mở http://localhost:3000/qr-preview.html để xem preview')
  console.log('   2. In hoặc tải xuống từng QR code')
  console.log('   3. Gắn QR lên bàn tương ứng')
  console.log('   4. Test bằng cách quét QR trên điện thoại')
}

// Chạy script
main().catch(console.error)
