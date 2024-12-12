// Elemen form upload dan file input
const uploadForm = document.querySelector('form[action="upload.php"]');
const fileInput = uploadForm.querySelector('input[type="file"]');

// Preview gambar sebelum upload
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Membuat elemen preview
      const preview = document.createElement('img');
      preview.src = e.target.result;
      preview.alt = 'Preview Gambar';
      preview.style.maxWidth = '200px';
      preview.style.marginTop = '10px';

      // Hapus preview sebelumnya (jika ada)
      const existingPreview = uploadForm.querySelector('img');
      if (existingPreview) {
        uploadForm.removeChild(existingPreview);
      }

      // Tambahkan preview baru
      uploadForm.appendChild(preview);
    };

    reader.readAsDataURL(file);
  }
});

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
