# KlikAntri

> A Smart and Efficient Digital Clinic Queue Management System

![Build Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problems Solved](#-problems-solved)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Repository Structure](#-repository-structure)
- [Backend API](#-backend-api)
- [UI Preview](#-ui-preview)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [Roles & User Flows](#-roles--user-flows)
- [Online Demo](#-online-demo)
- [Contributors](#-contributors)

---

## 🎯 Overview

**KlikAntri** ("Recovered/Healed" in Indonesian) is a modern web- and mobile-based clinic/polyclinic queue management system built with a microservice approach. It delivers a digital queueing experience that's tidier, faster, and more informative than traditional queue systems.

With KlikAntri, clinics can manage patient queues in real time, monitor doctor status, and give patients the best possible experience through:

- 📊 A comprehensive analytics dashboard
- 📱 A mobile app for patients and operators
- 🌐 A user-friendly, responsive web interface
- 🔐 A secure role-based authentication system
- ⚡ A scalable REST API with full documentation

---

## 🤔 Problems Solved

### Challenges of Traditional Queue Systems:

1. **No Real-Time Information**
   - Patients don't accurately know their queue status
   - No notification for when their turn is called
   - Creates confusion and anxiety for patients

2. **Operational Inefficiency**
   - Operators struggle to manage queues manually
   - No historical data available for analysis
   - Slow, error-prone workflows

3. **Poor Patient Experience**
   - Patients wait a long time without clear information
   - Difficulty registering and joining the queue
   - No easy way to monitor status

4. **Lack of Business Insight**
   - No data for analyzing doctor performance
   - Hard to identify bottlenecks in the process
   - No metrics for improvement

### KlikAntri's Solution:

✅ **Real-Time Queue Status** — Patients can see their queue number and estimated wait time
✅ **Multi-Role System** — Admin, Operator, Doctor, and Patient each get role-appropriate features
✅ **Analytics Dashboard** — Admins and operators can monitor key metrics
✅ **Mobile App** — Easy access from a smartphone to register and check status
✅ **Public Monitor Display** — A public screen at the clinic showing queue status
✅ **Smart Queue Management** — An automated system for managing queue numbers

---

## ✨ Key Features

### 👤 For Patients
- ✅ Account registration and login
- ✅ Choose a department (poli) and visit schedule
- ✅ Join the queue with a payment method (BPJS national insurance / self-pay)
- ✅ Check real-time queue status
- ✅ View doctor information and practice schedules
- ✅ Visit and queue history

### 👨‍💼 For Operators/Admins
- ✅ Dashboard overview with analytics
- ✅ Department (poli / clinic unit) data management
- ✅ Doctor data and practice schedule management
- ✅ Patient data management
- ✅ Queue control (call, skip, complete)
- ✅ Visit reports and statistics
- ✅ Role and permission management system

### 🖥️ Public Monitor
- ✅ Public screen display showing the queue
- ✅ Current queue number being served
- ✅ Estimated wait time
- ✅ Info on the doctor currently practicing

### 📊 Analytics & Reporting
- ✅ Data visualization with charts (patients, doctors, queues, departments)
- ✅ Daily visit growth tracking
- ✅ Top doctors by patient count
- ✅ Queue status breakdown (called, waiting, completed)

---

## 🛠️ Tech Stack

### Backend API
| Technology | Version | Purpose |
|-----------|-------|--------|
| **Laravel Framework** | ^13.8 | Main web framework |
| **Laravel Sanctum** | ^4.0 | API authentication & tokens |
| **Laravel Breeze** | ^2.4 | Authentication scaffolding |
| **Spatie Permission** | ^7.4 | Role & permission management |
| **PHP** | ^8.3 | Server-side language |
| **PostgreSQL** | Latest | Primary database |

### Frontend Web
| Technology | Version | Purpose |
|-----------|-------|--------|
| **React** | ^19.2.4 | UI library |
| **TypeScript** | Latest | Type safety |
| **Vite** | Latest | Build tool & dev server |
| **React Router** | ^7.15.1 | Client-side routing |
| **TanStack Query** | ^5.100.11 | Server state management |
| **TanStack Form** | ^1.32.0 | Form management |
| **Zustand** | ^5.0.13 | Client state management |
| **Tailwind CSS** | ^4.2.1 | Styling & utilities |
| **shadcn/ui** | Latest | Pre-built UI components |
| **Ky** | ^2.0.2 | HTTP client |

### Frontend Mobile
| Technology | Version | Purpose |
|-----------|-------|--------|
| **Expo** | Latest | React Native framework |
| **React Native** | Latest | Native mobile development |
| **Expo Router** | Latest | File-based routing |
| **Clerk** | ^2.16.1 | Authentication |
| **TanStack Query** | ^5.100.6 | Data fetching |
| **TanStack Form** | ^1.32.0 | Form management |
| **NativeWind** | Latest | Tailwind CSS for React Native |
| **RN Primitives** | Latest | Native UI components |

---

## 🏗️ System Architecture

KlikAntri uses a **modern, microservice-oriented architecture** with a clear separation between the backend API and the frontend clients.

```
┌─────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                │
├─────────────────────────────────────────────────────┤
│  Web Frontend (React/Vite)  │  Mobile (Expo/RN)    │
│  - Admin/Operator Dashboard │ - Patient App        │
│  - Queue Management         │ - Doctor App         │
│  - Analytics               │ - Queue Status        │
└──────────────┬──────────────────────────────────┬──┘
               │              REST API             │
               │         (JSON over HTTP)          │
               ▼                                   ▼
┌─────────────────────────────────────────────────────┐
│           APPLICATION LAYER (Backend)               │
├─────────────────────────────────────────────────────┤
│          Laravel REST API (PHP 8.3)                 │
│  ┌──────────────────────────────────────────────┐  │
│  │  Controllers  │  Services  │  Middleware     │  │
│  │  - Auth       │ - Business │ - Auth Guard    │  │
│  │  - Queue      │ - Logic    │ - Role Check    │  │
│  │  - Analytics  │ - Rules    │ - Validation    │  │
│  └──────────────────────────────────────────────┘  │
└──────────────┬─────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────┐
│           DATA LAYER                                │
├─────────────────────────────────────────────────────┤
│  Models (Eloquent ORM):                             │
│  - User          - Poli (Department)               │
│  - Pasien (Patient)  - Jadwal (Schedule)            │
│  - Dokter (Doctor)   - Antrian (Queue)              │
└─────────────────┬────────────────────────────────┬──┘
                  │                                │
                  ▼                                ▼
         ┌──────────────┐              ┌──────────────┐
         │ PostgreSQL   │              │  Auth Cache  │
         │  Database    │              │  & Sessions  │
         └──────────────┘              └──────────────┘
```

### System Data Flow

```
Patient Flow:
Patient Login → Register for Queue → Check Queue Status → Doctor Calls → Consultation

Operator Flow:
Admin Login → View Queue → Call Patient → Update Status → Generate Report

Doctor Flow:
Doctor Login → View Schedule → See Queue → Update Status
```

---

## 📁 Repository Structure

```
KlikAntri/
├── Back-End/                    # Backend Laravel API
│   ├── app/
│   │   ├── Enums/              # Status & role enums
│   │   │   ├── RoleEnum.php               (admin, operator, doctor, patient)
│   │   │   ├── AntrianStatusEnum.php      (called, waiting, completed, skipped)
│   │   │   ├── DokterStatusEnum.php       (active, inactive)
│   │   │   ├── MetodePembayaranEnum.php   (BPJS national insurance, self-pay)
│   │   │   ├── HariEnum.php               (Monday–Sunday)
│   │   │   └── JenisKelaminEnum.php       (gender)
│   │   ├── Models/              # Eloquent Models
│   │   │   ├── User.php                   (with role & permission)
│   │   │   ├── Poli.php                   (clinic unit/department)
│   │   │   ├── Jadwal.php                 (doctor schedule)
│   │   │   ├── Dokter.php                 (doctor profile)
│   │   │   ├── Pasien.php                 (patient profile)
│   │   │   └── Antrian.php                (queue management)
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Auth/                  (authentication)
│   │   │   │   │   ├── RegisteredUserController.php
│   │   │   │   │   ├── AuthenticatedSessionController.php
│   │   │   │   │   └── PasswordReset Controllers
│   │   │   │   ├── AntrianController.php  (queue management)
│   │   │   │   ├── PoliController.php     (clinic unit)
│   │   │   │   ├── JadwalController.php   (schedule)
│   │   │   │   ├── DokterController.php   (doctor)
│   │   │   │   ├── PasienController.php   (patient)
│   │   │   │   ├── MonitorController.php  (public monitor)
│   │   │   │   ├── OperatorController.php (queue operator)
│   │   │   │   └── OverviewController.php (analytics)
│   │   │   ├── Requests/       (form validation)
│   │   │   ├── Resources/      (API response formatting)
│   │   │   └── Middleware/     (auth, role check)
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/         # Database schema
│   │   ├── seeders/            # Database seeds
│   │   └── factories/          # Model factories
│   ├── routes/
│   │   └── api.php             # API routes (v1 prefix)
│   ├── config/
│   │   ├── auth.php            # Auth configuration
│   │   ├── sanctum.php         # Sanctum config
│   │   ├── permission.php      # Permission config
│   │   └── ...
│   ├── .env.example            # Environment template
│   └── composer.json           # PHP dependencies
│
├── Front-End/
│   ├── Web/                    # Web Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── pages/          # Route pages
│   │   │   │   ├── auth/                  (login, register)
│   │   │   │   ├── dashboard/             (queue, department, doctor, patient)
│   │   │   │   ├── operator/              (queue management)
│   │   │   │   ├── monitor.tsx            (public display)
│   │   │   │   └── welcome.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── core/              (layout & shell)
│   │   │   │   │   └── fragments/         (reusable components)
│   │   │   │   └── theme-provider.tsx
│   │   │   ├── api/            # API client
│   │   │   │   └── clien.ts    (ky HTTP client instance)
│   │   │   ├── store/          # Zustand stores
│   │   │   │   └── auth-store.ts
│   │   │   ├── router/         # Route configuration
│   │   │   │   └── index.tsx   (all routes defined here)
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── types/          # TypeScript types
│   │   │   ├── config/         # App configuration
│   │   │   ├── lib/            # Utilities
│   │   │   ├── App.tsx         # Root component
│   │   │   └── main.tsx        # Entry point
│   │   ├── vite.config.ts      # Vite configuration
│   │   ├── tsconfig.json       # TypeScript config
│   │   └── package.json
│   │
│   └── Mobile/                 # Mobile App (Expo + React Native)
│       ├── app/                # Expo Router pages
│       │   ├── (tabs)/         # Main app tabs
│       │   │   ├── dokter/     (doctor list)
│       │   │   ├── jadwal/     (schedule)
│       │   │   └── setting/    (settings)
│       │   ├── (auth)/         # Auth pages
│       │   │   ├── login.tsx
│       │   │   ├── register.tsx
│       │   │   └── welcome.tsx
│       │   ├── daftar/         (new registration)
│       │   └── _layout.tsx     (root layout)
│       ├── components/         # Reusable components
│       ├── api/                # API integration
│       ├── hooks/              # Custom hooks
│       ├── store/              # State management
│       ├── context/            # React context
│       ├── app.json            # Expo config
│       ├── package.json        # Dependencies
│       └── tsconfig.json
│
├── Assets/                     # Project assets & documentation
│   ├── logo/                   # Logo & favicon
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   └── site.webmanifest
│   ├── web/                    # Web UI screenshots
│   │   ├── login.png
│   │   ├── register.png
│   │   ├── dashboard.png
│   │   ├── antrian.png
│   │   ├── dokter.png
│   │   ├── pasien.png
│   │   ├── poli.png
│   │   ├── operator.png
│   │   └── monitor.png
│   ├── mobile/                 # Mobile app screenshots
│   │   ├── splash-screen.png
│   │   ├── onboarding.png
│   │   ├── login.png
│   │   ├── register.png
│   │   ├── home-1.png
│   │   ├── home-2.png
│   │   ├── dokter.png
│   │   ├── detail-dokter.png
│   │   ├── jadwal.png
│   │   ├── setting.png
│   │   └── ...
│   └── dokumentasi/            # API documentation
│       ├── api.png
│       ├── api-2.png
│       └── api-3.png
│
├── Dokumentasi/                # Project documentation
├── .github/                    # GitHub workflows
├── README.md                   # This file
└── .gitignore

```

---

## 📡 Backend API

### Base URL
```
http://KlikAntri.smkpesat.id/api/v1/
# or for local development:
http://localhost:8000/api/v1/
```

### Authentication
All protected endpoints use a **Bearer Token** issued by Laravel Sanctum:
```
Authorization: Bearer {token}
```

### Response Format
All responses use a consistent JSON structure:
```json
{
  "status": true,
  "message": "Data retrieved successfully",
  "data": { /* actual data */ }
}
```

### API Endpoints

#### 🔐 Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-----------|
| POST | `/auth/register` | ❌ | Register a new user (role: patient) |
| POST | `/auth/login` | ❌ | Log in & obtain a token |
| POST | `/auth/logout` | ✅ | Log out of the session |
| POST | `/auth/forgot-password` | ❌ | Request a password reset |
| POST | `/auth/reset-password` | ❌ | Reset password using a token |

#### 🏥 Poli (Clinic Unit/Department)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-----------|
| GET | `/polis` | ❌ | - | View all departments |
| GET | `/polis/select` | ✅ | patient, admin | Department list for a select input |
| GET | `/polis/{id}` | ❌ | - | Department detail |
| POST | `/polis` | ✅ | admin | Create a new department |
| PUT | `/polis/{id}` | ✅ | admin | Update a department |
| DELETE | `/polis/{id}` | ✅ | admin | Delete a department |

**Sample Response:**
```json
{
  "status": true,
  "message": "Data retrieved successfully",
  "data": {
    "id": 1,
    "nama": "Poli Umum",
    "kode": "PU",
    "ruangan": "Ruang 101",
    "dokter_count": 5,
    "antrian_count": 12
  }
}
```

#### 👨‍⚕️ Dokter (Doctor)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-----------|
| GET | `/dokter` | ❌ | - | View all active doctors |
| GET | `/dokter/{id}` | ❌ | - | Doctor detail |
| GET | `/dokter/poli?poli_id={id}` | ❌ | - | Doctors filtered by department |
| POST | `/dokter` | ✅ | admin | Add a doctor |
| PUT | `/dokter/{id}` | ✅ | admin | Update a doctor |
| DELETE | `/dokter/{id}` | ✅ | admin | Delete a doctor |

**Sample Response:**
```json
{
  "id": 1,
  "nama": "Dr. Ahmad",
  "email": "ahmad@clinic.com",
  "jenis_kelamin": "Laki-laki",
  "spesialisasi": "Umum",
  "status": "aktif",
  "poli_id": 1,
  "foto": "url/to/photo.jpg"
}
```

#### 📅 Jadwal (Schedule)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-----------|
| GET | `/jadwal` | ❌ | - | View all schedules |
| GET | `/jadwal/select` | ❌ | - | Schedule list for a select input |
| GET | `/jadwal/{id}` | ❌ | - | Schedule detail |
| POST | `/jadwal` | ✅ | admin | Create a new schedule |
| PUT | `/jadwal/{id}` | ✅ | admin | Update a schedule |
| DELETE | `/jadwal/{id}` | ✅ | admin | Delete a schedule |

**Sample Response:**
```json
{
  "id": 1,
  "hari": "Senin",
  "jam_mulai": "08:00",
  "jam_selesai": "12:00",
  "kuota": 20
}
```

#### 👥 Pasien (Patient)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-----------|
| GET | `/pasien` | ❌ | - | View all patients |
| GET | `/pasien/select` | ✅ | patient, admin | Patient list for a select input |
| GET | `/pasien/{id}` | ❌ | - | Patient detail |
| POST | `/pasien` | ✅ | admin, patient | Create a new patient |
| PUT | `/pasien/{id}` | ✅ | admin | Update a patient |
| DELETE | `/pasien/{id}` | ✅ | admin | Delete a patient |

**Sample Response:**
```json
{
  "id": 1,
  "nama": "Budi Santoso",
  "nik": "3201011234567890",
  "jenis_kelamin": "Laki-laki",
  "no_hp": "081234567890",
  "tanggal_lahir": "1990-01-01",
  "alamat": "Jl. Merdeka No. 1"
}
```

#### 🎫 Antrian (Queue)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-----------|
| GET | `/antrian` | ❌ | - | View all queues |
| GET | `/antrian/monitor` | ❌ | - | Data for the public monitor |
| GET | `/antrian/user` | ✅ | patient | The current user's queue entry |
| GET | `/antrian/{id}` | ❌ | - | Queue detail |
| POST | `/antrian` | ✅ | admin, patient | Create a new queue entry |
| POST | `/antrian/pendaftaranBaru` | ✅ | admin, patient | New registration + queue entry |
| POST | `/antrian/cek` | ✅ | patient | Check queue status |
| PUT | `/antrian/{id}` | ✅ | admin, patient | Update queue status |
| DELETE | `/antrian/{id}` | ✅ | admin | Delete a queue entry |

**Sample Response (Create Queue):**
```json
{
  "id": 1,
  "nomor_antrian": "A001",
  "pasien_id": 5,
  "dokter_id": 1,
  "poli_id": 1,
  "jadwal_kunjungan": "2026-01-15",
  "metode_pembayaran": "BPJS",
  "status": "menunggu",
  "nomor_urut": 1
}
```

#### 👨‍💼 Operator (Queue Management)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-----------|
| GET | `/operator/{poli_id}` | ✅ | admin, operator | View a department's queue |
| GET | `/operator/{poli_id}/{status}` | ✅ | admin, operator | Filter queue by status |
| POST | `/operator/{status}/{id}` | ✅ | admin, operator | Change a queue entry's status |

#### 📊 Overview & Analytics
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-----------|
| GET | `/overview` | ✅ | admin, operator | Admin analytics dashboard |
| GET | `/overview/pasien` | ✅ | patient | Patient dashboard |

**The analytics response includes:**
- Total doctors, patients, queue entries, departments
- Daily growth chart
- Top doctors by number of visits
- Queue status breakdown

#### Queue Status Values
```
- "menunggu" (waiting)
- "dipanggil" (called)
- "selesai" (completed)
- "dilewati" (skipped)
```

---

## 🎨 UI Preview

### Web Interface

#### 1. Patient Dashboard
![Patient Dashboard](Assets/web/overview.png)

#### 2. Login & Register
![Login](Assets/web/login.png)
![Choose Department](Assets/web/pilih-poli.png)

#### 3. Queue Management
![Queue](Assets/web/antrian.png)
![Operator](Assets/web/operator.png)

#### 4. Master Data Management
![Doctor](Assets/web/dokter.png)
![Patient](Assets/web/pasien.png)
![Department](Assets/web/poli.png)

#### 5. Public Monitor Display
![Monitor](Assets/web/monitor.png)

### Mobile Interface

#### Main Screens
| Splash | Onboarding | Login | Register |
|--------|-----------|-------|----------|
| ![Splash](Assets/mobile/splash-screen.png) | ![Onboarding](Assets/mobile/onboarding.png) | ![Login](Assets/mobile/login.png) | ![Register](Assets/mobile/register.png) |

| Home | Home Alt | Doctor | Doctor Detail |
|------|----------|--------|---------------|
| ![Home](Assets/mobile/home-1.png) | ![Home2](Assets/mobile/home-2.png) | ![Doctor](Assets/mobile/dokter.png) | ![DoctorDetail](Assets/mobile/detail-dokter.png) |

| Schedule | Review | Success | Settings |
|--------|--------|--------|---------|
| ![Schedule](Assets/mobile/jadwal.png) | ![Review](Assets/mobile/tinjau-1.png) | ![Success](Assets/mobile/sukses.png) | ![Settings](Assets/mobile/setting.png) |

---

## 🚀 Installation & Setup

### Prerequisites
Make sure the following are installed:
- **Git** v2.0+
- **PHP** v8.3+
- **Composer** (for the backend)
- **Node.js** v18+ and **npm** (for the frontend)
- **PostgreSQL** v12+ (database)
- **Expo CLI** (for mobile development)

### Step-by-Step Installation

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/Ahmad-Yu2up-Ar-Raf/Polyclinic-Queue-Medical-Management.git
cd KlikAntri
```

#### 2️⃣ Set Up Backend (Laravel API)
```bash
cd Back-End

# Copy the environment file
cp .env.example .env

# Install dependencies
composer install

# Generate app key
php artisan key:generate

# Migrate the database
php artisan migrate --force

# Seed the database (optional — for dummy data)
php artisan db:seed

# Create a symbolic link for storage
php artisan storage:link
```

**Edit `.env` for your database:**
```env
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=KlikAntri_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

#### 3️⃣ Set Up the Web Frontend
```bash
cd ../Front-End/Web

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Rebuild Tailwind CSS if needed
npm run build:css
```

**Edit `.env`, or update the API config:**
```env
VITE_API_URL=http://localhost:8000/api/v1/
# for production:
VITE_API_URL=http://KlikAntri.smkpesat.id/api/v1/
```

#### 4️⃣ Set Up the Mobile App (Optional)
```bash
cd ../Mobile

# Install dependencies
npm install

# For testing on web
npx expo start --web

# For testing on Android
npx expo start --android

# For testing on iOS (macOS only)
npx expo start --ios
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
# App Configuration
APP_NAME=KlikAntri
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_LOCALE=id
APP_TIMEZONE=Asia/Jakarta

# Database (PostgreSQL)
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=KlikAntri_db
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password
DB_SSLMODE=require

# Cache & Session
CACHE_STORE=database
SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database

# Mail Configuration (optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@KlikAntri.com
MAIL_FROM_NAME="${APP_NAME}"

# Sanctum (API Token)
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8000
```

### Frontend Web (.env)
```env
VITE_APP_NAME=KlikAntri
VITE_API_URL=http://localhost:8000/api/v1/
# for production
VITE_API_URL=http://KlikAntri.smkpesat.id/api/v1/
```

### Mobile App (.env or app.json)
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1/
# or in app.json:
{
  "expo": {
    "extra": {
      "apiUrl": "http://KlikAntri.smkpesat.id/api/v1/"
    }
  }
}
```

---

## ▶️ Running the App

### 🔙 Run the Backend API
```bash
cd Back-End

# Development mode via Artisan
php artisan serve

# Server will run at: http://localhost:8000
```

### 🌐 Run the Web Frontend
```bash
cd Front-End/Web

# Development mode
npm run dev

# Server will run at: http://localhost:5173
```

### 📱 Run the Mobile App (Development)
```bash
cd Front-End/Mobile

# Start the Expo dev server
npm run dev

# Or for web preview
npm run web

# Or for the Android emulator
npm run android

# Or for the iOS simulator (macOS only)
npm run ios
```

### 🏗️ Building for Production

#### Backend (no build step needed — just deploy the folder to the server)
```bash
# Just push the code to the server with the proper .env configuration
```

#### Web Build
```bash
cd Front-End/Web
npm run build

# Output: dist/
# Deploy the 'dist' folder to your web server
```

#### Mobile Build (EAS Build)
```bash
cd Front-End/Mobile

# Log in to Expo
eas login

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

---

## 👥 Roles & User Flows

### 1️⃣ Admin (Superuser)
**Access:** Full system dashboard

**Features:**
- ✅ View the complete analytics dashboard
- ✅ Manage all master data (departments, doctors, patients, schedules)
- ✅ Control queues across all departments
- ✅ Manage users and role permissions
- ✅ Generate reports & export data
- ✅ System configuration

**Typical Flow:**
```
Login → Dashboard Overview →
  ├─ Manage Departments → Manage Doctors → Manage Schedules
  ├─ View Queue → Update Status → Generate Report
  └─ User Management
```

### 2️⃣ Operator (Queue Manager)
**Access:** Per-department queue management

**Features:**
- ✅ View real-time queues per department
- ✅ Call patients (update status)
- ✅ Skip patients if needed
- ✅ View patient & doctor information
- ✅ Print queue numbers

**Typical Flow:**
```
Login → Select Department →
  ├─ View Queue List
  ├─ Call Patient (Called)
  ├─ Doctor Check (Completed)
  └─ Next Patient
```

### 3️⃣ Dokter (Doctor)
**Access:** View their schedule and queue

**Features:** *[Under development]*
- ✅ View practice schedule
- ✅ View today's queue
- ✅ Update consultation status
- ✅ View patient history

### 4️⃣ Pasien (Patient)
**Access:** Web and Mobile App

**Web Features:**
- ✅ Register and log in
- ✅ Choose a department and doctor
- ✅ Join the queue
- ✅ Choose a payment method (BPJS / self-pay)
- ✅ Check real-time queue status
- ✅ View visit history
- ✅ Edit profile

**Mobile Features:**
- ✅ All web features
- ✅ Notification when called
- ✅ Mobile-optimized interface
- ✅ Quick access to favorite doctors

**Typical Flow:**
```
Login/Register →
  ├─ Web: Dashboard → Join Queue → Check Status
  └─ Mobile: Home → Browse Doctors → Schedule → Register → Track Status
```

### 👁️ Public Monitor (No Auth Required)
**Access:** Public display at the clinic

**Displays:**
- ✅ Queue number currently being served
- ✅ Next number
- ✅ Doctor and department info
- ✅ Estimated wait time

---

## 🔗 Online Demo

### 🌐 Web Demo
**URL:** http://KlikAntri.smkpesat.id/

**Test Accounts:**
```
Admin:
Email: admin@KlikAntri.com
Password: [ask the developer]

Patient:
Email: pasien@KlikAntri.com
Password: [ask the developer]

Operator:
Email: operator@KlikAntri.com
Password: [ask the developer]
```

**or register a new account as a Patient**

### 📱 Mobile Demo
The app will be available on:
- 🍎 **iOS**: Coming soon on the App Store
- 🤖 **Android**: Coming soon on the Play Store

For development, use:
```bash
cd Front-End/Mobile
npm run dev
```

---

## 🛠️ Troubleshooting

### Backend Issues

**Error: SQLSTATE[HY000]: General error**
```
Fix: Make sure the PostgreSQL service is running
sudo service postgresql start  # Linux
```

**Error: "Composer require failed"**
```
Fix: Update Composer and clear the cache
composer update
composer clear-cache
```

**Error: "App key missing"**
```
Fix: Generate the app key
php artisan key:generate
```

### Frontend Issues

**Error: API connection refused**
```
Fix: Make sure the backend server is running
cd Back-End && php artisan serve
```

**Error: "Module not found"**
```
Fix: Install dependencies
npm install
```

**Tailwind CSS not loading**
```
Fix: Rebuild Tailwind CSS
npm run build
```

### Mobile Issues

**Error: Expo development server not starting**
```
Fix: Clear the cache and rebuild
npm run clean
npm install
npm run dev
```

---

## 📝 Additional Notes

### Known Limitations
- The "Doctor" role is still under development
- Push notifications for mobile are being implemented
- Data export/import is not yet available in v1.0

### Upcoming Feature Roadmap
- ✏️ Real-time notification system
- ✏️ Email reminders for patients
- ✏️ SMS gateway integration
- ✏️ Video consultation
- ✏️ Payment gateway integration (Midtrans)
- ✏️ Advanced analytics & reports
- ✏️ Multi-language support
- ✏️ Offline mode for mobile

### Database Schema
```sql
-- Main tables:
users          -- System users
pasiens        -- Patient data
dokters        -- Doctor data
polis          -- Department/clinic-unit data
jadwals        -- Doctor practice schedules
jadwal_dokter  -- Many-to-many between doctors & schedules
antrians       -- Patient queue data

-- Supporting tables:
model_has_roles        -- User-role relationships
role_has_permissions   -- Role-permission relationships
sessions              -- Session management
```

### Performance Optimization
- ✅ Database query optimization with eager loading
- ✅ Caching for infrequently-changed master data
- ✅ Pagination for list data
- ✅ Frontend code splitting with React Router
- ✅ Image optimization with @unpic/react
- ✅ CSS minification via Tailwind's production build

### Security Measures
- ✅ CORS configuration for the API
- ✅ Rate limiting on auth endpoints
- ✅ CSRF protection
- ✅ SQL injection prevention (Eloquent ORM)
- ✅ XSS protection via React's built-in sanitization
- ✅ Password hashing with bcrypt
- ✅ Token-based authentication (Sanctum)
- ✅ Role-based access control (RBAC)

---

## 📞 Support & Contact

### Need Help?
- 📧 Email: contact@KlikAntri.com
- 🐛 Issues: GitHub Issues
- 💬 Discussion: GitHub Discussions

---

## 👨‍💻 Contributors

### Developed by:
**Ahmad Yusuf Ar-rafi**
- GitHub: [@Ahmad-Yu2up-Ar-Raf](https://github.com/Ahmad-Yu2up-Ar-Raf)
- Location: Indonesia

### Thanks to:
- **Laravel Community** — Framework & ecosystem
- **React Community** — UI library & tools
- **Expo Team** — React Native platform
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Beautiful UI components

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

### Use Responsibly
This system is designed to help clinics and polyclinics manage queues better. Feel free to use, modify, and deploy it to suit your needs.

---

## 🌟 Feature Highlights

```
┌─────────────────────────────────────────────────┐
│ ⭐ KlikAntri - Smart Queue Management System       │
├─────────────────────────────────────────────────┤
│                                                 │
│ 🎯 Real-time Queue Status                       │
│    Patients can see their queue number & ETA    │
│                                                 │
│ 👥 Multi-Role System                            │
│    Admin, Operator, Doctor, Patient             │
│                                                 │
│ 📊 Advanced Analytics Dashboard                 │
│    Data visualization & business insights       │
│                                                 │
│ 📱 Native Mobile App                            │
│    iOS & Android with Expo + React Native       │
│                                                 │
│ 🌐 Responsive Web Interface                     │
│    Desktop & tablet friendly                    │
│                                                 │
│ 🔐 Enterprise-Grade Security                    │
│    Role-based access control & encryption       │
│                                                 │
│ ⚡ Scalable Architecture                        │
│    Microservice-oriented design                 │
│                                                 │
│ 🚀 Production Ready                             │
│    Ready to deploy to a production environment  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📚 Additional Resources

- 📖 [Laravel Documentation](https://laravel.com/docs)
- 📖 [React Documentation](https://react.dev)
- 📖 [Expo Documentation](https://docs.expo.dev)
- 📖 [PostgreSQL Documentation](https://www.postgresql.org/docs)
- 📖 [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Made with ❤️ by Ahmad Yusuf Ar-rafi**

*Last Updated: June 2026*

---

## 📝 Translator's notes

A few things worth a second look beyond the translation itself:

- **Table of Contents links are broken for two sections** — `[Overview](#-overview)` etc. use a single trailing hyphen before the emoji anchor, but GitHub's auto-generated anchors for headers starting with an emoji usually need testing case by case; worth clicking through each ToC link once to confirm they land correctly after translation, since anchor text changed (e.g. "Masalah yang Diselesaikan" → "Problems Solved").
- **Repeated field**: `HariEnum.php` didn't have a description in the original — added "(gender)" was actually for `JenisKelaminEnum.php`; double-check I matched enums to descriptions correctly if you paste this back into the real repo.
- **Clone URL mismatch**: the "Clone Repository" step clones `Polyclinic-Queue-Medical-Management.git` but then `cd KlikAntri` — that mismatch exists in the original too and will break for anyone copy-pasting; worth fixing the repo name or the `cd` target.
- **Credentials in a public README**: the demo test-account emails are fine, but consider not committing real passwords even placeholders like this if the repo is public — "[ask the developer]" is a reasonable placeholder, already handled well here.
- Given how much is already documented (API tables, architecture diagram, troubleshooting), a short "Contributing" section (like Suasana's) would fit nicely, since right now this README documents usage in depth but says nothing about how outside contributors could submit changes.
