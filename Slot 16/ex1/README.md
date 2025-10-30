# Movie Management System - Slot 16 Ex1

Hệ thống quản lý phim với tính năng đăng nhập và bộ lọc nâng cao.

## 🚀 Tính năng

### 🔐 Hệ thống đăng nhập
- Đăng nhập với tài khoản từ file `db.json`
- 3 loại quyền hạn: Admin, Manager, User
- Lưu trạng thái đăng nhập trong localStorage

### 🎬 Quản lý phim
- **Xem danh sách**: Tất cả user
- **Thêm/Sửa phim**: Admin và Manager
- **Xóa phim**: Chỉ Admin
- Validation form đầy đủ

### 🔍 Bộ lọc nâng cao
- **Tìm kiếm**: Theo tên phim
- **Lọc thể loại**: Dropdown các thể loại
- **Lọc thời lượng**: Ngắn/Trung bình/Dài
- **Sắp xếp**: Tên A→Z, Z→A, Năm, Thời lượng
- Hiển thị số kết quả và bộ lọc hiện tại

## 🏃‍♂️ Cách chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy JSON Server (Terminal 1)
```bash
npx json-server db.json --port 3001
```

### 3. Chạy React App (Terminal 2)
```bash
npm start
```

### 4. Mở trình duyệt
Truy cập: http://localhost:3000

## 👤 Tài khoản demo

| Username | Password | Role | Mô tả |
|----------|----------|------|-------|
| admin | 123456 | admin | Toàn quyền (CRUD) |
| user1 | password123 | user | Chỉ xem |
| manager | manager123 | manager | Thêm/Sửa phim |

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── Header.js          # Thanh điều hướng + user info
│   ├── Login.js           # Trang đăng nhập
│   ├── FilterBar.js       # Bộ lọc và tìm kiếm
│   ├── MovieForm.js       # Form thêm/sửa phim
│   ├── MovieTable.js      # Bảng hiển thị phim
│   └── MovieManager.js    # Component chính quản lý
├── contexts/
│   ├── AuthContext.js     # Context đăng nhập
│   └── MovieContext.js    # Context quản lý phim + filter
├── services/
│   └── api.js            # API calls với Axios
├── App.js                # Router và layout chính
└── db.json               # Database JSON
```

## 🛠️ Công nghệ sử dụng

- **React 19** với Hooks
- **React Router DOM v6** cho routing
- **React Bootstrap** cho UI
- **Axios** cho HTTP requests
- **json-server** cho REST API
- **Context API + useReducer** cho state management

## 📊 API Endpoints

### Movies
- `GET /movies` - Lấy danh sách phim
- `POST /movies` - Thêm phim mới
- `PUT /movies/:id` - Cập nhật phim
- `DELETE /movies/:id` - Xóa phim

### Genres
- `GET /genres` - Lấy danh sách thể loại

### Accounts
- `GET /accounts` - Lấy danh sách tài khoản (cho login)

## ✨ Highlights

### 🎯 Bộ lọc thông minh
- Tự động cập nhật kết quả khi thay đổi bộ lọc
- Hiển thị số lượng kết quả
- Có thể xóa từng bộ lọc riêng lệ
- Badge hiển thị trạng thái bộ lọc

### 🔒 Phân quyền rõ ràng
- UI thay đổi theo quyền hạn
- Ẩn/hiện nút theo role
- Thông báo quyền hạn cho user

### 📱 Responsive Design
- Giao diện tương thích mobile
- Table responsive với Bootstrap
- Modal form đẹp mắt

### 🚀 Performance
- Context API tối ưu với useReducer
- Lazy loading và error handling
- Loading states cho UX tốt

## 🐛 Troubleshooting

### Lỗi CORS
Đảm bảo json-server chạy trên port 3001:
```bash
npx json-server db.json --port 3001
```

### Không load được data
Kiểm tra file `db.json` có đúng format và json-server đã chạy chưa.

### Lỗi routing
Đảm bảo React Router DOM đã được cài đặt đúng version.

---

## 🎓 Mục đích học tập

Project này demo các concept:
- React Context API + useReducer
- React Router DOM v6
- Form validation
- HTTP requests với Axios
- State management phức tạp
- Authentication flow
- Role-based access control
- Advanced filtering và search
