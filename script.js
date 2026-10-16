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

// PROSES LOGIN / BERANDA MASUK
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = namaUser.value.trim();
    if (!nama) return;

    salamNama.textContent = nama;
    mainHeader.style.display = "flex";

    // Pindah otomatis ke halaman Tugas
    document.getElementById("view-beranda").style.display = "none";
    document.getElementById("view-beranda").classList.remove("aktif");

    const viewTugas = document.getElementById("view-tugas");
    viewTugas.style.display = "block";
    viewTugas.classList.add("aktif");
});

// NAVIGASI TAB ANTAR HALAMAN
const tabButtons = document.querySelectorAll(".tab-btn");
const viewSections = document.querySelectorAll(".view-section");

tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        
        tabButtons.forEach((b) => {
            b.classList.remove("aktif");
            b.style.background = "#f1f5f9";
            b.style.color = "#475569";
        });
        btn.classList.add("aktif");
        btn.style.background = "var(--primary)";
        btn.style.color = "white";

        viewSections.forEach((section) => {
            if (section.id === "view-beranda") return; // Abaikan beranda kalau sudah masuk
            section.classList.remove("aktif");
            section.style.display = "none";
            section.hidden = true;
            if (section.id === targetId) {
                section.hidden = false;
                section.style.display = "block";
                section.classList.add("aktif");
            }
        });

        if (targetId === "view-statistik") {
            hitungStatistik();
        }
    });
});

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = taskInput.value.trim();
    const prioritas = prioritySelect.value;
    const deadline = deadlineInput.value;
    let valid = true;

    errorTask.textContent = "";
    errorPriority.textContent = "";
    errorDeadline.textContent = "";

    if (nama === "") {
        errorTask.textContent = "Nama tugas wajib diisi.";
        valid = false;
    } else if (nama.length < 3) {
        errorTask.textContent = "Nama tugas minimal 3 karakter.";
        valid = false;
    }

    if (prioritas === "") {
        errorPriority.textContent = "Silakan pilih prioritas.";
        valid = false;
    }

    if (deadline === "") {
        errorDeadline.textContent = "Silakan pilih deadline.";
        valid = false;
    }

    if (valid) {
        simpanTugas(nama, prioritas, deadline);
    }
});

function simpanTugas(nama, prioritas, deadline) {
    loadingState.style.display = "block";
    emptyState.style.display = "none";

    setTimeout(function () {
        const tugasBaru = {
            id: Date.now(),
            nama: nama,
            prioritas: prioritas,
            deadline: deadline,
            status: "Belum"
        };

        tasks.push(tugasBaru);
        taskInput.value = "";
        prioritySelect.value = "";
        deadlineInput.value = "";
        loadingState.style.display = "none";
        renderTasks();
    }, 300);
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.status === "Selesai") {
            li.classList.add("status-selesai");
        }

        const tanggal = task.deadline ? task.deadline.split("-").reverse().join("/") : "-";

        li.innerHTML = `
            <div class="task-info">
                <span class="task-title">${task.nama}</span>
                <span class="task-meta">📅 Deadline: <b>${tanggal}</b></span>
                <div class="task-badges">
                    <span class="task-badge ${task.prioritas}">${task.prioritas}</span>
                </div>
            </div>
            <div class="task-actions">
                <select class="status-select">
                    <option value="Belum">⏳ Belum</option>
                    <option value="On Progress">🔄 On Progress</option>
                    <option value="Selesai">✅ Selesai</option>
                </select>
                <button class="btn-delete">Hapus</button>
            </div>
        `;

        if (typeof li.animate === "function") {
            li.animate(
                [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
                { duration: 250, easing: 'ease-out' }
            );
        }

        const statusSelect = li.querySelector(".status-select");
        statusSelect.value = task.status;

        statusSelect.addEventListener("change", function () {
            task.status = statusSelect.value;
            renderTasks();
        });

        const deleteButton = li.querySelector(".btn-delete");
        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter((item) => item.id !== task.id);
            renderTasks();
        });

        taskList.appendChild(li);
    });

    hitungStatistik();
}

function hitungStatistik() {
    if (!angkaStat || !isiProgres) return;
    if (tasks.length === 0) {
        angkaStat.textContent = "0";
        isiProgres.style.width = "0%";
        return;
    }
    const selesaiCount = tasks.filter((t) => t.status === "Selesai").length;
    const persen = Math.round((selesaiCount / tasks.length) * 100);
    angkaStat.textContent = persen;
    isiProgres.style.width = persen + "%";
}
function gantiLagu(selectElement) {
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    
    audioSource.src = selectElement.value;
    audioPlayer.load();
    audioPlayer.play();
}
