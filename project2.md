# 🌟 Sparkly - Smart Nutrition & Health Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Cross--Platform-blueviolet?style=for-the-badge" alt="Platform"/>
  <img src="https://img.shields.io/badge/Backend-Spring_Boot_3-6DB33F?style=for-the-badge&logo=spring-boot" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/Mobile-Flutter-02569B?style=for-the-badge&logo=flutter" alt="Flutter"/>
  <img src="https://img.shields.io/badge/Admin-React_18-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Python-FastAPI-009688?style=for-the-badge&logo=fastapi" alt="FastAPI"/>
</p>

<p align="center">
  <strong>A comprehensive nutrition tracking and health management ecosystem</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-license">License</a>
</p>

---

## 📖 Overview

**Sparkly** is a full-stack nutrition and health management platform designed to help users track their dietary intake, manage health goals, and discover healthy food options. The platform consists of:

| Component | Technology | Description |
|-----------|------------|-------------|
| 📱 **Mobile App** | Flutter | Cross-platform mobile application (iOS, Android, Web) |
| 🖥️ **Backend API** | Spring Boot 3 | RESTful API with JWT authentication |
| 🔬 **Nutrition Engine** | Python FastAPI | Recipe nutrition calculation microservice |
| 🎛️ **Admin Dashboard** | React 18 | Web-based admin interface |

## ✨ Features

### 📱 Mobile Application (NutriSmart)
- 🔐 **Authentication**: Email/Password, Google Sign-In, Facebook Login
- 📊 **BMR Calculator**: Calculate Basal Metabolic Rate based on personal metrics
- 🍎 **Food Tracking**: Log meals and track calories, proteins, carbs, and fats
- 📸 **Food Recognition**: Take photos to identify food items
- 📈 **Analytics**: View nutrition statistics by day/week/month
- 🎯 **Goal Setting**: Set and track weight loss/gain/maintenance goals
- 💧 **Water Tracking**: Monitor daily water intake

### 🖥️ Backend API (Sparkly)
- 🔐 **JWT Authentication**: Secure token-based authentication
- 👥 **OAuth2 Integration**: Google login support
- 🍽️ **Food Database**: Comprehensive food and ingredient management
- 🏪 **Restaurant Directory**: Restaurant information and menu management
- 📖 **Meal Diary**: Personal meal logging and history
- 📏 **Health Tracking**: Body measurements and health goals
- 🍳 **Recipe Management**: Recipe snapshots with nutritional data

### 🔬 Recipe Nutrition Engine
- 🧮 **Nutrition Calculator**: Compute nutrition for Vietnamese recipes
- 📐 **Unit Conversion**: Convert between various measurement units
- 🍳 **Cooking Adjustment Factors**: Account for nutrient changes during cooking
- 🔗 **Database Integration**: PostgreSQL for ingredient nutrient data

### 🎛️ Admin Dashboard
- 🥗 **Ingredient Management**: 80+ nutritional indicators per ingredient
- 🏪 **Restaurant Management**: Directory with ratings and verification
- 📤 **Bulk Operations**: Import from CSV, Excel, PDF, and images
- 🔍 **OCR Support**: Extract data from images
- 📊 **Analytics**: Statistics and insights dashboard

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              SPARKLY ECOSYSTEM                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────────┐  │
│  │   📱 Mobile  │    │ 🎛️ Admin    │    │     External Services    │  │
│  │   (Flutter)  │    │  (React)     │    │  (Google OAuth, etc.)    │  │
│  └──────┬───────┘    └──────┬───────┘    └────────────┬─────────────┘  │
│         │                   │                         │                 │
│         ▼                   ▼                         ▼                 │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    🖥️ Sparkly Backend (Spring Boot 3)          │    │
│  │    ┌─────────────────────────────────────────────────────┐     │    │
│  │    │  REST API  │  JWT Auth  │  JPA/Hibernate  │  Security│     │    │
│  │    └─────────────────────────────────────────────────────┘     │    │
│  └────────────────────────────────┬───────────────────────────────┘    │
│                                   │                                     │
│         ┌─────────────────────────┼─────────────────────────┐          │
│         │                         │                         │          │
│         ▼                         ▼                         ▼          │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────────┐     │
│  │ 🗄️ PostgreSQL│    │ 🔬 Nutrition     │    │  📁 File Storage │     │
│  │   Database   │    │    Engine        │    │    (Images)      │     │
│  │              │    │   (FastAPI)      │    │                  │     │
│  └──────────────┘    └──────────────────┘    └──────────────────┘     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

