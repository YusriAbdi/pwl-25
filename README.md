# PROJECT UAS SISTEM DONASI

HumanityCare adalah web donasi kemanusiaan berbasis online yang memungkinkan pengguna melihat campaign, melakukan donasi, serta mengunggah bukti pembayaran. Sistem ini menerapkan Role-Based Access Control (RBAC) dengan peran user, admin, dan field worker, menggunakan arsitektur REST API dan SPA, autentikasi JWT, serta basis data MySQL untuk mendukung pengelolaan campaign dan verifikasi pembayaran secara aman.

---

## 1. Fitur Utama

**Fitur Umum & Keamanan:**
* 🔐 **Autentikasi JWT:** Login dan akses API diamankan menggunakan JSON Web Token.
* 🛡️ **Protected Routes:** Halaman tertentu seperti dashboard dan transaksi hanya dapat diakses oleh pengguna yang telah login.
* 👮 **Role-Based Access Control (RBAC):** Pengaturan hak akses berdasarkan peran User, Admin, dan Field Worker.

**Fitur User:**
* 📋 **Lihat Campaign Donasi:** Mengakses daftar campaign donasi yang sedang berlangsung.
* 💰 **Melakukan Donasi:** Mengirim donasi ke campaign yang dipilih.
* 🧾 **Upload Bukti Pembayaran:** Mengunggah bukti transfer donasi secara online.
* 📊 **Riwayat Donasi:** Melihat histori donasi dan status verifikasi pembayaran.

**Fitur Admin:**
* 📋 **Manajemen Campaign:** Melihat dan mengelola seluruh campaign donasi.
* ✅ **Verifikasi Pembayaran:** Memverifikasi bukti pembayaran donasi dari pengguna.
* 📈 **Monitoring Donasi:** Memantau total dana dan status donasi pada setiap campaign.

**Fitur Field Worker:**
* ✏️ **Kelola Campaign:** Membuat dan memperbarui campaign donasi.
* 📰 **Update Informasi Lapangan:** Menyampaikan perkembangan kondisi atau laporan lapangan terkait campaign.

---

## 2. Instalasi yang Dibutuhkan

Sebelum menjalankan HumanityCare, pastikan perangkat telah terpasang:

1.  **Node.js** dan NPM.
2.  **MySQL Database** (disarankan menggunakan XAMPP atau Laragon).
3.  **Git** (opsional, untuk clone repository).

**Langkah Awal Instalasi:**
1.  Clone atau unduh repository HumanityCare.
2.  Import file database MySQL ke server lokal.
3.  Konfigurasikan file .env pada folder backend dengan menyesuaikan variabel berikut:
* DB_HOST
* DB_USER
* DB_PASS
* DB_NAME
* JWT_SECRET
* PORT

---

## 3. Cara Run Frontend

Frontend dibangun menggunakan **Vue 3** dengan **Vite** dan menerapkan konsep **Single Page Application (SPA)**.

1.  Buka terminal baru, masuk ke folder frontend:
    ```bash
    cd frontend
    ```
2.  Install library yang dibutuhkan :
    ```bash
    npm install
    ```
3.  Jalankan server frontend:
    ```bash
    npm run dev
    ```
4.  Akses aplikasi di browser melalui link yang muncul URL local `http://localhost:3000/`. Disini berada pada `3000` karena sudah di set di file `vite.config.js`.

---

## 4. Cara Run Backend

Backend HumanityCare dibangun menggunakan Node.js dan Express.js dengan arsitektur REST API.

1.  Buka terminal baru, masuk ke folder backend:
    ```bash
    cd backend
    ```
2.  Install library yang dibutuhkan (hanya pertama kali):
    ```bash
    npm install
    ```
3.  Jalankan server backend:
    ```bash
    npm start
    ```
4.  Jika berhasil, terminal akan menampilkan informasi:
    ```bash
    Server berjalan di: `http://localhost:5000`
    Payload Limit: `50MB (Foto Aktif)`
    ```

---

## 5. Akun Masuk untuk Role Mahasiswa

Gunakan akun ini untuk menguji fitur pelaporan masalah:

* **Nama Lengkap:** `Yusri Abdi`
* **Email:** `yusriabdi837@gmail.com`
* **Password:** `12345`
*** note: bisa mendaftar akun baru yang dapat disesuaikan.***
---

## 6. Akun Masuk untuk Role Admin

Gunakan akun ini untuk menguji fitur memproses laporan dan update status:

* **Nama Lengkap:** `admin`
* **Email:** `admin@gmail.com`
* **Password:** `123456`

---

## 7. Daftar Endpoint API

Base URL: `http://localhost:5000/api`
Semua endpoint API berada di bawah prefix: `/api`

Untuk endpoint yang diproteksi, sertakan **Header** seperti `Authorization: Bearer <token>`.

