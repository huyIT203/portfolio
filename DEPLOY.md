# 🚀 Hướng dẫn Deploy Portfolio

Portfolio này là một website tĩnh (HTML/CSS/JS), có thể deploy dễ dàng trên nhiều nền tảng miễn phí.

## 📋 Mục lục
- [GitHub Pages (Khuyên dùng)](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Cập nhật sau khi deploy](#cập-nhật-sau-khi-deploy)

---

## 🎯 GitHub Pages (Khuyên dùng)

### Ưu điểm:
- ✅ Miễn phí 100%
- ✅ Tự động deploy khi push code
- ✅ URL: `https://[username].github.io/[repo-name]`
- ✅ Hỗ trợ custom domain
- ✅ CDN toàn cầu, tốc độ nhanh
- ✅ Ổn định, không giới hạn bandwidth

### Cách setup:

#### Bước 1: Tạo GitHub Repository
1. Vào [GitHub.com](https://github.com) và đăng nhập
2. Click nút **"New"** hoặc **"+"** → **"New repository"**
3. Đặt tên repo: `portfolio` (hoặc tên bạn muốn)
4. Chọn **Public**
5. **KHÔNG** tích "Initialize with README" (vì bạn đã có code)
6. Click **"Create repository"**

#### Bước 2: Push code lên GitHub

**Nếu bạn chưa cài Git:**
- Download: https://git-scm.com/download/win
- Cài đặt và mở Git Bash

**Mở Terminal/PowerShell trong thư mục portfolio và chạy:**

```bash
# Khởi tạo git repository
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Thêm remote (thay [username] bằng GitHub username của bạn)
git remote add origin https://github.com/[username]/portfolio.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

#### Bước 3: Bật GitHub Pages

1. Vào repository trên GitHub
2. Click tab **"Settings"** (ở trên cùng)
3. Scroll xuống phần **"Pages"** (ở sidebar bên trái)
4. Ở **"Source"**, chọn **"Deploy from a branch"**
5. Chọn branch **"main"** và folder **"/ (root)"**
6. Click **"Save"**

#### Bước 4: Xem website

Sau vài phút, website sẽ có sẵn tại:
- URL: `https://[username].github.io/portfolio`

**Ví dụ:** Nếu username là `huyIT203`, URL sẽ là:
- `https://huyIT203.github.io/portfolio`

---

## 🌐 Netlify

### Ưu điểm:
- ✅ Miễn phí
- ✅ Deploy cực nhanh (drag & drop)
- ✅ Auto-deploy từ GitHub
- ✅ Hỗ trợ form handling
- ✅ Custom domain dễ dàng
- ✅ Preview deployments

### Cách setup:

#### Phương pháp 1: Drag & Drop (Nhanh nhất)

1. Vào [netlify.com](https://netlify.com) và đăng ký/đăng nhập
2. Kéo thả thư mục `portfolio` vào vùng **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**
3. Netlify sẽ tự động deploy và cung cấp URL

#### Phương pháp 2: Kết nối GitHub (Tự động update)

1. Vào [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Chọn **"Deploy with GitHub"**
4. Chọn repository `portfolio`
5. Settings:
   - **Build command:** (để trống - vì là static site)
   - **Publish directory:** `/` (root)
6. Click **"Deploy site"**

URL sẽ là: `https://[random-name].netlify.app`

---

## ⚡ Vercel

### Ưu điểm:
- ✅ Miễn phí
- ✅ Tốc độ cực nhanh (Edge Network)
- ✅ Auto-deploy từ GitHub
- ✅ Preview deployments cho mỗi PR
- ✅ Tốt cho frontend

### Cách setup:

1. Vào [vercel.com](https://vercel.com) và đăng nhập bằng GitHub
2. Click **"Add New Project"**
3. Import repository `portfolio`
4. Settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
5. Click **"Deploy"**

URL sẽ là: `https://portfolio-[hash].vercel.app`

---

## 🔄 Cập nhật sau khi deploy

### GitHub Pages:

**Cách 1: Qua GitHub Desktop (Dễ nhất)**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Clone repository về máy
3. Sửa code
4. Commit & Push
5. GitHub Pages tự động deploy trong vài phút

**Cách 2: Qua Command Line**
```bash
# Vào thư mục portfolio
cd portfolio

# Sửa code...

# Commit và push
git add .
git commit -m "Update: [mô tả thay đổi]"
git push
```

### Netlify & Vercel:

Nếu đã kết nối GitHub:
- **Tự động deploy** mỗi khi push code
- Không cần làm gì thêm!

---

## 📝 Ghi chú quan trọng

### 1. Custom Domain (Tùy chọn)

Sau khi deploy, bạn có thể dùng domain riêng:

**GitHub Pages:**
- Settings → Pages → Custom domain
- Nhập domain của bạn (ví dụ: `phamquanghuy.dev`)
- Cấu hình DNS theo hướng dẫn

**Netlify/Vercel:**
- Domain settings → Add custom domain
- Cấu hình DNS tự động

### 2. HTTPS

Tất cả các nền tảng đều tự động cung cấp HTTPS miễn phí.

### 3. File .gitignore (Nếu cần)

Nếu không muốn push một số file (như node_modules, .env), tạo file `.gitignore`:

```
# .gitignore
node_modules/
.env
.DS_Store
```

---

## 🎯 Khuyến nghị

**Cho người mới:** GitHub Pages - Đơn giản, ổn định, miễn phí

**Cho người muốn thêm tính năng:** Netlify - Hỗ trợ forms, serverless functions

**Cho performance tối đa:** Vercel - Tốc độ nhanh nhất

---

## ❓ Cần giúp đỡ?

Nếu gặp vấn đề khi deploy, hãy kiểm tra:
1. Tất cả files có được push lên GitHub không?
2. `index.html` có ở root directory không?
3. Đường dẫn assets (images, CSS, JS) có đúng không?

**Lưu ý:** Portfolio này sử dụng đường dẫn tương đối (`./style.css`, `./image/...`), nên sẽ hoạt động tốt trên tất cả các nền tảng.

