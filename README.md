# 🌿 ExoCafé — Cà Phê Đặc Sản Nghệ Thuật & Phong Vị Nhiệt Đới

> Trải nghiệm không gian cà phê đặc sản nguyên chất từ vùng đất cao nguyên Lâm Viên, hòa quyện cùng văn hóa nhiệt đới mộc mạc, thức uống trái cây thanh mát, bánh ngọt thủ công và kem gelato tươi thượng hạng.

---

## 🌟 Giới Thiệu Dự Án

**ExoCafé** là website thương hiệu (Brand Experience & Showcase Platform) được xây dựng theo phong cách thiết kế đương đại mang đậm dấu ấn nhiệt đới (*Tropicana Flavors*). Trang web tập trung vào trải nghiệm thị giác cao cấp, hiệu ứng chuyển động mượt mà và các tính năng tương tác độc đáo nhằm truyền tải trọn vẹn câu chuyện thương hiệu và danh mục sản phẩm đến khách hàng.

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

- **Frontend Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (Tối ưu tốc độ tải và Hot Module Replacement).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) với hệ thống Design Tokens thương hiệu (`brand-title`, `brand-accent`, `brand-bg`).
- **Typography:** Google Fonts (`Montserrat`, `Josefin Sans`, và font viết tay nghệ thuật `Oooh Baby`).
- **Animations & Effects:** [GSAP (GreenSock)](https://greensock.com/) + `@gsap/react` + `ScrollTrigger` cho các hiệu ứng cuộn trang điện ảnh.
- **Routing:** [React Router DOM v7](https://reactrouter.com/) (Single Page Application architecture).
- **Icons:** [Lucide React](https://lucide.dev/).
- **Hosting & CI/CD:** Sẵn sàng triển khai tự động trên [Netlify](https://www.netlify.com/).

---

## ✨ Các Tính Năng & Trang Nổi Bật

### 1. 🏠 Trang Chủ (Home Page)
- **Space Banner:** Mở đầu ấn tượng giới thiệu không gian ốc đảo nhiệt đới bình yên giữa lòng phố thị.
- **Tropical All Day & Sweet Section:** Khám phá hương vị cà phê mộc và bánh ngọt tươi mỗi ngày.
- **Vòng Xoay Thực Đơn C-Arc (Elliptical Menu):**
  - Trục xoay tròn 3D toán học SVG mượt mà kết hợp hiệu ứng GSAP ScrollTrigger.
  - Phân loại 5 nhóm danh mục với **40 món ăn thực tế 100% hình ảnh chất lượng cao**:
    1. 🍨 **Kem Gelato:** 8 vị kem thủ công nhiệt đới (Pineapple Coconut, Mango Passion Fruit, Mango Cốm, Tropical Oolong,...).
    2. 🍹 **Trà Trái Cây Nhiệt Đới:** 8 món trà thảo mộc hoa quả tươi mát.
    3. ☕ **Cà Phê Việt Nam:** 8 biến tấu cà phê rang mộc thượng hạng (Cà phê sữa, tiramisu, trứng, bạc xỉu,...).
    4. 🍰 **Bánh Ngọt (Bánh Lạnh):** 8 dòng bánh mousse, cheesecake và panna cotta cao cấp.
    5. 🥧 **Bánh Nướng & Dessert:** 8 món bánh nướng thơm lừng chuẩn vị.
- **Space Gallery:** Bộ sưu tập không gian kiến trúc nhiệt đới và góc ngồi thư giãn tại ExoCafé.

### 2. 📖 Nguồn Cảm Hứng (Inspiration Page)
- Câu chuyện khởi nguồn từ cao nguyên Lâm Viên.
- 3 trụ cột giá trị cốt lõi: *Hạt mộc nguyên bản*, *Nghệ thuật rang xay*, *Trải nghiệm kết nối*.
- Trình diễn hình ảnh tương tác cùng modal Photo Lightbox.

### 3. 🛍️ Cửa Hàng & Quà Tặng (Store Page)
- **Store Hero 3D:** Hiệu ứng xòe quạt 3D (*Fanned Spread Cards*) tương tác sống động khi cuộn chuột.
- **Hệ Thống Tab Lọc:** Chuyển đổi giữa **Sản Phẩm Đóng Gói** (Hạt cà phê, phin cà phê thủ công, bánh quy) và **Thẻ Quà Tặng**.
- **Thẻ Quà Tặng Nhiệt Đới (Gift Cards):**
  - 4 mệnh giá: `200.000đ`, `500.000đ`, `700.000đ`, `1.000.000đ`.
  - Hiệu ứng đổi thẻ mượt mà, hỗ trợ nút mũi tên điều hướng sát mép thẻ và CTA liên hệ đặt thẻ.

### 4. 💳 Thẻ Thành Viên (ExoCafé Membership)
- Trang chuyên biệt tại route `/membership` (hỗ trợ alias `/thanh-vien`).
- **Trình Diễn Thẻ 3D Lật 2 Mặt:** 
  - 3 mẫu thiết kế thẻ cao cấp (Mẫu 01, Mẫu 02, Mẫu 03).
  - Tương tác click trực tiếp hoặc nút điều khiển để xoay 3D (`rotateY(180deg)`) lật mặt trước và mặt sau thẻ.
- **Form Đăng Ký Phát Hành Thẻ Vật Lý:** Điền thông tin nhận thẻ 0đ tại cửa hàng hoặc giao tận nơi miễn phí, kèm thông báo xác nhận thành công.
- **Welcome Modal Popup:** Cửa sổ chào mừng nhỏ gọn, sang trọng giới thiệu thẻ thành viên khi vừa truy cập website.

### 5. 🧭 Header & Điều Hướng
- Header cố định thông minh: Tự động đổi màu nền khi cuộn trang hoặc chuyển giữa các trang sáng/tối.
- Nút **MENU** mở Modal điều hướng toàn trang dạng góc nở (*Blossoming Menu Modal*) với hiệu ứng pop-up tinh tế.
- Favicon thương hiệu đồng bộ từ logo gốc ExoCafé.

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Setup)

### Yêu cầu môi trường:
- [Node.js](https://nodejs.org/) (phiên bản 18+ trở lên).
- Trình quản lý gói `npm` (hoặc `yarn` / `pnpm`).

### Các bước thực hiện:

1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/longledev1/exocafe.git
   cd exocafe
   ```

2. **Cài đặt các thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Khởi chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại địa chỉ: `http://localhost:5173/`

4. **Kiểm tra bản build đóng gói:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🚀 Hướng Dẫn Deploy Lên Netlify

Dự án đã được cấu hình sẵn cho việc triển khai trên Netlify:

1. File **`netlify.toml`** và **`public/_redirects`** đã cấu hình quy tắc Rewrite `/* -> /index.html (200)` để hỗ trợ hoàn hảo cơ chế định tuyến Single Page Application (SPA).
2. Khi kết nối repository với Netlify Dashboard:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
3. Netlify sẽ tự động nhận diện và triển khai trang web chỉ sau vài giây.

---

## 📂 Cấu Trúc Thư Mục Dự Án (Project Structure)

```
exocafe/
├── public/                     # Tài nguyên tĩnh (Ảnh logo, sản phẩm, thẻ, _redirects, favicon)
│   ├── images/
│   │   ├── logo/               # Logo thương hiệu ExoCafé
│   │   ├── menu_food/          # Ảnh thực tế 40 món (Kem, Trà, Cà phê, Bánh)
│   │   └── store/              # Ảnh sản phẩm đóng gói & thẻ thành viên
│   ├── gift-cards/             # Bộ ảnh thẻ quà tặng PNG trong suốt
│   └── _redirects              # Quy tắc điều hướng SPA trên Netlify
├── src/
│   ├── components/             # Các component giao diện
│   │   ├── home/               # Các section trang chủ
│   │   ├── inspiration/        # Các section trang nguồn cảm hứng
│   │   ├── store/              # Các section trang cửa hàng & thẻ quà tặng
│   │   ├── EllipticalMenu.jsx  # Vòng xoay C-Arc menu thực đơn 3D
│   │   ├── MemberWelcomeModal.jsx # Popup chào mừng thành viên
│   │   ├── Header.jsx          # Thanh điều hướng & Menu modal
│   │   └── Footer.jsx          # Chân trang phong cách nhiệt đới
│   ├── constants/              # Dữ liệu hằng số (Thực đơn món, Thẻ quà tặng, Thành viên)
│   │   ├── foodMenu.js         # Dữ liệu 40 món ăn thực tế
│   │   ├── giftCards.js        # Dữ liệu 4 mệnh giá thẻ quà tặng
│   │   ├── membershipCards.js  # 3 mẫu thiết kế thẻ thành viên
│   │   └── products.js         # Danh mục sản phẩm đóng gói
│   ├── pages/                  # Các trang định tuyến (Home, Inspiration, Store, Membership)
│   ├── layouts/                # Bố cục dùng chung (MainLayout)
│   ├── App.jsx                 # Cấu hình routes SPA
│   ├── main.jsx                # Điểm khởi động React
│   └── index.css               # Cấu hình Tailwind CSS v4 & custom keyframes
├── netlify.toml                # Cấu hình build & redirect cho Netlify
├── package.json
└── README.md
```

---

## 🌿 Bản Quyền & Giấy Phép

Dự án được xây dựng và phát triển bởi **ExoCafé Team**.  
Mọi hình ảnh, tư liệu và ý tưởng thiết kế thuộc quyền sở hữu của thương hiệu ExoCafé.
