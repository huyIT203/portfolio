Outfit Planner
Ứng dụng quản lý và lập kế hoạch trang phục (outfit) với các tính năng thông minh sử dụng Machine Learning.

📋 Tổng quan
Outfit Planner là một ứng dụng full-stack giúp người dùng quản lý tủ quần áo, tạo và lưu trữ các bộ trang phục, lập kế hoạch mặc đồ theo lịch, và nhận gợi ý phối đồ thông minh dựa trên sở thích và đặc điểm cá nhân.

🏗️ Kiến trúc hệ thống
Dự án được xây dựng với kiến trúc microservices gồm 3 thành phần chính:

Backend API (Node.js/Express): Xử lý logic nghiệp vụ, quản lý dữ liệu
Mobile App (Flutter): Ứng dụng di động đa nền tảng (iOS, Android)
ML Service (Python/FastAPI): Xử lý ảnh và Machine Learning
🚀 Tính năng chính
Quản lý Items (Quần áo)
Thêm, sửa, xóa items trong tủ quần áo
Phân loại theo category, subcategory, type (TOP, BOTTOM, SHOES, etc.)
Lưu thông tin chi tiết: màu sắc, chất liệu, pattern, fit, brand, giá
Upload và xử lý ảnh với tính năng xóa nền tự động
Tìm kiếm và lọc items theo nhiều tiêu chí
Quản lý Outfits (Bộ trang phục)
Tạo và lưu các bộ trang phục từ items trong tủ
Gắn tags: style, occasion, season, rating
Upload ảnh preview outfit
Chia sẻ outfits công khai hoặc riêng tư
Xem feed outfits từ người dùng khác
Calendar & OOTD
Lập kế hoạch mặc đồ theo lịch
Lưu lại lịch sử OOTD (Outfit Of The Day)
Xem lại các bộ đã mặc theo ngày
Đánh giá và ghi chú cho từng ngày
Gợi ý thông minh
Hệ thống recommendation dựa trên:
Sở thích style của người dùng
Đặc điểm cơ thể (body shape, color tone)
Hoàn cảnh sử dụng (occasion, season)
Lịch sử mặc đồ
Xác thực người dùng
Đăng ký/đăng nhập với email và password
Đăng nhập bằng Google OAuth
Đăng nhập bằng Facebook
Quên mật khẩu với email verification
JWT token authentication
Onboarding
Thu thập thông tin người dùng ban đầu:
Thông tin cá nhân (tên, ngày sinh, giới tính)
Địa chỉ (thành phố, quốc gia)
Hoạt động chính
Đặc điểm ngoại hình (color tone, hair color, eye color, body shape)
Thông tin cơ thể (cân nặng, chiều cao, size)
Sở thích style
Ngân sách thời trang
🛠️ Công nghệ sử dụng
Backend
Runtime: Node.js với TypeScript
Framework: Express.js
Database: PostgreSQL với Prisma ORM
Cache: Redis (ioredis)
Authentication: JWT, Google OAuth, Facebook Auth
File Upload: Multer với Sharp (image processing)
Validation: Zod, express-validator
Logging: Winston
Testing: Jest, Supertest
Email: Nodemailer
Mobile (Flutter)
Framework: Flutter 3.5.4
State Management: BLoC Pattern (flutter_bloc)
Navigation: go_router
Dependency Injection: get_it, injectable
Networking: Dio, Retrofit
Local Storage: SharedPreferences, Flutter Secure Storage, Hive
Image Handling: image_picker, cached_network_image, flutter_image_compress
Calendar: table_calendar
Forms: reactive_forms, formz
Social Auth: google_sign_in, flutter_facebook_auth
Notifications: flutter_local_notifications
Location: geolocator, geocoding
ML Service
Framework: FastAPI (Python)
Image Processing: rembg (background removal)
Future ML Features: Category classification, color extraction, outfit recommendations
Infrastructure
Containerization: Docker Compose
Database: PostgreSQL 16
Cache: Redis 7
📁 Cấu trúc dự án
Outfit_Planner/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── validation/   # Zod schemas
│   │   └── utils/        # Helper functions
│   ├── prisma/          # Database schema & migrations
│   ├── test/            # Unit & integration tests
│   └── postman/         # API collections
│
├── mobile/              # Flutter mobile app
│   ├── lib/
│   │   ├── core/        # Theme, constants, extensions
│   │   ├── data/        # Models, repositories, data sources
│   │   ├── domain/      # Business entities
│   │   ├── presentation/# UI (pages, widgets, BLoC)
│   │   └── injection/   # Dependency injection setup
│   ├── android/         # Android native code
│   ├── ios/             # iOS native code
│   └── assets/          # Images, fonts, lottie animations
│
├── ml-service/          # Python FastAPI ML service
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── services/    # ML processing services
│   │   ├── models/      # ML models
│   │   └── utils/       # Helper functions
│   ├── models/          # Trained ML models storage
│   └── tests/           # Unit tests
│
├── docker-compose.yml   # Docker services configuration
└── README.md           # This file
🚀 Cài đặt và chạy
Yêu cầu hệ thống
Node.js >= 18
Python >= 3.9
Flutter SDK >= 3.5.4
Docker & Docker Compose
PostgreSQL 16
Redis 7
1. Clone repository
git clone https://github.com/huyIT203/outfit-planner.git
cd outfit-planner
2. Khởi động Infrastructure (Database & Redis)
docker-compose up -d
3. Setup Backend
cd backend
npm install
cp .env.example .env  # Cấu hình các biến môi trường
npx prisma generate
npx prisma migrate dev
npm run dev
Backend sẽ chạy tại http://localhost:3000

4. Setup ML Service
cd ml-service
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# Linux/Mac:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
ML Service sẽ chạy tại http://localhost:8001

5. Setup Mobile App
cd mobile
flutter pub get
flutter run
📚 API Documentation
API được document trong Postman collections tại backend/postman/:

auth.postman_collection.json - Authentication endpoints
items.postman_collection.json - Item management
outfits.postman_collection.json - Outfit management
calendar.postman_collection.json - Calendar & OOTD
recommendations.postman_collection.json - Recommendations
🧪 Testing
Backend Tests
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
📝 Database Schema
Database được quản lý bằng Prisma với các models chính:

User: Thông tin người dùng, preferences
Item: Quần áo trong tủ
Outfit: Bộ trang phục
OutfitItem: Quan hệ many-to-many giữa Outfit và Item
CalendarOutfit: OOTD theo ngày
OutfitHistory: Lịch sử mặc đồ
Xem chi tiết tại backend/prisma/schema.prisma

🔐 Environment Variables
Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/outfit_planner
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ML_SERVICE_URL=http://localhost:8001
ML Service (.env)
MODEL_PATH=./models
🤝 Đóng góp
Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

📄 License
MIT License

👤 Tác giả
huyIT203

GitHub: @huyIT203
Repository: outfit-planner
⭐ Nếu dự án này hữu ích, hãy cho một star!

About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Languages
Dart
73.2%
 
TypeScript
13.4%
 
Python
8.3%
 
C++
2.5%
 
CMake
1.9%
 
Swift
0.3%
 
Other
0.4%
Suggested workflows
Based on your tech stack
Dart logo
Dart
Build and test a Dart project with Pub.
SLSA Generic generator logo
SLSA Generic generator
Generate SLSA3 provenance for your existing release workflows
Webpack logo
Webpack
Build a NodeJS project with npm and webpack.
More workflows
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information