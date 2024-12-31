// Data Produk
let products = [
    { id: 1, name: "Laptop", category: "elektronik" },
    { id: 2, name: "Smartphone", category: "elektronik" },
    { id: 3, name: "Jeans", category: "fashion" },
    { id: 4, name: "Keripik Kentang", category: "makanan" }
  ];
  
  // DOM Elements
  const productList = document.getElementById("productList");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const addProductButton = document.getElementById("addProductButton");
  const productModal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const productNameInput = document.getElementById("productName");
  const productCategorySelect = document.getElementById("productCategory");
  const saveProductButton = document.getElementById("saveProductButton");
  const cancelButton = document.getElementById("cancelButton");
  
  let editProductId = null; // ID produk yang sedang diedit
  
  // Render Produk
  function renderProducts(filteredProducts) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";
      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <button onclick="editProduct(${product.id})">Edit</button>
        <button onclick="deleteProduct(${product.id})">Hapus</button>
      `;
      productList.appendChild(productItem);
    });
  }
  
  // Filter Produk
  function filterProducts() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
  
    const filteredProducts = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(searchQuery);
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesName && matchesCategory;
    });
  
    renderProducts(filteredProducts);
  }
  
  // Tambah/Edit Produk
  function openModal(isEdit = false) {
    productModal.classList.remove("hidden");
    modalTitle.textContent = isEdit ? "Edit Produk" : "Tambah Produk";
    if (!isEdit) {
      productNameInput.value = "";
      productCategorySelect.value = "elektronik";
    }
  }
  
  function closeModal() {
    productModal.classList.add("hidden");
  }
  
  function saveProduct() {
    const name = productNameInput.value.trim();
    const category = productCategorySelect.value;
  
    if (name === "") {
      alert("Nama produk tidak boleh kosong!");
      return;
    }
  
    if (editProductId) {
      // Edit produk
      const product = products.find(p => p.id === editProductId);
      product.name = name;
      product.category = category;
      editProductId = null;
    } else {
      // Tambah produk baru
      const newProduct = {
        id: Date.now(),
        name,
        category
      };
      products.push(newProduct);
    }
  
    closeModal();
    filterProducts();
  }
  
  // Hapus Produk
  function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    filterProducts();
  }
  
  // Edit Produk
  function editProduct(id) {
    const product = products.find(p => p.id === id);
    editProductId = id;
    productNameInput.value = product.name;
    productCategorySelect.value = product.category;
    openModal(true);
  }
  
  // Event Listeners
  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  addProductButton.addEventListener("click", () => openModal(false));
  saveProductButton.addEventListener("click", saveProduct);
  cancelButton.addEventListener("click", closeModal);
  
  // Render semua produk di awal
  renderProducts(products);
  