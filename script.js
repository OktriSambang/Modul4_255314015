"use strict"; 

// Langkah 1: Mengambil elemen <h1> dari header dan menampilkan isinya 
const judulProfil = document.querySelector("header h1");
if (judulProfil) {
    console.log(judulProfil);          
    console.log(judulProfil.textContent); 
}

// Langkah 2: Mengambil tombol dark mode dari halaman
const tombolTema = document.querySelector("#btn-tema");

// Fungsi untuk menambah/menghapus class "dark-mode" pada <body>
function toggleTema() {
    document.body.classList.toggle("dark-mode");
}

// Menghubungkan tombol ke fungsi toggleTema saat diklik
if (tombolTema) {
    tombolTema.addEventListener("click", toggleTema);
}

// Langkah 3: Mengambil tombol kontak dan section kontak untuk fitur tampil/sembunyikan
const tombolKontak = document.querySelector("#btn-kontak");
const sectionKontak = document.querySelector("#kontak");

// Toggle class "tersembunyi" agar section kontak tampil atau hilang saat diklik
if (tombolKontak && sectionKontak) {
    tombolKontak.addEventListener("click", () => {
        sectionKontak.classList.toggle("tersembunyi");
    });
}

// Langkah 4: Data pengalaman disimpan sebagai array of object
const daftarPengalaman = [
    {
        judul: "CO Lektor - Komunitas Paingan",
        periode: "Februari 2026 - Sekarang",
        deskripsi: "Komunitas Paingan merupakan komunitas Katolik di bawah Campus Ministry USD."
    },
    {
        judul: "Anggota Divisi Konsumsi - IT Days 2026",
        periode: "Mei 2026 - Oktober 2026",
        deskripsi: "IT Days 2026 merupakan acara tahunan Program Studi Informatika USD."
    },
    {
        judul: "Anggota Divisi Perlengkapan - Wayangan 2026",
        periode: "September 2026 - November 2026",
        deskripsi: "Kepanitiaan Wayangan 2026 menyelenggarakan pagelaran seni budaya wayang."
    }
];

// Ambil container section portofolio dari halaman
const containerPengalaman = document.querySelector(".daftar-artikel");

if (containerPengalaman) {
    // Fungsi render satu item 
    // dibuat sebagai fungsi agar bisa dipakai ulang oleh tombol tambah
    function renderPengalaman(data) {
        const article = document.createElement("article");

        // Buat h3 judul pengalaman
        const judul = document.createElement("h3");
        judul.textContent = data.judul;

        // Buat paragraf periode
        const periode = document.createElement("p");
        periode.textContent = "Periode: " + data.periode;

        // Buat paragraf deskripsi
        const deskripsi = document.createElement("p");
        deskripsi.textContent = data.deskripsi;

        // Langkah 5: Buat tombol hapus untuk tiap artikel
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";

        // Gabungkan semua elemen ke dalam article
        article.appendChild(judul);
        article.appendChild(periode);
        article.appendChild(deskripsi);
        article.appendChild(tombolHapus);

        // Masukkan article ke dalam container
        containerPengalaman.appendChild(article);
    }

    // Render semua data awal dari array
    daftarPengalaman.forEach(renderPengalaman);

    // Langkah 5: Event delegation — satu listener menangani semua tombol Hapus
    containerPengalaman.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            e.target.closest("article").remove();
        }
    });

    const tombolTambah = document.querySelector("#btn-tambah");
    const formPengalaman = document.querySelector("#form-pengalaman");

    if (tombolTambah && formPengalaman) {
        // Klik "Tambah Pengalaman" -> tampilkan/sembunyikan form
        tombolTambah.addEventListener("click", () => {
            formPengalaman.classList.toggle("tersembunyi");
        });

        // Klik "Simpan" -baca isian, simpan ke array, tampilkan di halaman
        formPengalaman.addEventListener("submit", (e) => {
            e.preventDefault(); 

            const dataForm = new FormData(formPengalaman);
            const itemBaru = {
                judul: dataForm.get("judul").trim(),
                periode: dataForm.get("periode").trim(),
                deskripsi: dataForm.get("deskripsi").trim()
            };

            daftarPengalaman.push(itemBaru);
            renderPengalaman(itemBaru); 

            formPengalaman.reset();   //kosongkan formuii
            formPengalaman.classList.add("tersembunyi"); // sembunyikan lagi form
        });
    }
}
