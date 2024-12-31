// Data Produk
let products = [
    { id: 1, name: "Laptop", category: "elektronik", stock: 10 },
    { id: 2, name: "Smartphone", category: "elektronik", stock: 5 },
    { id: 3, name: "Jeans", category: "fashion", stock: 8 },
    { id: 4, name: "Keripik Kentang", category: "makanan", stock: 15 }
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
  
    if (filteredProducts.length === 0) {
      productList.innerHTML = `<p class="no-product">Product is out of stock!</p>`;
      return;
    }
  
    filteredProducts.forEach(product => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";
      productItem.innerHTML = `
      <h3>${product.name}</h3>
      <p>Kategori: ${product.category}</p>
      <p>Stok: ${product.stock}</p>
      <div class="button-group">
        <button onclick="editProduct(${product.id})">Edit</button>
        <button onclick="deleteProduct(${product.id})">Hapus</button>
        <button onclick="buyProduct(${product.id})">Beli</button>
      </div>
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
    const stock = parseInt(prompt("Masukkan jumlah stok:", 1), 10);
  
    if (name === "" || isNaN(stock) || stock < 1) {
      alert("Nama produk tidak boleh kosong dan stok harus lebih dari 0!");
      return;
    }
  
    if (editProductId) {
      // Edit produk
      const product = products.find(p => p.id === editProductId);
      product.name = name;
      product.category = category;
      product.stock = stock;
      editProductId = null;
    } else {
      // Tambah produk baru
      const newProduct = {
        id: Date.now(),
        name,
        category,
        stock
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
  
  // Beli Produk
  function buyProduct(id) {
    const product = products.find(p => p.id === id);
    if (product.stock > 1) {
      product.stock -= 1;
    } else {
      alert(`Produk "${product.name}" habis!`);
      deleteProduct(id);
    }
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
  