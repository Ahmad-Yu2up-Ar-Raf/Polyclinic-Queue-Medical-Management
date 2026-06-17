# LiveUp 

> Sistem Manajemen Antrian Poliklinik Digital yang Cerdas dan Efisien

![Build Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

---

## 📋 Daftar Isi

- [Overview](#-overview)
- [Masalah yang Diselesaikan](#-masalah-yang-diselesaikan)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Struktur Repository](#-struktur-repository)
- [API Backend](#-api-backend)
- [Preview UI](#-preview-ui)
- [Instalasi & Setup](#-instalasi--setup)
- [Environment Variables](#-environment-variables)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Role & Alur Pengguna](#-role--alur-pengguna)
- [Demo Online](#-demo-online)
- [Kontributor](#-kontributor)

---

## 🎯 Overview

**LiveUp** adalah sistem manajemen antrian poliklinik/klinik modern berbasis web dan mobile yang dirancang dengan pendekatan microservice. Sistem ini menghadirkan pengalaman antrian digital yang lebih rapi, cepat, dan informatif dibandingkan sistem antrian tradisional.

Dengan LiveUp, poliklinik dapat mengelola antrian pasien secara real-time, memantau status dokter, dan memberikan pengalaman terbaik kepada pasien dengan:

- 📊 Dashboard analytics yang comprehensive
- 📱 Aplikasi mobile untuk pasien dan operator
- 🌐 Interface web yang user-friendly dan responsif
- 🔐 Sistem autentikasi berbasis role yang aman
- ⚡ API REST yang scalable dan dokumentasi lengkap

---

## 🤔 Masalah yang Diselesaikan

### Tantangan Sistem Antrian Tradisional:

1. **Informasi Tidak Real-Time**
   - Pasien tidak tahu status antrian mereka secara akurat
   - Tidak ada notifikasi kapan giliran dipanggil
   - Menimbulkan kebingungan dan kecemasan pasien

2. **Inefisiensi Operasional**
   - Operator kesulitan mengelola antrian manual
   - Tidak ada data historis untuk analisis
   - Alur kerja yang lamban dan rawan kesalahan

3. **Pengalaman Pasien yang Buruk**
   - Pasien harus menunggu lama tanpa informasi jelas
   - Kesulitan registrasi dan pendaftaran antrian
   - Tidak ada cara mudah untuk memonitor status

4. **Kurangnya Insights Bisnis**
   - Tidak ada data untuk analisis kinerja dokter
   - Sulit mengidentifikasi bottleneck dalam proses
   - Tidak ada metrik untuk improvement

### Solusi LiveUp:

✅ **Real-Time Queue Status** - Pasien dapat melihat nomor antrian dan estimasi waktu tunggu
✅ **Sistem Multi-Role** - Admin, Operator, Dokter, dan Pasien memiliki fitur sesuai peran
✅ **Dashboard Analytics** - Admin dan operator dapat memonitor metrik penting
✅ **Mobile App** - Akses mudah dari smartphone untuk registrasi dan cek status
✅ **Public Monitor Display** - Layar publik di klinik menampilkan status antrian
✅ **Smart Queue Management** - Sistem otomatis untuk pengelolaan nomor antrian

---

## ✨ Fitur Utama

### 👤 Untuk Pasien
- ✅ Registrasi dan login account
- ✅ Pilih poli dan jadwal kunjungan
- ✅ Daftar antrian dengan metode pembayaran (BPJS/Mandiri)
- ✅ Cek status antrian real-time
- ✅ Lihat informasi dokter dan jadwal praktik
- ✅ Riwayat kunjungan dan antrian

### 👨‍💼 Untuk Operator/Admin
- ✅ Dashboard overview dengan analytics
- ✅ Manajemen data poli (clinic unit/department)
- ✅ Manajemen data dokter dan jadwal praktik
- ✅ Manajemen data pasien
- ✅ Kontrol antrian (panggil, lewati, selesai)
- ✅ Laporan dan statistik kunjungan
- ✅ Sistem manajemen role dan permission

### 🖥️ Public Monitor
- ✅ Tampilan layar publik untuk menampilkan antrian
- ✅ Informasi nomor antrian yang sedang dilayani
- ✅ Estimasi waktu tunggu
- ✅ Informasi dokter yang sedang praktek

### 📊 Analytics & Reporting
- ✅ Visualisasi data dengan chart (pasien, dokter, antrian, poli)
- ✅ Tracking pertumbuhan kunjungan harian
- ✅ Top doctors berdasarkan jumlah pasien
- ✅ Status antrian breakdown (dipanggil, menunggu, selesai)

---

## 🛠️ Tech Stack

### Backend API
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Laravel Framework** | ^13.8 | Web framework utama |
| **Laravel Sanctum** | ^4.0 | API authentication & tokens |
| **Laravel Breeze** | ^2.4 | Authentication scaffolding |
| **Spatie Permission** | ^7.4 | Role & permission management |
| **PHP** | ^8.3 | Server-side language |
| **PostgreSQL** | Latest | Database primary |

### Frontend Web
| Teknologi | Versi | Fungsi |
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
| Teknologi | Versi | Fungsi |
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

## 🏗️ Arsitektur Sistem

LiveUp menggunakan arsitektur **modern microservice-oriented** dengan pemisahan yang jelas antara backend API dan frontend clients.

```
┌─────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                │
├─────────────────────────────────────────────────────┤
│  Web Frontend (React/Vite)  │  Mobile (Expo/RN)    │
│  - Dashboard Admin/Operator │ - Patient App        │
│  - Queue Management         │ - Doctor App         │
│  - Analytics               │ - Queue Status       │
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
│  - Pasien        - Jadwal (Schedule)                │
│  - Dokter        - Antrian (Queue)                  │
└─────────────────┬────────────────────────────────┬──┘
                  │                                │
                  ▼                                ▼
         ┌──────────────┐              ┌──────────────┐
         │ PostgreSQL   │              │  Auth Cache  │
         │  Database    │              │  & Sessions  │
         └──────────────┘              └──────────────┘
```

### Alur Data Sistem

```
Patient Flow:
Pasien Login → Register Antrian → Queue Status Check → Dokter Call → Konsultasi

Operator Flow:
Admin Login → View Queue → Call Patient → Mark Status → Generate Report

Doctor Flow:
Dokter Login → View Schedule → See Queue → Update Status
```

---

## 📁 Struktur Repository

```
LiveUp/
├── Back-End/                    # Backend Laravel API
│   ├── app/
│   │   ├── Enums/              # Status & role enums
│   │   │   ├── RoleEnum.php               (admin, operator, dokter, pasien)
│   │   │   ├── AntrianStatusEnum.php      (dipanggil, menunggu, selesai, dilewati)
│   │   │   ├── DokterStatusEnum.php       (aktif, tidak aktif)
│   │   │   ├── MetodePembayaranEnum.php   (BPJS, mandiri)
│   │   │   ├── HariEnum.php               (Senin-Minggu)
│   │   │   └── JenisKelaminEnum.php
│   │   ├── Models/              # Eloquent Models
│   │   │   ├── User.php                   (dengan role & permission)
│   │   │   ├── Poli.php                   (clinic unit/department)
│   │   │   ├── Jadwal.php                 (schedule dokter)
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
│   │   │   │   ├── dashboard/             (antrian, poli, dokter, pasien)
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
│   │   │   │   └── index.tsx   (all routes defined)
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
│       │   ├── daftar/         (register new)
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

## 📡 API Backend

### Base URL
```
http://liveup.smkpesat.id/api/v1/
# atau untuk local development:
http://localhost:8000/api/v1/
```

### Authentication
Semua endpoint yang dilindungi menggunakan **Bearer Token** dari Laravel Sanctum:
```
Authorization: Bearer {token}
```

### Response Format
Semua response dalam format JSON dengan struktur konsisten:
```json
{
  "status": true,
  "message": "Data retrieved successfully",
  "data": { /* actual data */ }
}
```

### API Endpoints

#### 🔐 Authentication
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/auth/register` | ❌ | Register user baru (role: pasien) |
| POST | `/auth/login` | ❌ | Login & dapatkan token |
| POST | `/auth/logout` | ✅ | Logout session |
| POST | `/auth/forgot-password` | ❌ | Request reset password |
| POST | `/auth/reset-password` | ❌ | Reset password dengan token |

#### 🏥 Poli (Clinic Unit/Department)
| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| GET | `/polis` | ❌ | - | Lihat semua poli |
| GET | `/polis/select` | ✅ | pasien, admin | List poli untuk select |
| GET | `/polis/{id}` | ❌ | - | Detail poli |
| POST | `/polis` | ✅ | admin | Buat poli baru |
| PUT | `/polis/{id}` | ✅ | admin | Update poli |
| DELETE | `/polis/{id}` | ✅ | admin | Hapus poli |

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
| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| GET | `/dokter` | ❌ | - | Lihat semua dokter aktif |
| GET | `/dokter/{id}` | ❌ | - | Detail dokter |
| GET | `/dokter/poli?poli_id={id}` | ❌ | - | Dokter berdasarkan poli |
| POST | `/dokter` | ✅ | admin | Tambah dokter |
| PUT | `/dokter/{id}` | ✅ | admin | Update dokter |
| DELETE | `/dokter/{id}` | ✅ | admin | Hapus dokter |

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
| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| GET | `/jadwal` | ❌ | - | Lihat semua jadwal |
| GET | `/jadwal/select` | ❌ | - | List jadwal untuk select |
| GET | `/jadwal/{id}` | ❌ | - | Detail jadwal |
| POST | `/jadwal` | ✅ | admin | Buat jadwal baru |
| PUT | `/jadwal/{id}` | ✅ | admin | Update jadwal |
| DELETE | `/jadwal/{id}` | ✅ | admin | Hapus jadwal |

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
| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| GET | `/pasien` | ❌ | - | Lihat semua pasien |
| GET | `/pasien/select` | ✅ | pasien, admin | List pasien untuk select |
| GET | `/pasien/{id}` | ❌ | - | Detail pasien |
| POST | `/pasien` | ✅ | admin, pasien | Buat pasien baru |
| PUT | `/pasien/{id}` | ✅ | admin | Update pasien |
| DELETE | `/pasien/{id}` | ✅ | admin | Hapus pasien |

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
| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| GET | `/antrian` | ❌ | - | Lihat semua antrian |
| GET | `/antrian/monitor` | ❌ | - | Data untuk public monitor |
| GET | `/antrian/user` | ✅ | pasien | Antrian user saat ini |
| GET | `/antrian/{id}` | ❌ | - | Detail antrian |
| POST | `/antrian` | ✅ | admin, pasien | Buat antrian baru |
| POST | `/antrian/pendaftaranBaru` | ✅ | admin, pasien | Registrasi baru + antrian |
| POST | `/antrian/cek` | ✅ | pasien | Cek status antrian |
| PUT | `/antrian/{id}` | ✅ | admin, pasien | Update status antrian |
| DELETE | `/antrian/{id}` | ✅ | admin | Hapus antrian |

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
| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| GET | `/operator/{poli_id}` | ✅ | admin, operator | Lihat antrian poli |
| GET | `/operator/{poli_id}/{status}` | ✅ | admin, operator | Filter antrian by status |
| POST | `/operator/{status}/{id}` | ✅ | admin, operator | Ubah status antrian |

#### 📊 Overview & Analytics
| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| GET | `/overview` | ✅ | admin, operator | Dashboard admin analytics |
| GET | `/overview/pasien` | ✅ | pasien | Dashboard pasien |

**Analytics Response includes:**
- Total dokter, pasien, antrian, poli
- Grafik pertumbuhan harian
- Top dokter berdasarkan kunjungan
- Status breakdown antrian

#### Status Antrian (Queue Status)
```
- "menunggu" (waiting)
- "dipanggil" (called)
- "selesai" (completed)
- "dilewati" (skipped)
```

---

## 🎨 Preview UI

### Web Interface

#### 1. Dashboard Pasien
![Dashboard Pasien](Assets/web/overview.png)

#### 2. Login & Register
![Login](Assets/web/login.png)
![Pilih Poli](Assets/web/pilih-poli.png)

#### 3. Manajemen Antrian
![Antrian](Assets/web/antrian.png)
![Operator](Assets/web/operator.png)

#### 4. Manajemen Master Data
![Dokter](Assets/web/dokter.png)
![Pasien](Assets/web/pasien.png)
![Poli](Assets/web/poli.png)

#### 5. Public Monitor Display
![Monitor](Assets/web/monitor.png)

### Mobile Interface

#### Screens Utama
| Splash | Onboarding | Login | Register |
|--------|-----------|-------|----------|
| ![Splash](Assets/mobile/splash-screen.png) | ![Onboarding](Assets/mobile/onboarding.png) | ![Login](Assets/mobile/login.png) | ![Register](Assets/mobile/register.png) |

| Home | Home Alt | Dokter | Detail Dokter |
|------|----------|--------|---------------|
| ![Home](Assets/mobile/home-1.png) | ![Home2](Assets/mobile/home-2.png) | ![Dokter](Assets/mobile/dokter.png) | ![DetailDokter](Assets/mobile/detail-dokter.png) |

| Jadwal | Tinjau | Sukses | Setting |
|--------|--------|--------|---------|
| ![Jadwal](Assets/mobile/jadwal.png) | ![Tinjau](Assets/mobile/tinjau-1.png) | ![Sukses](Assets/mobile/sukses.png) | ![Setting](Assets/mobile/setting.png) |

---

## 🚀 Instalasi & Setup

### Prerequisites
Pastikan sudah terinstall:
- **Git** v2.0+
- **PHP** v8.3+
- **Composer** (untuk backend)
- **Node.js** v18+ dan **npm** (untuk frontend)
- **PostgreSQL** v12+ (database)
- **Expo CLI** (untuk mobile development)

### Step-by-Step Installation

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/Ahmad-Yu2up-Ar-Raf/Polyclinic-Queue-Medical-Management.git
cd LiveUp
```

#### 2️⃣ Setup Backend (Laravel API)
```bash
cd Back-End

# Copy environment file
cp .env.example .env

# Install dependencies
composer install

# Generate app key
php artisan key:generate

# Migrate database
php artisan migrate --force

# Seed database (optional - untuk data dummy)
php artisan db:seed

# Buat symbolic link untuk storage
php artisan storage:link
```

**Edit `.env` untuk database:**
```env
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=liveup_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

#### 3️⃣ Setup Frontend Web
```bash
cd ../Front-End/Web

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Build Tailwind jika diperlukan
npm run build:css
```

**Edit `.env` atau ubah config API:**
```env
VITE_API_URL=http://localhost:8000/api/v1/
# untuk production:
VITE_API_URL=http://liveup.smkpesat.id/api/v1/
```

#### 4️⃣ Setup Mobile App (Opsional)
```bash
cd ../Mobile

# Install dependencies
npm install

# Untuk testing di web
npx expo start --web

# Untuk testing di Android
npx expo start --android

# Untuk testing di iOS (MacOS only)
npx expo start --ios
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
# App Configuration
APP_NAME=LiveUp
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_LOCALE=id
APP_TIMEZONE=Asia/Jakarta

# Database (PostgreSQL)
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=liveup_db
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password
DB_SSLMODE=require

# Cache & Session
CACHE_STORE=database
SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database

# Mail Configuration (opsional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@liveup.com
MAIL_FROM_NAME="${APP_NAME}"

# Sanctum (API Token)
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8000
```

### Frontend Web (.env)
```env
VITE_APP_NAME=LiveUp
VITE_API_URL=http://localhost:8000/api/v1/
# untuk production
VITE_API_URL=http://liveup.smkpesat.id/api/v1/
```

### Mobile App (.env atau app.json)
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1/
# atau di app.json:
{
  "expo": {
    "extra": {
      "apiUrl": "http://liveup.smkpesat.id/api/v1/"
    }
  }
}
```

---

## ▶️ Menjalankan Aplikasi

### 🔙 Jalankan Backend API
```bash
cd Back-End

# Development mode dengan Artisan
php artisan serve

# Server akan berjalan di: http://localhost:8000
```

### 🌐 Jalankan Frontend Web
```bash
cd Front-End/Web

# Development mode
npm run dev

# Server akan berjalan di: http://localhost:5173
```

### 📱 Jalankan Mobile App (Development)
```bash
cd Front-End/Mobile

# Start Expo dev server
npm run dev

# Atau untuk web preview
npm run web

# Atau untuk Android emulator
npm run android

# Atau untuk iOS simulator (MacOS only)
npm run ios
```

### 🏗️ Build untuk Production

#### Backend (tidak perlu build, deploy folder to server)
```bash
# Just push code to server dengan proper .env configuration
```

#### Web Build
```bash
cd Front-End/Web
npm run build

# Output: dist/
# Deploy folder 'dist' ke web server
```

#### Mobile Build (EAS Build)
```bash
cd Front-End/Mobile

# Login ke Expo
eas login

# Build untuk Android
eas build --platform android

# Build untuk iOS
eas build --platform ios
```

---

## 👥 Role & Alur Pengguna

### 1️⃣ Admin (Superuser)
**Akses:** Dashboard penuh sistem

**Fitur:**
- ✅ Lihat analytics dashboard lengkap
- ✅ Kelola semua master data (poli, dokter, pasien, jadwal)
- ✅ Kontrol antrian di semua poli
- ✅ Kelola user dan role permission
- ✅ Generate laporan & export data
- ✅ Konfigurasi sistem

**Alur Khas:**
```
Login → Dashboard Overview → 
  ├─ Kelola Poli → Kelola Dokter → Kelola Jadwal
  ├─ Lihat Antrian → Update Status → Generate Report
  └─ Manajemen User
```

### 2️⃣ Operator (Queue Manager)
**Akses:** Manajemen antrian per poli

**Fitur:**
- ✅ Lihat antrian realtime per poli
- ✅ Panggil pasien (update status)
- ✅ Skip pasien jika perlu
- ✅ Lihat informasi pasien & dokter
- ✅ Cetak nomor antrian

**Alur Khas:**
```
Login → Pilih Poli → 
  ├─ Lihat Daftar Antrian
  ├─ Panggil Pasien (Dipanggil)
  ├─ Dokter Check (Selesai)
  └─ Next Pasien
```

### 3️⃣ Dokter (Doctor)
**Akses:** Lihat jadwal dan antrian mereka

**Fitur:** *[Sedang dikembangkan]*
- ✅ Lihat jadwal praktik
- ✅ Lihat antrian mereka hari ini
- ✅ Update status konsultasi
- ✅ Lihat riwayat pasien

### 4️⃣ Pasien (Patient)
**Akses:** Web dan Mobile App

**Fitur Web:**
- ✅ Register dan login
- ✅ Pilih poli dan dokter
- ✅ Daftar antrian
- ✅ Pilih metode pembayaran (BPJS/Mandiri)
- ✅ Cek status antrian real-time
- ✅ Lihat riwayat kunjungan
- ✅ Edit profil

**Fitur Mobile:**
- ✅ Semua fitur web
- ✅ Notifikasi ketika dipanggil
- ✅ Interface mobile-optimized
- ✅ Quick access ke dokter favorite

**Alur Khas:**
```
Login/Register → 
  ├─ Web: Dashboard → Daftar Antrian → Cek Status
  └─ Mobile: Home → Lihat Dokter → Jadwal → Daftar → Track Status
```

### 👁️ Public Monitor (Tidak Auth)
**Akses:** Display publik di klinik

**Menampilkan:**
- ✅ Nomor antrian yang sedang dilayani
- ✅ Nomor berikutnya
- ✅ Dokter dan poli info
- ✅ Estimasi waktu tunggu

---

## 🔗 Demo Online

### 🌐 Web Demo
**URL:** http://liveup.smkpesat.id/

**Test Account:**
```
Admin:
Email: admin@liveup.com
Password: [silahkan tanya developer]

Pasien:
Email: pasien@liveup.com
Password: [silahkan tanya developer]

Operator:
Email: operator@liveup.com
Password: [silahkan tanya developer]
```

**atau daftar akun baru sebagai Pasien**

### 📱 Mobile Demo
Aplikasi sudah tersedia di:
- 🍎 **iOS**: Coming soon di App Store
- 🤖 **Android**: Coming soon di Play Store

Untuk development, gunakan:
```bash
cd Front-End/Mobile
npm run dev
```

---

## 🛠️ Troubleshooting

### Backend Issues

**Error: SQLSTATE[HY000]: General error**
```
Solusi: Pastikan PostgreSQL service sudah running
sudo service postgresql start  # Linux
```

**Error: "Composer require failed"**
```
Solusi: Update composer dan clear cache
composer update
composer clear-cache
```

**Error: "App key missing"**
```
Solusi: Generate app key
php artisan key:generate
```

### Frontend Issues

**Error: API connection refused**
```
Solusi: Pastikan backend server running
cd Back-End && php artisan serve
```

**Error: "Module not found"**
```
Solusi: Install dependencies
npm install
```

**Tailwind CSS tidak loading**
```
Solusi: Rebuild Tailwind CSS
npm run build
```

### Mobile Issues

**Error: Expo development server not starting**
```
Solusi: Clear cache dan rebuild
npm run clean
npm install
npm run dev
```

---

## 📝 Catatan Tambahan

### Known Limitations
- Role "Dokter" masih dalam tahap development
- Notifikasi push untuk mobile sedang diimplementasikan
- Export/Import data belum tersedia di v1.0

### Roadmap Fitur Mendatang
- ✏️ Real-time notification system
- ✏️ Email reminders untuk pasien
- ✏️ SMS gateway integration
- ✏️ Video consultation
- ✏️ Payment gateway integration (Midtrans)
- ✏️ Advanced analytics & reports
- ✏️ Multi-language support
- ✏️ Offline mode untuk mobile

### Database Schema
```sql
-- Main tables:
users          -- Pengguna sistem
pasiens        -- Data pasien
dokters        -- Data dokter
polis          -- Data poli/departemen
jadwals        -- Jadwal praktik dokter
jadwal_dokter  -- Many-to-many dokter & jadwal
antrians       -- Data antrian pasien

-- Supporting tables:
model_has_roles        -- User role relationships
role_has_permissions   -- Role permission relationships
sessions              -- Session management
```

### Performance Optimization
- ✅ Database query optimization dengan eager loading
- ✅ Caching untuk data master yang jarang berubah
- ✅ Pagination untuk list data
- ✅ Frontend code splitting dengan React Router
- ✅ Image optimization dengan @unpic/react
- ✅ CSS minification dengan Tailwind production build

### Security Measures
- ✅ CORS configuration untuk API
- ✅ Rate limiting pada auth endpoints
- ✅ CSRF protection
- ✅ SQL injection prevention (Eloquent ORM)
- ✅ XSS protection dengan React built-in sanitization
- ✅ Password hashing dengan bcrypt
- ✅ Token-based authentication (Sanctum)
- ✅ Role-based access control (RBAC)

---

## 📞 Support & Contact

### Need Help?
- 📧 Email: contact@liveup.com
- 🐛 Issues: GitHub Issues
- 💬 Discussion: GitHub Discussions

---

## 👨‍💻 Kontributor

### Dikembangkan oleh:
**Ahmad Yusuf Ar-rafi**
- GitHub: [@Ahmad-Yu2up-Ar-Raf](https://github.com/Ahmad-Yu2up-Ar-Raf)
- Lokasi: Indonesia

### Terima kasih kepada:
- **Laravel Community** - Framework & ecosystem
- **React Community** - UI library & tools
- **Expo Team** - React Native platform
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components

---

## 📄 Lisensi

Project ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.

### Gunakan Dengan Bijak
Sistem ini dirancang untuk membantu klinik dan poliklinik mengelola antrian dengan lebih baik. Silakan gunakan, modify, dan deploy sesuai kebutuhan Anda.

---

## 🌟 Highlight Fitur

```
┌─────────────────────────────────────────────────┐
│ ⭐ LiveUp - Smart Queue Management System       │
├─────────────────────────────────────────────────┤
│                                                 │
│ 🎯 Real-time Queue Status                       │
│    Pasien dapat melihat nomor antrian & durasi  │
│                                                 │
│ 👥 Multi-Role System                            │
│    Admin, Operator, Dokter, Pasien              │
│                                                 │
│ 📊 Advanced Analytics Dashboard                 │
│    Visualisasi data & insights bisnis           │
│                                                 │
│ 📱 Native Mobile App                            │
│    iOS & Android dengan Expo + React Native     │
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
│    Siap deploy ke production environment        │
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