### 🔐 Autentikasi
| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registrasi publik (role otomatis user/donatur) | Public |
| `POST` | `/api/auth/login` | Login & mendapatkan JWT | Public |

### 📢 campaign
| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/campaigns` | Melihat seluruh kampanye donasi | public |
| `GET` | `/api/campaigns/:id` | Melihat detail kampanye | public |
| `POST` | `/api/campaigns` | Membuat kampanye baru | 🔐 Admin |
| `PUT` | `/api/campaigns/:id` | Mengubah data kampanye | 🔐 Admin |
| `DELETE` | `/api/campaigns/:id` | Menghapus kampanye | 🔐 Admin |

### 💰 Donasi
| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/donations` | Melihat seluruh riwayat donasi | 🔐 Admin |
| `POST` | `/api/donations` | Mengirim donasi ke kampanye | public |

### 📊 Statistik & Dashboard
| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stats` | Statistik total donasi & kampanye | public |
| `GET` | `/api/admin/dashboard-stats` | Statistik dashboard admin | 🔐 Admin |

---

## 8. Penjelasan Uji API

Berikut merupakan dokumentasi pengujian REST API `HumanityCare` menggunakan `Postman` untuk memastikan setiap endpoint backend berjalan dengan baik sesuai prinsip `CRUD (Create, Read, Update, Delete)` serta mekanisme `JWT Authentication`.

### Registrasi User/Donatur
Menguji endpoint untuk mendaftarkan pengguna baru ke dalam sistem.
<img width="1920" height="1080" alt="REGIS" src="https://github.com/user-attachments/assets/79e66aea-1a40-4dd4-9c8b-bfc7de21f74b" />

### Login (Generate Token)
Menguji proses login untuk mendapatkan **Token JWT** yang wajib digunakan untuk mengakses endpoint lainnya.
<img width="1920" height="1080" alt="LOGIN" src="https://github.com/user-attachments/assets/36a449b8-85a2-47d1-af0b-3108830f4e55" />

### Create Data (Buat Pengaduan)
Mengirim data laporan baru (Judul, Deskripsi, Kategori) dengan menyertakan Token di header.
<img width="1920" height="1080" alt="CREATE DATA" src="https://github.com/user-attachments/assets/d0a75ed6-8bd1-4970-a434-6527bf0145f5" />

### Read List Data (Dashboard)
Mengambil daftar semua laporan milik user yang sedang login.
<img width="1920" height="1080" alt="READ LIST DATA" src="https://github.com/user-attachments/assets/51b68e37-68d5-453e-a7fe-e36204928345" />

### Read Detail Data
Mengambil detail lengkap dari satu laporan spesifik berdasarkan ID.
<img width="1920" height="1080" alt="READ DETAIL DATA" src="https://github.com/user-attachments/assets/e4e2b241-2e27-45ec-91ff-e7caed4361f9" />

### Update Data
Mengedit judul atau deskripsi laporan yang sudah ada.
<img width="1920" height="1080" alt="UPDATE DATA" src="https://github.com/user-attachments/assets/f3dd6c0f-33c6-41db-800e-b982d46e4db2" />

### Protected Route (Uji Keamanan)
Mencoba mengakses data tanpa Token, sistem harus menolak akses (Unauthorized).
<img width="1920" height="1080" alt="PROTECTED ROUTE" src="https://github.com/user-attachments/assets/0bef2d89-da56-43f8-834a-a29623546da1" />

## 9. Penjelasan ERD (Entity Relationship Diagram)

Sistem ini menggunakan database MySQL dengan relasi antar tabel sebagai berikut:

### 🗂️ Daftar Tabel

![alt text](Screenshots/Humanitycare-ERD.png)

ERD HumanityCare terdiri dari tiga entitas utama: users, campaigns, dan donations. Entitas users menyimpan data pengguna, campaigns merepresentasikan program donasi yang dibuat oleh pengguna, dan donations mencatat transaksi donasi ke suatu kampanye. Relasi antar entitas menunjukkan bahwa satu pengguna dapat membuat dan mendonasikan ke banyak kampanye, serta satu kampanye dapat menerima banyak donasi, sehingga proses pengelolaan donasi tercatat secara terstruktur.

---

### 🔗 Hubungan Relasi (Relationships)

1.  **users ➔ donations (One-to-Many)**
    * *Satu User* bisa melakukan *Banyak donasi*.
    * Setiap *donasi* bisa dilakukan oleh *Satu User*.

2.  **users ➔ campaigns (One-to-Many)**
    * *Satu User* bisa membuat *Banyak campaigns*.
    * Setiap *campaigns* bisa dibuat oleh *Satu user*.

3.  **donation ➔ campaigns (OnManye-to-One)**
    * Setiap *donations* bisa untuk *satu campaigns*.
    * *satu campaigns* bisa dari *banyak donasi*.