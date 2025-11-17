// =======================================
//             DATA & CONFIG
// =======================================

const VALID_PASSWORD = "24090070";

const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

function formatRupiah(num) {
    return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Deteksi Halaman
const path = location.pathname;


// =======================================
//               LOGIN PAGE
// =======================================

if (path.endsWith("/") || path.endsWith("index.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("loginForm");
        const errorMessage = document.getElementById("errorMessage");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            errorMessage.style.display = "none";

            if (email === "" || password === "") {
                errorMessage.textContent = "Email dan password tidak boleh kosong!";
                errorMessage.style.display = "block";
                return;
            }

            if (password !== VALID_PASSWORD) {
                errorMessage.textContent = "Password salah!";
                errorMessage.style.display = "block";
                return;
            }

            alert("Login berhasil!");
            window.location.href = "dashboard.html";
        });
    });
}



// =======================================
//             DASHBOARD PAGE
// =======================================

else if (path.endsWith("dashboard.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("total-products").textContent = summary.totalProducts;
        document.getElementById("total-sales").textContent = summary.totalSales;
        document.getElementById("total-revenue").textContent = formatRupiah(summary.totalRevenue);

        // Logout
        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => {
            if (confirm("Yakin ingin logout?")) {
                window.location.href = "index.html";
            }
        });
    });
}



// =======================================
//             PRODUCTS PAGE
// =======================================

else if (path.endsWith("products.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        renderProductTable();

        // Logout
        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => {
            if (confirm("Yakin ingin logout?")) {
                window.location.href = "index.html";
            }
        });

        window.confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
        window.cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

        cancelDeleteBtn.addEventListener("click", closeDeleteModal);
        confirmDeleteBtn.addEventListener("click", deleteConfirmed);
    });


    // Render Table
    function renderProductTable() {
        const tbody = document.getElementById("product-table-body");
        tbody.innerHTML = "";

        products.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${formatRupiah(item.price)}</td>
                <td>${item.stock}</td>
                <td>
                    <button class="btn-edit" onclick="editProduct(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="openDeleteModal(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    // Edit Produk
    window.editProduct = function(id) {
        const p = products.find(p => p.id === id);
        alert(`Edit produk: ${p.name}`);
    };

    // Open delete modal
    window.openDeleteModal = function(id) {
        const modal = document.getElementById("deleteConfirmationModal");
        const label = document.getElementById("deleteProductNameText");

        modal.dataset.deleteId = id;
        const p = products.find(p => p.id === id);

        label.textContent = `Yakin ingin menghapus produk "${p.name}"?`;

        modal.classList.add("show");
    };

    // Close modal
    function closeDeleteModal() {
        document.getElementById("deleteConfirmationModal").classList.remove("show");
    }

    // Delete confirmed
    function deleteConfirmed() {
        const modal = document.getElementById("deleteConfirmationModal");
        const id = parseInt(modal.dataset.deleteId);

        products = products.filter(p => p.id !== id);

        closeDeleteModal();
        renderProductTable();
    }
}



// =======================================
//        RESPONSIVE HAMBURGER MENU
// =======================================

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const overlay = document.getElementById("overlay");

    // Buka sidebar
    hamburgerBtn?.addEventListener("click", () => {
        sidebar.classList.add("open");
        overlay.classList.add("open");
    });

    // Tutup sidebar
    closeMenuBtn?.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
    });

    overlay?.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
    });
});
