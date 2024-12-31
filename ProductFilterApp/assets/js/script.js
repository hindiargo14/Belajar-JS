// Simpan produk ke localStorage
function saveProduct() {
    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const stock = document.getElementById("productStock").value;
  
    // Buat objek produk baru
    const newProduct = {
      id: Date.now(),
      name: name,
      category: category,
      stock: parseInt(stock),
    };
  
    // Ambil produk yang ada di localStorage, atau array kosong jika tidak ada
    let products = JSON.parse(localStorage.getItem("products")) || [];
  
    // Tambahkan produk baru ke dalam array
    products.push(newProduct);
  
    // Simpan kembali ke localStorage
    localStorage.setItem("products", JSON.stringify(products));
  
    // Clear input fields
    document.getElementById("productName").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productStock").value = "";
  
    // Render ulang produk
    renderProducts();
  }
  
  // Render produk dari localStorage
  function renderProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Kosongkan daftar produk
  
    let products = JSON.parse(localStorage.getItem("products")) || [];
  
    if (products.length === 0) {
      const message = document.createElement("p");
      message.classList.add("no-product");
      message.textContent = "Product is out of stock!";
      productList.appendChild(message);
    } else {
      products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
  
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
  }
  
  // Hapus produk dari localStorage
  function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(product => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
  
    renderProducts(); // Render ulang setelah penghapusan
  }
  
  // Fungsi Edit produk
  function editProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(product => product.id === id);
  
    if (product) {
      document.getElementById("productName").value = product.name;
      document.getElementById("productCategory").value = product.category;
      document.getElementById("productStock").value = product.stock;
      deleteProduct(id); // Hapus produk yang diedit
    }
  }
  
  // Fungsi Beli produk
  function buyProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(product => product.id === id);
  
    if (product) {
      if (product.stock > 0) {
        product.stock -= 1;
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts(); // Update setelah pembelian
      } else {
        alert("Stok habis!");
      }
    }
  }
  
  // Load produk saat halaman dimuat
  window.onload = function() {
    renderProducts();
  };
  