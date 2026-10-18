document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const namaUser = document.getElementById("namaUser");
    const salamNama = document.getElementById("salamNama");
    const mainHeader = document.getElementById("mainHeader");

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const deadlineInput = document.getElementById("deadlineInput");

    const errorTask = document.getElementById("errorTask");
    const errorPriority = document.getElementById("errorPriority");
    const errorDeadline = document.getElementById("errorDeadline");
    
    const taskList = document.getElementById("taskList");
    const emptyState = document.getElementById("emptyState");
    const loadingState = document.getElementById("loadingState");

    const angkaStat = document.getElementById("angkaStat");
    const isiProgres = document.getElementById("isiProgres");

    let tasks = [];

    // SISTEM NAVIGASI TAB
    const tabButtons = document.querySelectorAll(".tab-btn");
    const viewSections = document.querySelectorAll(".view-section");

    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");

            // Hapus kelas aktif dari semua tombol dan section
            tabButtons.forEach(btn => {
                btn.classList.remove("aktif");
                btn.style.background = "#f1f5f9";
                btn.style.color = "#475569";
            });
            viewSections.forEach(sec => {
                sec.classList.remove("aktif");
                sec.style.display = "none";
                sec.setAttribute("hidden", "true");
            });

            // Tambahkan kelas aktif ke tombol yang diklik dan tampilkan targetnya
            this.classList.add("aktif");
            this.style.background = "var(--primary)";
            this.style.color = "white";

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("aktif");
                targetSection.style.display = "block";
                targetSection.removeAttribute("hidden");
            }
        });
    });

    // PROSES LOGIN / MASUK APLIKASI
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const nama = namaUser.value.trim();

            if (nama === "") return;

            salamNama.textContent = nama;

            // Sembunyikan beranda login, tampilkan header navigasi dan menu tugas
            document.getElementById("view-beranda").style.display = "none";
            document.getElementById("view-beranda").classList.remove("aktif");

            mainHeader.style.display = "flex";

            const viewTugas = document.getElementById("view-tugas");
            viewTugas.style.display = "block";
            viewTugas.removeAttribute("hidden");
            viewTugas.classList.add("aktif");
        });
    }

    // TAMBAH TUGAS BARU (Minimal 3 Huruf)
    if (taskForm) {
        taskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const judul = taskInput.value.trim();
            const prioritas = prioritySelect.value;
            const deadline = deadlineInput.value;

            let adaError = false;

            if (judul.length < 3) {
                errorTask.textContent = "Nama tugas minimal 3 huruf!";
                adaError = true;
            } else {
                errorTask.textContent = "";
            }

            if (prioritas === "") {
                errorPriority.textContent = "Pilih tingkat prioritas!";
                adaError = true;
            } else {
                errorPriority.textContent = "";
            }

            if (deadline === "") {
                errorDeadline.textContent = "Tanggal deadline wajib diisi!";
                adaError = true;
            } else {
                errorDeadline.textContent = "";
            }

            if (adaError) return;

            // Tampilkan loading state sebentar
            loadingState.style.display = "block";

            setTimeout(() => {
                loadingState.style.display = "none";

                const tugasBaru = {
                    id: Date.now(),
                    judul: judul,
                    prioritas: prioritas,
                    deadline: deadline,
                    status: "Belum",
                    selesai: false
                };

                tasks.push(tugasBaru);
                taskInput.value = "";
                prioritySelect.value = "";
                deadlineInput.value = "";
                renderTugas();
            }, 400);
        });
    }

    // HITUNG STATISTIK & PROGRES
    function hitungStatistik() {
        const total = tasks.length;
        if (total === 0) {
            angkaStat.textContent = "0";
            isiProgres.style.width = "0%";
            return;
        }

        const selesaiCount = tasks.filter(t => t.selesai).length;
        const persen = Math.round((selesaiCount / total) * 100);
        
        angkaStat.textContent = persen;
        isiProgres.style.width = persen + "%";
    }

    // RENDER DAFTAR TUGAS KE HTML
    function renderTugas() {
        taskList.innerHTML = "";
        
        if (tasks.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
            tasks.forEach(function(tugas) {
                const li = document.createElement("li");
                li.style.cssText = "background: #f8fafc; padding: 12px 15px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;";
                
                let textDecoration = "none";
                let textColor = "#1e293b";
                if (tugas.status === "Selesai") {
                    textDecoration = "line-through";
                    textColor = "#94a3b8";
                }

                li.innerHTML = `
                    <div>
                        <span style="font-weight: 600; text-decoration: ${textDecoration}; color: ${textColor};">${tugas.judul}</span>
                        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
                            Prioritas: <b>${tugas.prioritas}</b> | Deadline: ${tugas.deadline} | Status: <span style="font-weight: 600; color: ${tugas.status === 'Selesai' ? '#10b981' : (tugas.status === 'On Progress' ? '#f59e0b' : '#64748b')}">${tugas.status || 'Belum'}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <select onchange="ubahStatus(${tugas.id}, this.value)" style="padding: 5px; font-size: 11px; border-radius: 5px; border: 1px solid #cbd5e1; background: white;">
                            <option value="Belum" ${tugas.status === 'Belum' ? 'selected' : ''}>Belum</option>
                            <option value="On Progress" ${tugas.status === 'On Progress' ? 'selected' : ''}>On Progress</option>
                            <option value="Selesai" ${tugas.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
                        </select>
                        <button onclick="hapusTugas(${tugas.id})" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">Hapus</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
        hitungStatistik();
    }

    // UBAH STATUS TUGAS
    window.ubahStatus = function(id, statusBaru) {
        tasks = tasks.map(t => {
            if (t.id === id) {
                return { ...t, status: statusBaru, selesai: (statusBaru === "Selesai") };
            }
            return t;
        });
        renderTugas();
    };

    // TOMBOL HAPUS
    window.hapusTugas = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTugas();
    };
});

// PEMUTAR MUSIK / GANTI LAGU
window.gantiLagu = function(selectElement) {
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');

    if (audioPlayer && audioSource) {
        audioSource.src = selectElement.value;
        audioPlayer.load();
        audioPlayer.play();
    }
};