| Component | Requirement |
|-----------|-------------|
| **Backend** | Java 17, Docker, PostgreSQL |
| **Mobile** | Flutter SDK 3.5.4+, Dart 3.5.4+ |
| **Admin** | Node.js 16+, npm |
| **Nutrition Engine** | Python 3.11, Poetry |

### 1️⃣ Start the Backend (Sparkly)

```bash
# Navigate to backend directory
cd sparkly

# Option A: Using Docker Compose (Recommended)
docker-compose up --build

# Option B: Run locally
# First start PostgreSQL
docker run --name postgres -e POSTGRES_DB=sparkly -e POSTGRES_USER=sparkly -e POSTGRES_PASSWORD=123 -p 5432:5432 -d postgres:15

# Then run Spring Boot
./mvnw spring-boot:run
```

Backend will be available at: `http://localhost:8080/api`

### 2️⃣ Start the Admin Dashboard

```bash
# Navigate to admin dashboard
cd admin/ingredient-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

Admin Dashboard will open at: `http://localhost:3000`

**Default Login:**
- Username: `admin`
- Password: `password123`

### 3️⃣ Start the Nutrition Engine

```bash
# Navigate to nutrition engine
cd recipe-nutrition-engine

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.\.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install Poetry and dependencies
python -m pip install poetry
poetry install

# Start the service
poetry run python -m recipe_nutrition_engine.main
```

Nutrition Engine will be available at: `http://localhost:8000`

### 4️⃣ Run the Mobile App

```bash
# Navigate to mobile app
cd nutrismart_1

# Install dependencies
flutter pub get

# Configure Firebase (required)
# See nutrismart_1/README.md for Firebase setup

# Run the app
flutter run
```

## 📁 Project Structure

```
Healthyfood/
├── 📱 nutrismart_1/              # Flutter Mobile Application
│   ├── lib/
│   │   ├── constants/           # App constants
│   │   ├── models/              # Data models
│   │   ├── screens/             # UI screens
│   │   │   ├── auth/            # Authentication screens
│   │   │   ├── main/            # Main app screens
│   │   │   └── onboarding/      # Onboarding flow
│   │   ├── services/            # Business logic services
│   │   ├── theme/               # App theming
│   │   ├── utils/               # Utility functions
│   │   └── widgets/             # Reusable widgets
│   ├── assets/                  # Images, icons, animations
│   └── pubspec.yaml             # Flutter dependencies
│
├── 🖥️ sparkly/                   # Spring Boot Backend
│   ├── src/main/java/com/nutri/sparkly/
│   │   ├── config/              # Configuration classes
│   │   ├── controller/          # REST controllers
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── exception/           # Custom exceptions
│   │   ├── model/               # JPA entities
│   │   ├── repository/          # Data repositories
│   │   ├── security/            # JWT & auth
│   │   └── service/             # Business logic
│   ├── src/main/resources/
│   │   └── db/migration/        # Database migrations
│   ├── docker-compose.yml
│   └── pom.xml
│
├── 🔬 recipe-nutrition-engine/   # Python Nutrition Microservice
│   ├── src/recipe_nutrition_engine/
│   │   ├── api.py               # FastAPI endpoints
│   │   ├── calculator.py        # Nutrition calculation
│   │   ├── caf.py               # Cooking adjustment factors
│   │   ├── database.py          # DB connection
│   │   ├── repository.py        # Data access
│   │   └── unit_conversion.py   # Unit conversions
│   ├── tests/                   # Unit tests
│   └── pyproject.toml           # Poetry dependencies
│
├── 🎛️ admin/                     # Admin Dashboard
│   ├── ingredient-dashboard/    # React application
│   │   ├── src/
│   │   │   ├── components/      # React components
│   │   │   ├── services/        # API services
│   │   │   ├── types/           # TypeScript types
│   │   │   └── utils/           # Utilities
│   │   └── package.json
│   ├── data/                    # Sample data files
│   └── scripts/                 # Data processing scripts
│
└── 📚 docs/                      # Project documentation
    ├── schemas/                 # JSON schemas
    ├── cooking_adjustment_factors.md
    ├── unit_conversion_rules.md
    └── schema_contracts_overview.md
```

## 🛠️ Technology Stack

### Backend (Sparkly)
| Technology | Version | Purpose |
|------------|---------|---------|
| Spring Boot | 3.2.0 | Application framework |
| Java | 17 | Programming language |
| PostgreSQL | 15+ | Primary database |
| Spring Security | 6.x | Authentication & authorization |
| JWT | - | Token-based auth |
| Hibernate | 6.x | ORM |
| Docker | - | Containerization |

