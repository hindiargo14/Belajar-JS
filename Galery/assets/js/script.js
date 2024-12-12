document.addEventListener('DOMContentLoaded', function() {
  // Elemen form upload dan file input
  const uploadForm = document.querySelector('form[action="upload.php"]');
  const fileInput = uploadForm.querySelector('input[type="file"]');
  const previewContainer = document.getElementById('preview-container'); // Menyimpan elemen preview container
  const previewImgElem = document.getElementById('preview-image'); // Mengubah nama elemen DOM untuk menghindari bentrok

  // Fungsi untuk melihat preview gambar
  function previewImage(event) {
    const file = event.target.files[0]; // Ambil file dari input

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImgElem.src = e.target.result; // Set src dari preview image
        previewImgElem.style.display = 'block'; // Tampilkan gambar
      };
      reader.readAsDataURL(file); // Membaca file sebagai data URL
    } else {
      previewImgElem.style.display = 'none'; // Sembunyikan gambar jika tidak ada file
    }
  }

  // Tambahkan event listener untuk file input
  fileInput.addEventListener('change', previewImage);

  // Konfirmasi sebelum menghapus gambar
  const deleteForms = document.querySelectorAll('.delete-form');
  deleteForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      const confirmed = confirm('Apakah Anda yakin ingin menghapus foto ini?');
      if (!confirmed) {
        event.preventDefault(); // Batalkan penghapusan jika tidak yakin
      }
    });
  });
});
