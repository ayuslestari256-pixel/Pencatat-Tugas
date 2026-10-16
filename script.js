// INISIALISASI VARIABEL UTAMA
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
    const errorDeadline = document.getElementById("errorDeadline");
    
    const taskList = document.getElementById("taskList");
    const emptyState = document.getElementById("emptyState");
    const loadingState = document.getElementById("loadingState");

    const angkaStat = document.getElementById("angkaStat");
    const isiProgres = document.getElementById("isiProgres");

    let tasks = [];

    // FUNGSI GANTI MENU / HALAMAN
    window.gantiMenu = function(menu) {
        document.getElementById("view-login").style.display = "none";
        document.getElementById("view-beranda").style.display = "none";
        document.getElementById("view-tugas").style.display = "none";
        document.getElementById("view-musik").style.display = "none";

        if (menu === 'beranda') {
            document.getElementById("view-beranda").style.display = "block";
        } else if (menu === 'tugas') {
            document.getElementById("view-tugas").style.display = "block";
        } else if (menu === 'musik') {
            document.getElementById("view-musik").style.display = "block";
        }
    };

    // PROSES LOGIN / BERANDA MASUK
    if (loginForm) {
        loginForm.addEventListener("click", function() {
            const nama = namaUser.value.trim();
            const errorLogin = document.getElementById("errorLogin");

            if (nama === "") {
                if (errorLogin) errorLogin.style.display = "block";
                return;
            }

            if (errorLogin) errorLogin.style.display = "none";
            salamNama.textContent = "Halo, " + nama + "!";
            gantiMenu('beranda');
        });
    }

    // TAMBAH TUGAS
    if (taskForm) {
        taskForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const judul = taskInput.value.trim();
            const prioritas = prioritySelect.value;
            const deadline = deadlineInput.value;

            let adaError = false;

            if (judul === "") {
                errorTask.style.display = "block";
                adaError = true;
            } else {
                errorTask.style.display = "none";
            }

            if (deadline === "") {
                errorDeadline.style.display = "block";
                adaError = true;
            } else {
                errorDeadline.style.display = "none";
            }

            if (adaError) return;

            const tugasBaru = {
                id: Date.now(),
                judul: judul,
                prioritas: prioritas,
                deadline: deadline,
                selesai: false
            };

            tasks.push(tugasBaru);
            taskInput.value = "";
            deadlineInput.value = "";
            renderTugas();
        });
    }

    // HITUNG STATISTIK PROGRESS TUGAS
    function hitungStatistik() {
        const total = tasks.length;
        angkaStat.textContent = total;

        if (total === 0) {
            isiProgres.textContent = "0%";
            return;
        }

        const selesaiCount = tasks.filter(t => t.selesai).length;
        const persen = Math.round((selesaiCount / total) * 100);
        isiProgres.textContent = persen + "%";
    }

    // RENDER / TAMPILKAN DAFTAR TUGAS
    function renderTugas() {
        taskList.innerHTML = "";
        
        if (tasks.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
            tasks.forEach(function(tugas) {
                const li = document.createElement("li");
                li.style.cssText = "background: #f8fafc; padding: 12px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;";
                
                li.innerHTML = `
                    <div>
                        <span style="font-weight: 600; text-decoration: ${tugas.selesai ? 'line-through' : 'none'};">${tugas.judul}</span>
                        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Prioritas: ${tugas.prioritas} | Deadline: ${tugas.deadline}</div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="toggleSelesai(${tugas.id})" style="padding: 5px 10px; background: ${tugas.selesai ? '#f59e0b' : '#10b981'}; color: white; border: none; border-radius: 5px; cursor: pointer;">${tugas.selesai ? 'Batal' : 'Selesai'}</button>
                        <button onclick="hapusTugas(${tugas.id})" style="padding: 5px 10px; background: #ef4444; color: white; border: none; border-radius: 5px; cursor: pointer;">Hapus</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
        hitungStatistik();
    }

    // TOMBOL SELESAI TUGAS
    window.toggleSelesai = function(id) {
        tasks = tasks.map(t => t.id === id ? { ...t, selesai: !t.selesai } : t);
        renderTugas();
    };

    // TOMBOL HAPUS TUGAS
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