### Mobile (NutriSmart)
| Technology | Version | Purpose |
|------------|---------|---------|
| Flutter | 3.5.4+ | UI framework |
| Dart | 3.5.4+ | Programming language |
| Firebase | - | Auth & storage |
| Provider | 6.1.2 | State management |
| SQLite | - | Local database |
| Rive/Lottie | - | Animations |

### Admin Dashboard
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI library |
| TypeScript | 4.9 | Type safety |
| Ant Design | 5.12 | UI components |
| Axios | 1.6 | HTTP client |
| React Router | 6.20 | Routing |

### Nutrition Engine
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11 | Programming language |
| FastAPI | - | Web framework |
| SQLAlchemy | - | ORM |
| Poetry | - | Dependency management |

## 📚 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | Login |
| POST | `/api/auth/google` | Google OAuth login |
| POST | `/api/auth/refresh-token` | Refresh access token |
| GET | `/api/auth/me` | Get current user |

### Food & Nutrition Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/foods` | List foods |
| GET | `/api/ingredients` | List ingredients |
| GET | `/api/restaurants` | List restaurants |
| GET/POST | `/api/diary` | Meal diary |
| GET/POST | `/api/health/goals` | Health goals |

### Nutrition Engine Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/compute` | Calculate recipe nutrition |
| GET | `/health` | Service health check |
| GET | `/config` | Get configuration |

## 🔐 Security

- **Password Encryption**: BCrypt encoding
- **JWT Authentication**: Stateless token-based auth
- **Role-Based Access Control**: USER and ADMIN roles
- **CORS Support**: Configurable cross-origin policies
- **Input Validation**: Comprehensive request validation
- **OAuth2**: Google Sign-In integration

## 🌐 Environment Variables

### Backend (Sparkly)
```env
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/sparkly
SPRING_DATASOURCE_USERNAME=sparkly
SPRING_DATASOURCE_PASSWORD=123
```

### Nutrition Engine
```env
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/healthyfood
```

### Admin Dashboard
```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_APP_NAME=Sparkly Admin Dashboard
```

## 📱 Mobile App Configuration

### Firebase Setup
1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Add Android app with package name: `com.example.nutrismart`
3. Add iOS app with bundle ID: `com.example.nutrismart`
4. Download and add configuration files:
   - `android/app/google-services.json`
   - `ios/Runner/GoogleService-Info.plist`

### Build Commands
```bash
# Android APK
flutter build apk --release

# Android App Bundle
flutter build appbundle --release

# iOS (macOS required)
flutter build ios --release

# Web
flutter build web --release
```

## 📊 Database Schema Overview

### Core Tables
- `users` - User accounts and profiles
- `roles` - User roles (USER, ADMIN)
- `refresh_tokens` - JWT refresh tokens

### Food & Nutrition
- `foods` - Food items with nutrition data
- `ingredients` - Ingredient database (80+ nutrients)
- `restaurants` - Restaurant directory
- `nutrition` - Centralized nutrition data

### Tracking
- `days` - Daily diary entries
- `meals` - Meal records
- `water_intake` - Water consumption
- `measurements` - Body measurements
- `goals` - Health goals

## 🧪 Testing

### Backend
```bash
cd sparkly
./mvnw test
```

### Nutrition Engine
```bash
cd recipe-nutrition-engine
poetry run pytest
```

### Mobile App
```bash
cd nutrismart_1
flutter test
```

### Admin Dashboard
```bash
cd admin/ingredient-dashboard
npm test
```

## 📦 Postman Collections

Pre-configured Postman collections are available in the `sparkly/` directory:
- `Sparkly_API_Collection.postman_collection.json` - Main API collection
- `Food_API_Collection.postman_collection.json` - Food endpoints
- `Ingredient_API_Collection.postman_collection.json` - Ingredient endpoints
- `Restaurant_API_Collection.postman_collection.json` - Restaurant endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Huy IT203**
- GitHub: [@huyIT203](https://github.com/huyIT203)
- Repository: [Healthylife-sparkly](https://github.com/huyIT203/Healthylife-sparkly)

## 📞 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/huyIT203/Healthylife-sparkly/issues) page
2. Create a new issue if not already reported
3. Include detailed information about the problem

---

<p align="center">
  <strong>⭐ If this project helps you, please give it a star! ⭐</strong>
</p>

<p align="center">
  Built with ❤️ for a healthier lifestyle
</p>

