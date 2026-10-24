# Laporan Dependensi Pustaka UI — BubuList

## 1. Informasi Pustaka
* **Nama Pustaka:** Bootstrap
* **Versi Terkunci:** 5.3.3
* **Sumber Pemuatan:** CDN jsDelivr (`https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/...`)

## 2. Komponen Pustaka yang Digunakan
1. **Navbar / Tab Navigation:** Digunakan untuk menu navigasi utama antar-halaman/fitur aplikasi.
2. **Card:** Digunakan sebagai wadah kontainer kartu tugas, daftar lagu, dan bagian konten.
3. **Form Controls & Buttons:** Digunakan pada elemen formulir input tugas dan tombol interaktif.

## 3. Catatan Teknis & Ukuran Transfer
* **Urutan Pemuatan CSS:** Berkas CSS Bootstrap dimuat terlebih dahulu di dalam tag `<head>`, diikuti oleh berkas gaya kustom (`style.css`) agar aturan gaya buatan sendiri tidak tertimpa oleh *default* Bootstrap.
* **Ukuran Transfer (Network Tab):** Pemuatan pustaka terkompresi melalui CDN meminimalkan ukuran transfer langsung dan mempercepat waktu muat halaman peramban.