# Monitor Karyawan SysGATE

Sistem monitoring real-time untuk memantau kehadiran karyawan di area Gate NPK2 Pupuk Kujang. Dashboard ini menyediakan visualisasi data yang interaktif dan responsif untuk tracking berbagai kategori personel.

## 🚀 Fitur Utama

### Dashboard Interaktif

- **Real-time Clock**: Menampilkan waktu saat ini dengan update otomatis
- **Animated Statistics**: Kartu statistik dengan animasi angka yang smooth
- **Responsive Design**: Tampilan yang optimal di berbagai ukuran layar
- **Professional UI**: Desain modern dengan gradient dan shadow effects

### Kategori Monitoring

- **Total Inside NPK2**: Agregasi total semua personel di area
- **Karyawan PKC**: Monitoring karyawan tetap Pupuk Kujang
- **PHL & Kontraktor**: Tracking pekerja harian lepas dan kontraktor
- **Praktikan**: Monitoring mahasiswa praktik kerja
- **Visitor**: Tracking pengunjung dan tamu

### Simulasi Data

- Data simulasi real-time dengan variasi otomatis
- Batasan maksimal agregasi (275 personel)
- Distribusi proporsional antar kategori

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hooks**: Custom hooks untuk data simulation dan time management

## 📦 Instalasi

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- npm, yarn, pnpm, atau bun

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd monitor-karyawan
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   # atau
   bun install
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   # atau
   bun dev
   ```

4. **Buka aplikasi**
   Akses [http://localhost:3000](http://localhost:3000) di browser

## 🎯 Petunjuk Penggunaan

### Dashboard Overview

1. **Header Section**: Menampilkan logo Pupuk Kujang, judul "GATE NPK2", dan waktu real-time
2. **Statistics Cards**: Lima kartu statistik dengan animasi angka:
   - Kartu utama "Total Inside NPK2" (span 2 kolom)
   - Empat kartu individual untuk setiap kategori personel

### Fitur Interaktif

- **Auto-refresh**: Data diperbarui otomatis setiap beberapa detik
- **Hover Effects**: Efek visual saat cursor berada di atas kartu
- **Responsive Layout**: Tata letak menyesuaikan ukuran layar

### Kustomisasi

- Ubah interval simulasi di `src/hooks/useDataSimulation.ts`
- Modifikasi styling di komponen masing-masing
- Sesuaikan batasan maksimal data sesuai kebutuhan

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── globals.css          # Global styles dan animasi CSS
│   ├── layout.tsx           # Root layout aplikasi
│   └── page.tsx             # Halaman utama dashboard
├── components/
│   ├── dashboard/
│   │   ├── AnimatedNumber.tsx    # Komponen animasi angka
│   │   └── StatisticsCards.tsx   # Kartu statistik utama
│   ├── layout/
│   │   └── DashboardHeader.tsx   # Header dengan logo dan waktu
│   └── ui/                       # Komponen UI reusable
├── hooks/
│   ├── useCurrentTime.ts         # Hook untuk waktu real-time
│   └── useDataSimulation.ts      # Hook untuk simulasi data
└── types/
    └── index.ts                  # Type definitions
```

## 🔧 Konfigurasi

### Environment Variables

Tidak ada environment variables yang diperlukan untuk development.

### Build Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🎨 Kustomisasi Tampilan

### Mengubah Warna Theme

Edit file `src/app/globals.css` untuk mengubah variabel CSS custom:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

### Modifikasi Layout Grid

Ubah konfigurasi grid di `StatisticsCards.tsx`:

```typescript
// Untuk mengubah jumlah kolom
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
```

## 🤝 Kontribusi

### Cara Berkontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Guidelines

- Ikuti konvensi penamaan yang konsisten
- Tambahkan komentar untuk kode yang kompleks
- Pastikan responsive design tetap terjaga
- Test di berbagai ukuran layar

### Code Style

- Gunakan TypeScript untuk type safety
- Ikuti ESLint configuration yang ada
- Gunakan Tailwind CSS untuk styling
- Implementasikan proper error handling

## 📝 Changelog

### v1.0.0

- ✅ Dashboard header terpadu dengan logo, judul, dan waktu
- ✅ Kartu statistik individual dengan animasi
- ✅ Simulasi data real-time dengan batasan maksimal
- ✅ Responsive design untuk semua ukuran layar
- ✅ Professional styling dengan gradient dan shadow

## 📞 Support

Untuk pertanyaan atau dukungan teknis, silakan buat issue di repository ini atau hubungi tim development.

## 📄 Lisensi

Proyek ini dikembangkan untuk keperluan internal Pupuk Kujang.

---

**Pupuk Kujang - Gate NPK2 Monitoring System**  
_Real-time employee monitoring dashboard_
