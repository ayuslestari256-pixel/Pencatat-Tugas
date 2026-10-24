# Project Charter — Pencatat Tugas & Media Interaktif

## 1. Nama Produk
Pencatat Tugas & Multimedia Terpadu (Aplikasi Tugas 4)

## 2. Masalah yang Diselesaikan
Mahasiswa sering kali mengalami kesulitan dalam mengatur jadwal pengumpulan tugas kuliah yang menumpuk serta mengelola waktu belajar secara efektif tanpa adanya pengingat atau antarmuka yang terstruktur dan mudah diakses.

## 3. Pengguna Sasaran & Persona
* **Nama Persona:** Rian (Mahasiswa Aktif)
* **Keseharian:** Menghadiri perkuliahan padat dari pagi hingga sore, aktif dalam kegiatan organisasi kampus, dan sering mengerjakan tugas secara berpindah-pindah perangkat.
* **Kendala:** Sering lupa deadline tugas karena catatan manual yang berantakan dan sulit melacak progres tugas yang sudah selesai.

## 4. Fitur MVP (Metode MoSCoW)
* **Must Have:** 
  * Menambah dan menghapus daftar tugas harian.
  * Menandai status tugas yang sudah selesai (*checklist*).
* **Should Have:** 
  * Pemutaran media/audio pendukung belajar di dalam aplikasi.
* **Could Have:** 
  * Fitur perpindahan halaman atau tab menu interaktif.
* **Won't Have:** 
  * Sistem login akun berbasis server (belum diperlukan pada sprint ini).

## 5. Kriteria Sukses Terukur
Pengguna baru dapat menambahkan dan menyelesaikan alur utama pencatatan tugas dalam waktu $\le 2$ menit tanpa memerlukan bantuan panduan eksternal.

## 6. Analisis Risiko & Antisipasi
1. **Risiko:** Data tugas hilang saat peramban (*browser*) ditutup atau dibersihkan.
   * **Antisipasi:** Menerapkan penyimpanan lokal (*localStorage*) atau fitur ekspor/impor data di sprint berikutnya.
2. **Risiko:** Tata letak rusak saat diakses melalui layar ponsel yang sempit.
   * **Antisipasi:** Menguji responsivitas antarmuka menggunakan *Responsive Design Mode* di berbagai ukuran *viewport*.
3. **Risiko:** Konflik kode saat pemecahan modul JavaScript.
   * **Antisipasi:** Melakukan *commit* secara berkala per fitur menggunakan Git.